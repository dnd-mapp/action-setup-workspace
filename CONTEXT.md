# @dnd-mapp/action-setup-workspace

A reusable composite GitHub Action that prepares the standard `dnd-mapp` Node.js/Pnpm workspace for CI, so individual repos don't each duplicate the same setup steps.

## Language

**Workspace**:  
The Pnpm-managed Node.js toolchain this action sets up: Pnpm installed, Node.js installed (with dependency caching and the `@dnd-mapp` npm scope configured), and, unless opted out via `install-dependencies: 'false'`, the repo's dependencies installed.  
_Avoid_: "environment" or "build" for this concept, those are more general and don't capture that it specifically matches this org's Pnpm/Node.js conventions.
