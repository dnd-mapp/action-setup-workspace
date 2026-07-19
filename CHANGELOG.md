# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-07-18

### Added

- `node-auth-token` input, forwarded to `NODE_AUTH_TOKEN` and paired with a new `registry-url` on the `setup-node` step, so consuming repos can authenticate `pnpm i` against the `@dnd-mapp` scope on GitHub Packages. Required whenever `install-dependencies` is `'true'`; the action fails fast with a clear error if it's missing.

## [1.0.0] - 2026-07-17

### Added

- Composite action extracted from `dnd-mapp/project-template`'s `.github/actions/setup-workspace`: sets up Pnpm and Node.js, and installs dependencies.
- `install-dependencies` input to skip the dependency-install step while still setting up the toolchain.

[1.0.0]: https://github.com/dnd-mapp/action-setup-workspace/releases/tag/v1.0.0
[2.0.0]: https://github.com/dnd-mapp/action-setup-workspace/releases/tag/v2.0.0
