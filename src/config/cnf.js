import mainnetConfig from './mainnet-config'
import rinkebyConfig from './rinkeby-config' // TODO: change to rinkeby cnf

const branch = process.env.REACT_APP_VERCEL_GIT_COMMIT_REF

const cnf = branch === 'rinkeby' ? rinkebyConfig : mainnetConfig

console.info({ branch, dummyEnv: cnf.DUMMY_ENV })
console.log('update')

export default { branch, ...cnf }
