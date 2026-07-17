# Releasing a new version

This repo has no automated version-bumping tool. You decide the version and write the changelog entry yourself, in a normal PR. Pushing a release tag triggers an automated workflow that creates the GitHub Release and its mirroring Announcements Discussion; see [ADR 0002](../../adr/0002-automated-release-and-discussion-creation.md) for why that part is automated and ungated, and [ADR 0001](../../adr/0001-manual-tags-with-floating-major-version.md) for why tagging itself stays manual.

## 1. Bump the version and changelog

In a normal PR against `main`:

1. Update `version` in [package.json](../../../package.json) to the new version.
2. In [CHANGELOG.md](../../../CHANGELOG.md), rename the `## [Unreleased]` heading to `## [X.Y.Z] - YYYY-MM-DD` (today's date), and add a fresh empty `## [Unreleased]` section above it.

Get this merged to `main` like any other change.

## 2. Tag the merged commit

Once the version bump is on `main`:

```shell
git checkout main
git pull
git tag -s vX.Y.Z -m vX.Y.Z
git push origin vX.Y.Z
```

The `-s` signs the tag; it requires a GPG or SSH signing key already configured for git, the same as commits to `main`.

The tag must:

- Match the pattern `vX.Y.Z` (stable versions only, no pre-release suffixes are supported)
- Point at a commit that's reachable from `main`
- Have a version (after stripping the leading `v`) that exactly matches `package.json`'s `version` field at that commit
- Have a matching `## [X.Y.Z] - YYYY-MM-DD` section in `CHANGELOG.md`
- Be signed, enforced by the repo's "Stable tags" ruleset (see [ADR 0001](../../adr/0001-manual-tags-with-floating-major-version.md)) rather than by `validate`: an unsigned tag push is rejected by GitHub before the workflow ever runs

Pushing a tag that fails any of the first four is caught by the `validate` job in [release.yml](../../../.github/workflows/release.yml) before anything else happens.

## 3. Release and Discussion creation

Once `validate` passes, the `create-release` job runs automatically, with no approval gate (see [ADR 0002](../../adr/0002-automated-release-and-discussion-creation.md) for why). It:

1. Extracts the matching section of `CHANGELOG.md`.
2. Creates the GitHub Release for the tag using that section as its notes, visible immediately, and starts a mirroring **Announcements** Discussion.

There's nothing else to publish: this repo is a composite action, consumed directly via `uses: dnd-mapp/action-setup-workspace@<ref>`, so there's no package registry step and no build artifact to attach.

## 4. First release only, and any subsequent `v1.x.y` release: move the floating `v1` tag

This step is manual (see [ADR 0001](../../adr/0001-manual-tags-with-floating-major-version.md)) and only applies to `v1.x.y` releases:

```shell
git tag -f -s v1 -m v1
git push origin v1 --force
```

Signing here too is enforced by the repo's "Floating major tag" ruleset (see [ADR 0001](../../adr/0001-manual-tags-with-floating-major-version.md)).

## Troubleshooting

- **`validate` fails with a version mismatch**: the tag doesn't match `package.json`'s `version` at the tagged commit. Fix the version, delete the tag, retag, and re-push.
- **`validate` fails the main-ancestry check**: the tagged commit isn't reachable from `main`. Make sure you tagged a commit that's actually been merged.
- **`validate` fails the changelog check**: `CHANGELOG.md` has no `## [X.Y.Z] - YYYY-MM-DD` heading matching the tag. Fix the heading in a follow-up PR, then delete, retag, and re-push.
- **The `create-release` job never seems to start**: check that `validate` actually passed. There's no environment or tag-rule gate here, so if the workflow didn't trigger at all, check that the pushed tag matches `release.yml`'s `on.push.tags` pattern.
