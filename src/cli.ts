import sade from 'sade'
import path from 'node:path'
import fs from 'node:fs/promises'
import pkgJson from '../package.json'
import { detect } from 'detect-package-manager'
import { oraPromise } from 'ora'
import pack from 'libnpmpack'
import { execa } from 'execa'

sade('npi <package>', true)
    .version(pkgJson.version)
    .option('-i, --installer', 'Package manager for install.')
    .option('-d, --dir', 'Directory to download. Default is "vendors".', 'vendors')
    .option('-D, --dev', 'Install to devDependencies.')
    .option('-P, --peer', 'Install to peerDependencies.')
    .option('-O, --optional', 'Install to optionalDependencies.')
    .action(
        async (pkg: string, { _, installer, dir, dev, peer, optional }: Record<string, string> & { _: string[] }) => {
            const cwd = process.cwd()

            installer ??= await detect({ cwd })
            if (!['npm', 'yarn', 'pnpm'].includes(installer)) {
                throw new Error(`Unsupported installer: ${installer}`)
            }

            await fs.mkdir((dir = path.resolve(cwd, dir)), { recursive: true })

            const packages = _.concat(pkg)
            const filePaths = await Promise.all(
                packages.map(pkg =>
                    oraPromise(async () => {
                        const tarball = await pack(pkg)
                        const filePath = path.resolve(dir, path.basename(tarball.resolved))
                        await fs.writeFile(filePath, tarball)
                        return './' + path.relative(cwd, filePath).replaceAll('\\', '/')
                    }, `Downloading: ${pkg}`)
                )
            )

            const mode = dev ? 'dev' : peer ? 'peer' : optional ? 'optional' : null
            await execa(
                installer,
                ['add', ...filePaths, mode && `${installer === 'yarn' ? '--' : '--save-'}${mode}`].filter(
                    Boolean
                ) as string[],
                { cwd, stdout: process.stdout, stderr: process.stderr }
            )
        }
    )
    .parse(process.argv)
