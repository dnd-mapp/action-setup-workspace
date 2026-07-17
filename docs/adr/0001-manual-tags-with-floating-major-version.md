# Tag releases manually, with a floating major-version tag

This repo has no automated release workflow. Releases are cut manually: an immutable `vX.Y.Z` tag is pushed for each release, and a floating `v1` tag (moved forward with each `v1.x.y` release) lets consumers pin to a major version instead of an exact SHA if they choose to. Consumers are still expected to pin `uses:` to a commit SHA (with a `# vX.Y.Z` comment), matching how this org already pins third-party actions; the tags exist to make that SHA easy to find, and to give repos willing to trade a little supply-chain safety for convenience a moving `v1` reference.

Both tags must be signed, the same way commits to `main` already are. This is enforced by two tag-target repository rulesets rather than by anything in a workflow, since GitHub rejects an unsigned tag push outright, before any workflow runs.

"Stable tags" covers `vX.Y.Z` tags (`refs/tags/v[0-9]*.[0-9]*.[0-9]*`): it requires signatures, and restricts creation, update, deletion, and force-push (`non_fast_forward`) to the repository's admin role, so a pushed release tag can never be moved or deleted by anyone else. "Floating major tag" covers `v1`-style tags (`refs/tags/v[0-9]*`, excluding the `vX.Y.Z` pattern above): it requires signatures and restricts creation/update/deletion the same way, but omits `non_fast_forward`, since the admin role force-moves it by hand on every `v1.x.y` release.

Automating this (e.g. `semantic-release` off Conventional Commits, which this repo already enforces via commitlint) was considered and rejected for now: this repo changes rarely and a human is already reviewing every PR, so the extra tooling isn't earning its keep yet. Revisit if release cadence increases.

> **Note:**
> [ADR 0002](0002-automated-release-and-discussion-creation.md) supersedes the rejection above for GitHub Release/Discussion creation specifically: that piece is now automated, and runs ungated on tag push. The rest of this ADR — manual immutable tags, and the manually-moved floating `v1` — still holds.
