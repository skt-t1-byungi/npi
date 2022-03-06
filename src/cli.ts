import sade from 'sade'
import path from 'node:path'
import fs from 'node:fs'
import pkgJson from '../package.json'
import { detect } from 'detect-package-manager'
import pack from 'libnpmpack'
import execa from 'execa'

sade('npi [package]', true)
    .version(pkgJson.version)
    .option('-b, --bin', 'Package Manager binary.')
    .option('-D, --dev', 'Install to devDependencies.')
    .option('-P, --peer', 'Install to peerDependencies.')
    .option('-f, --folder', 'Folder to be installed. Default is "vendors".', 'vendors')
    .action(async (pkg: string, { bin, dev, peer, folder }: Record<string, string>) => {
        const cwd = process.cwd()
        const dest = path.resolve(cwd, folder)

        fs.mkdirSync(dest, { recursive: true })
        const [pm, tarball] = await Promise.all([bin ?? detect({ cwd }), pack(pkg)])
        fs.writeFileSync(path.resolve(dest, path.basename(tarball.resolved)), tarball)
    })
    .parse(process.argv)
