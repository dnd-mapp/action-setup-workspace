# Tag releases manually, with a floating major-version tag

This repo has no automated release workflow. Releases are cut manually: an immutable `vX.Y.Z` tag is pushed for each release, and a floating `v1` tag (moved forward with each `v1.x.y` release) lets consumers pin to a major version instead of an exact SHA if they choose to. Consumers are still expected to pin `uses:` to a commit SHA (with a `# vX.Y.Z` comment), matching how this org already pins third-party actions; the tags exist to make that SHA easy to find, and to give repos willing to trade a little supply-chain safety for convenience a moving `v1` reference.

Automating this (e.g. `semantic-release` off Conventional Commits, which this repo already enforces via commitlint) was considered and rejected for now: this repo changes rarely and a human is already reviewing every PR, so the extra tooling isn't earning its keep yet. Revisit if release cadence increases.
