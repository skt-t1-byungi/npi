# @byungi/npi

> npm pack and install a remote package

Sometimes there are remote packages that cannot be installed from CI/CD. In this case, it is useful to install them as tarball files. `npi` reduces the repetition of pack and install commands.

## Usage

```sh
# global install
npm i @byungi/npi -g

# run script
npi react@^17 react-dom@^17
```

## License

MIT
