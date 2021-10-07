import { ProtocolStakeStats } from './protocolStakeStats'

test('should fetch nexus mututal contracts and find the contract by name', async () => {
  const stats = new ProtocolStakeStats()
  await stats.fetchNexusMututalContrats()
  let protocol = stats.findProtocolByName('Bancor Network')
  expect(protocol.type).toBe('contract')

  let protocolfail = stats.findProtocolByName('tester')
  expect(protocolfail).toBe(null)
})
