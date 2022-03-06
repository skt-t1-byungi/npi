import sade from 'sade'
import pkg from '../package.json'

sade('npi [package]', true)
    .version(pkg.version)
    .option('-b, --bin', 'Package Manager binary.')
    .option('-d, --dev', 'Install to devDependencies.')
    .option('-p, --peer', 'Install to peerDependencies.')
    .option('-f, --folder', 'Folder to be installed. Default is "vendors".', 'vendors')
    .action((pkg: string, opts: any) => () => {
        console.log(pkg, opts)
    })
    .parse(process.argv)
