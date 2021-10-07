require('dotenv').config()
const execa = require('execa')
const fs = require('fs')

;(async () => {
  const { CF_API_TOKEN, CF_ZONE, CF_RECORD } = process.env
  if (!CF_API_TOKEN || !CF_ZONE || !CF_RECORD)
    throw new Error('Please check environment variables')
  try {
    console.info('IPFS deployer started!')
    if (fs.existsSync('build')) {
      console.info('Removing old build...')
      await execa.command('rm -r build', { shell: true })
    }
    console.info('Building website...')
    await execa.command('npm run build', { shell: true })
    console.info('Deploying to IPFS...')
    const result = await execa.command(
      `IPFS_DEPLOY_CLOUDFLARE__API_TOKEN=${CF_API_TOKEN} IPFS_DEPLOY_CLOUDFLARE__ZONE=${CF_ZONE} IPFS_DEPLOY_CLOUDFLARE__RECORD=${CF_RECORD} ipd -d cloudflare build`,
      { shell: true }
    )
    console.info({ result })
    console.info('DONE!')
    process.exit()
  } catch (e) {
    console.error(e.toString())
  }
})()
