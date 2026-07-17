# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-07-17

### Added

- Composite action extracted from `dnd-mapp/project-template`'s `.github/actions/setup-workspace`: sets up Pnpm and Node.js, and installs dependencies.
- `install-dependencies` input to skip the dependency-install step while still setting up the toolchain.
- Automated, ungated release process: pushing a `vX.Y.Z` tag now validates the tag, then creates a GitHub Release and mirroring Announcements Discussion from the matching `CHANGELOG.md` section (see [ADR 0002](docs/adr/0002-automated-release-and-discussion-creation.md)).
- Repository rulesets requiring both the `vX.Y.Z` and `v1` tags to be signed (see [ADR 0001](docs/adr/0001-manual-tags-with-floating-major-version.md)).

[1.0.0]: https://github.com/dnd-mapp/action-setup-workspace/releases/tag/v1.0.0
