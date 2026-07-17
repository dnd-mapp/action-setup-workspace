# action-setup-workspace

[![Push to main](https://github.com/dnd-mapp/action-setup-workspace/actions/workflows/push-main.yml/badge.svg)](https://github.com/dnd-mapp/action-setup-workspace/actions/workflows/push-main.yml)
[![License](https://img.shields.io/github/license/dnd-mapp/action-setup-workspace)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

A composite GitHub Action that sets up the `dnd-mapp` org's standard Node.js/Pnpm workspace: installs Pnpm, sets up Node.js (with Pnpm caching and the `@dnd-mapp` scope), and installs dependencies.

## Usage

```yaml
steps:
    - name: Setup workspace
      uses: dnd-mapp/action-setup-workspace@<SHA> # vX.Y.Z
```

### Inputs

| Name                   | Description                                               | Default  |
|------------------------|-----------------------------------------------------------|----------|
| `install-dependencies` | Whether to run `pnpm i` after setting up Node.js and Pnpm | `'true'` |

Set `install-dependencies: 'false'` to get the Pnpm/Node.js toolchain set up without installing dependencies.

Pin to a commit SHA (not a floating tag) as shown above; the `# vX.Y.Z` comment is just a human-readable label of which release that SHA corresponds to. See [CHANGELOG.md](CHANGELOG.md) for release history, and the git tags for available versions (each release is tagged `vX.Y.Z`, with the `v1` tag floating to the latest `v1.x.y`).

## Contributing

See the org-wide [CONTRIBUTING.md](https://github.com/dnd-mapp/.github/blob/main/CONTRIBUTING.md) for how to propose changes, and [DEVELOPMENT.md](DEVELOPMENT.md) for how to work in this repository day-to-day. This project follows the [Code of Conduct](https://github.com/dnd-mapp/.github/blob/main/CODE_OF_CONDUCT.md).

## Security

See [SECURITY.md](https://github.com/dnd-mapp/.github/blob/main/SECURITY.md) for how to report a vulnerability.

## Support

See [SUPPORT.md](https://github.com/dnd-mapp/.github/blob/main/SUPPORT.md) for how to get help.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

[MIT](LICENSE)
