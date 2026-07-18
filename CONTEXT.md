# @dnd-mapp/action-setup-workspace

A reusable composite GitHub Action that prepares the standard `dnd-mapp` Node.js/Pnpm workspace for CI, so individual repos don't each duplicate the same setup steps.

## Language

**Workspace**:  
The Pnpm-managed Node.js toolchain this action sets up: Pnpm installed, Node.js installed (with dependency caching and the `@dnd-mapp` npm scope on GitHub Packages configured, authenticated via the caller-supplied `node-auth-token`), and, unless opted out via `install-dependencies: 'false'`, the repo's dependencies installed.  
_Avoid_: "environment" or "build" for this concept, those are more general and don't capture that it specifically matches this org's Pnpm/Node.js conventions.

**Release**:  
See the org-wide [Release Tooling context](https://github.com/dnd-mapp/.github/blob/main/docs/release-tooling/CONTEXT.md#language). This repo's `release.yml` creates one automatically when a `vX.Y.Z` tag is pushed, using the matching `CHANGELOG.md` section as its contents.
