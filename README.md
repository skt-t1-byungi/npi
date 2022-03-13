# @byungi/npi

> npm pack and install a remote package

[![badge](https://badgen.net/npm/v/@byungi/npi)](https://npm.im/@byungi/npi)

Sometimes, some packages can't be installed on CI/CD. Installing these packages as a tarball file can be an alternative. `npi` reduces the repetition of pack and install commands.

## Usage

```sh
# global install
npm i @byungi/npi -g

# run script
npi react@^17 react-dom@^17
```

## CLI

```
  Description
    npm pack and install a remote package.

  Usage
    $ npi <package> [options]

  Options
    -i, --installer    Package manager for install. (npm, yarn, pnpm)
    -d, --dir          Directory to download. (default vendors)
    -D, --dev          Install to devDependencies.
    -P, --peer         Install to peerDependencies.
    -O, --optional     Install to optionalDependencies.
    -v, --version      Displays current version
    -h, --help         Displays this message

  Examples
    $ npi npi react@^17 react-dom@^17
    $ npi npi jest webpack --dev --installer yarn
```

## License

MIT
