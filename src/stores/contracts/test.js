const Contracts = require('../contracts')
const Dispatcher = require('flux').Dispatcher
const Emitter = require('eventemitter3')

const dispatcher = new Dispatcher()
const emitter = new Emitter()

const contracts = new Contracts({ store, emitter, dispatcher })
