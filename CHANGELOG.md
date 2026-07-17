# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Composite action extracted from `dnd-mapp/project-template`'s `.github/actions/setup-workspace`: sets up Pnpm and
  Node.js, and installs dependencies.
- `install-dependencies` input to skip the dependency-install step while still setting up the toolchain.
