const colors = require('colors')
const Codes = require('common/constants/Codes.js')

class SignalsHandler {
  constructor(server, port) {
    this.server = server
    this.port = port
  }

  init() {
    process.on('SIGINT', () => {
      console.info(colors.red('SIGINT detected: Shuting down'))
      this.gracefulExit()
    })
    process.on('SIGTERM', () => {
      console.info(colors.red('SIGTERM detected: Shuting down'))
      this.gracefulExit()
    })
  }

  gracefulExit() {
    console.info('Exiting application...')
    this.server.shutdown(() => {
      console.info('[%s] Stopped listening on port %s.', Codes.INFO.STOPPED_CODE, this.port)
      console.info('Exited')
      process.exit(0)
    })
  }
}

exports.SignalsHandler = SignalsHandler
