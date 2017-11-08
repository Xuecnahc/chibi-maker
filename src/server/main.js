'use strict'
require('app-module-path').addPath(__dirname + '/..')
const minimist = require('minimist')
const express = require('express')
const colors = require('colors')
const util = require('util')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const {buildSchema} = require('graphql')

const {SignalsHandler} = require('server/SignalsHandler.js')
const {CharacterHandler} = require('server/CharacterHandler.js')
const Codes = require('common/constants/Codes.js')

// Init server
const app = express()
const http = require('http').Server(app)
const server = require('http-shutdown')(http)
const processArgs = minimist(process.argv.slice(2))
app.use(bodyParser.json())

// Init signals handling
const signalHandler = new SignalsHandler(server, processArgs.port)
signalHandler.init()
const characterHandler = new CharacterHandler()

const root = {
  // Queries
  getCharacters: characterHandler.getAllCharacters.bind(characterHandler),
  getCharacterByName: characterHandler.getCharacterByName.bind(characterHandler),
  getCharacterById: characterHandler.getCharacterById.bind(characterHandler),
  // Mutations
  saveCharacter: characterHandler.saveCharacter.bind(characterHandler),
  deleteCharacter: characterHandler.deleteCharacter.bind(characterHandler),
  renameCharacter: characterHandler.renameCharacter.bind(characterHandler)
}

const schema = fs.readFileSync(path.resolve(__dirname, '../common/schema.graphql'), 'utf8')
app.use('*/graphql', graphqlHTTP({
  schema: buildSchema(schema),
  rootValue: root,
  graphiql: true
}))

// Routes
app.use(express.static('public'))
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname + '/../client/index.html'))
})

// Start server
server.listen(processArgs.port)
console.info(colors.green(util.format(
  '[%s] Server started on port %s.', Codes.INFO.STARTED_CODE, processArgs.port
)))
