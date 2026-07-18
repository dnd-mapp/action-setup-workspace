# Tag releases manually, with a floating major-version tag

Releases are cut manually: an immutable `vX.Y.Z` tag is pushed for each release, and a floating `v1` tag (moved forward with each `v1.x.y` release) lets consumers pin to a major version instead of an exact SHA if they choose to. Consumers are still expected to pin `uses:` to a commit SHA (with a `# vX.Y.Z` comment), matching how this org already pins third-party actions; the tags exist to make that SHA easy to find, and to give repos willing to trade a little supply-chain safety for convenience a moving `v1` reference. This floating-tag/SHA-pin convention is specific to repos consumed as composite actions via `uses:`, not a platform-wide requirement; see [`.github` ADR 0002](https://github.com/dnd-mapp/.github/blob/main/docs/adr/0002-signed-and-validated-release-tags.md) for the platform-wide tag-signing and validation convention this repo also follows.

Both tags are signed, enforced by two tag-target repository rulesets rather than by anything in a workflow.

"Stable tags" covers `vX.Y.Z` tags (`refs/tags/v[0-9]*.[0-9]*.[0-9]*`): it requires signatures, and restricts creation, update, deletion, and force-push (`non_fast_forward`) to the repository's admin role, so a pushed release tag can never be moved or deleted by anyone else. "Floating major tag" covers `v1`-style tags (`refs/tags/v[0-9]*`, excluding the `vX.Y.Z` pattern above): it requires signatures and restricts creation/update/deletion the same way, but omits `non_fast_forward`, since the admin role force-moves it by hand on every `v1.x.y` release.

Automating tag-cutting (e.g. `semantic-release` off Conventional Commits, which this repo already enforces via commitlint) was considered and rejected for now: this repo changes rarely and a human is already reviewing every PR, so the extra tooling isn't earning its keep yet. Revisit if release cadence increases.

> **Note:**
> [ADR 0002](0002-automated-release-and-discussion-creation.md) covers this repo's release-creation automation (see its own note for how that's evolved). The rest of this ADR (manual immutable tags, and the manually-moved floating `v1`) still holds.
