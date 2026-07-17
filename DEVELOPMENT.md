# Development

How to work on this repository day-to-day. For how to propose a change, see the org-wide [CONTRIBUTING.md](https://github.com/dnd-mapp/.github/blob/main/CONTRIBUTING.md).

## Requirements

- Node.js `24.18.0` (see `devEngines` in [package.json](package.json))
- pnpm `11.13.1` (see `devEngines` in [package.json](package.json))

## Getting started

```shell
pnpm i
```

This also installs the [Husky](https://typicode.github.io/husky) git hooks: `lint-staged` runs Prettier/markdownlint on staged files before each commit, and `commitlint` checks each commit message follows [Conventional Commits](https://www.conventionalcommits.org).

## Common tasks

- `pnpm format` / `pnpm format-check` (format, or check formatting, of the whole repo with Prettier)
- `pnpm lint-md` (lint all Markdown files)

## Releasing

Tagging is manual (see [ADR 0001](docs/adr/0001-manual-tags-with-floating-major-version.md)); pushing a `vX.Y.Z` tag on `main` triggers an ungated GitHub Actions workflow that creates a GitHub Release and mirroring Announcements Discussion from the matching changelog section (see [ADR 0002](docs/adr/0002-automated-release-and-discussion-creation.md)).

See [Releasing a new version](docs/guides/dev/releasing.md) for the full, step-by-step procedure.
