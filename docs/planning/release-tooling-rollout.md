# Handoff: migrate `release.yml` to consume the three release-tooling actions

**Session focus**: this repo's `release.yml` currently validates and creates releases via inline scripts (`scripts/check-changelog-section.mjs`, `scripts/prepare-release-notes.mjs`) and inline bash. Cut over to the three extracted actions, add the required-reviewer gate, and delete the now-redundant scripts, all in one PR.

## Read first, don't re-derive

- [`docs/adr/0003-extract-release-tooling-into-independent-actions.md`](../adr/0003-extract-release-tooling-into-independent-actions.md): why the three actions exist, and its note pointing at the two things it left open (now resolved, see below).
- [`.github` ADR 0002](https://github.com/dnd-mapp/.github/blob/main/docs/adr/0002-signed-and-validated-release-tags.md): the `validate` job shape this repo already mostly implements inline, to be replaced with cross-consumed calls.
- [`.github` ADR 0003](https://github.com/dnd-mapp/.github/blob/main/docs/adr/0003-gate-release-creation-behind-required-reviewer-environment.md): release creation is now gated behind a `release` GitHub Environment, this reverses this repo's own [ADR 0002](../adr/0002-automated-release-and-discussion-creation.md), whose "ungated" decision is marked superseded.
- [`docs/adr/0001-manual-tags-with-floating-major-version.md`](../adr/0001-manual-tags-with-floating-major-version.md), as trimmed: the floating `v1`/SHA-pin convention that still lives here, unaffected by this migration.

## Already resolved, don't re-open

- In-place edit, no staged dry run or scratch-repo verification. The first real tag push after this PR merges is the live proof.
- Cleanup (deleting the redundant scripts) happens in the same PR as the cutover, not a follow-up.

## Pin to use

| Repo | SHA | Tag |
| --- | --- | --- |
| `action-validate-release-tag` | `cc07c1784188a50b4d1f931131bb14e480b2dd2a` | `v1.0.0` / `v1` |
| `action-extract-release-notes` | `2c44a78312de6d557ac11a76c316de06387824ee` | `v1.0.0` / `v1` |
| `action-create-github-release` | `16f4127e1c004e084e70c6874098153a6b85457b` | `v1.0.0` / `v1` |

`uses: ./` (this repo's own action) stays exactly as-is for the "Setup workspace" step, that concern isn't part of this extraction.

## Concrete edits to `.github/workflows/release.yml`

**`validate` job:**

- Replace the inline "Verify tag is reachable from main" and "Verify tag matches package version" steps with `uses: dnd-mapp/action-validate-release-tag@<sha>`.
- Replace the "Verify tag has a matching changelog section" step (`node scripts/check-changelog-section.mjs`) with `uses: dnd-mapp/action-extract-release-notes@<sha>` and `write-file: 'false'`.
- Leave the `uses: ./` "Setup workspace" step, and the `pnpm format-check`/`pnpm lint-md` steps, unchanged.

**`create-release` job:**

- Add `environment: release`.
- Replace the "Prepare release notes" step (`node scripts/prepare-release-notes.mjs`) with `uses: dnd-mapp/action-extract-release-notes@<sha>` (default `write-file: 'true'`).
- Replace the inline `gh release create ...` bash step with `uses: dnd-mapp/action-create-github-release@<sha>`. No `assets` input needed, this repo attaches nothing today.

## Cleanup, same PR

- Delete `scripts/changelog.mjs`, `scripts/check-changelog-section.mjs`, `scripts/prepare-release-notes.mjs` once nothing references them.

## Also needs updating, same PR (not touched during planning)

These describe current, pre-migration behavior and would go stale the moment `release.yml` changes:

- `DEVELOPMENT.md` ("Releasing" section, references the now-superseded "ungated" framing and the local ADR links).
- `docs/guides/dev/releasing.md` (the full step-by-step procedure, references `validate`'s old inline-script shape and the "no approval gate" framing in step 3 and the Troubleshooting section).
- `CHANGELOG.md`: add a new `[Unreleased]` entry describing the cutover and the new `release` environment gate. Don't edit past entries, the `v1.0.0`/`v2.0.0` entries describing "ungated" release creation were accurate at the time they shipped.

## Suggested skills

- **create-branch**, **commit**, **pull-request** for the implementation PR.
- **verify**: exercise the real workflow on the next real tag push, don't trust the YAML on read alone. This repo is the most heavily consumed of the five, verify carefully.
