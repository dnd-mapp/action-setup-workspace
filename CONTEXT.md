# @dnd-mapp/action-setup-workspace

A reusable composite GitHub Action that prepares the standard `dnd-mapp` Node.js/Pnpm workspace for CI, so individual repos don't each duplicate the same setup steps.

## Language

**Workspace**:  
The Pnpm-managed Node.js toolchain this action sets up: Pnpm installed, Node.js installed (with dependency caching and the `@dnd-mapp` npm scope configured), and, unless opted out via `install-dependencies: 'false'`, the repo's dependencies installed.  
_Avoid_: "environment" or "build" for this concept, those are more general and don't capture that it specifically matches this org's Pnpm/Node.js conventions.

**Release**:  
The GitHub Release and mirroring Announcements Discussion that `release.yml` creates automatically when a `vX.Y.Z` tag is pushed, using the matching `CHANGELOG.md` section as their contents. Distinct from _tagging_, the manual, unautomated act of creating and pushing that tag (and, for `v1.x.y` versions, moving the floating `v1` tag) which triggers it.  
_Avoid_: using "release" to mean the tag push itself, that's "tagging"; "release" specifically means the GitHub Release/Discussion pair produced from it.
