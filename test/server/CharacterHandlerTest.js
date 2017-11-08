const assert = require('assert')
const sinon = require('sinon')
const fs = require('fs-extra')
const path = require('path')
const _ = require('lodash')
const {CharacterHandler} = require('../../src/server/CharacterHandler')

const characterDirPath = path.join(__dirname, '../json/characters')
const tempDirPath = path.join(__dirname, 'temp')

let characterHandler = null
let originalConsoleInfo = console.info
let originalConsoleError = console.error

describe('CharacterHandler', () => {
  beforeEach(() => {
    console.info = sinon.stub()
    console.error = sinon.stub()
    try {
      fs.copySync(characterDirPath, tempDirPath)
    } catch (error) {
      console.error(error)
    }

    characterHandler = new CharacterHandler(tempDirPath)
  })

  afterEach(() => {
    console.info = originalConsoleInfo
    console.error = originalConsoleError
    try {
      fs.removeSync(tempDirPath)
    } catch (error) {
      console.error(error)
    }
    characterHandler = null
  })

  describe('#getAllCharacters()', () => {
    it('should return initial characters', () => {
      const initialCount = fs.readdirSync(tempDirPath).length
      const characters = characterHandler.getAllCharacters()
      assert.equal(initialCount, characters.length)
    })
  })

  describe('#getCharacterByName({String name})', () => {
    it('should return character by name', () => {
      const character = characterHandler.getCharacterByName({name: 'Tamuro Chiyuki'})
      assert.equal('0', character.id)
      assert.equal('Tamuro Chiyuki', character.name)
    })
  })

  describe('#getCharacterById({String id})', () => {
    it('should return character by id', () => {
      const character = characterHandler.getCharacterById({id: '0'})
      assert.equal('0', character.id)
      assert.equal('Tamuro Chiyuki', character.name)
    })
  })

  describe('#renameCharacter({String id, String name})', () => {
    it('should rename character', () => {
      const response = characterHandler.renameCharacter({id: '0', name: 'test'})
      const character = characterHandler.getCharacterById({id: '0'})
      assert.equal('0', character.id)
      assert.equal('test', character.name)
      assert.equal(200, response.status)
    })

    it('should fail if no id is provided', () => {
      const response = characterHandler.renameCharacter({name: 'test'})
      sinon.assert.calledOnce(console.error)
      assert.equal(406, response.status)
    })

    it('should fail if no character with the id is found', () => {
      const response = characterHandler.renameCharacter({id: '9000', name: 'test'})
      sinon.assert.calledOnce(console.error)
      assert.equal(403, response.status)
    })

    it('should not update on writing failure', () => {
      characterHandler._saveCharacterFile = sinon.stub().returns(false)
      const response = characterHandler.renameCharacter({id: '1', name: 'test'})
      const character = characterHandler.getCharacterById({id: '1'})
      assert.equal('Etsuko Eisen', character.name)
      assert.equal(403, response.status)
    })
  })

  describe('#saveCharacter({Character character})', () => {
    it('should add new character if id is `none`', () => {
      const stubCharacter = _.defaults(
        {id: 'none', name: 'test'},
        characterHandler.getCharacterById({id: '0'})
      )
      const response = characterHandler.saveCharacter({character: stubCharacter})
      const character = characterHandler.getCharacterByName({name: 'test'})

      const files= fs.readdirSync(tempDirPath)
      const isFile = files.some(fileName => fileName === character.id + '.json')
      assert.equal(true, isFile)
      assert.equal(200, response.status)
    })

    it('should update file if id exists', () => {
      const initialCount = fs.readdirSync(tempDirPath).length
      const stubCharacter = _.defaults(
        {name: 'test'},
        characterHandler.getCharacterById({id: '0'})
      )
      const response = characterHandler.saveCharacter({character: stubCharacter})
      const character = characterHandler.getCharacterByName({name: 'test'})
      const newCount = fs.readdirSync(tempDirPath).length

      assert.equal('0', character.id)
      assert.equal(initialCount, newCount)
      assert.equal(200, response.status)
    })

    it('should create file if id does not exist', () => {
      const stubCharacter = _.defaults(
        {id: '9000', name: 'test'},
        characterHandler.getCharacterById({id: '0'})
      )
      const response = characterHandler.saveCharacter({character: stubCharacter})
      const character = characterHandler.getCharacterByName({name: 'test'})
      const files = fs.readdirSync(tempDirPath)
      const isFile = files.some(fileName => fileName === '9000.json')

      assert.equal('9000', character.id)
      assert.equal(true, isFile)
      assert.equal(200, response.status)
    })

    it('should fail if no character provided', () => {
      const response = characterHandler.saveCharacter({})

      sinon.assert.calledOnce(console.error)
      assert.equal(406, response.status)
    })

    it('should not update on writing failure', () => {
      characterHandler._saveCharacterFile = sinon.stub().returns(false)
      const response = characterHandler.saveCharacter({id: '1', name: 'test'})
      const character = characterHandler.getCharacterById({id: '1'})
      assert.equal('Etsuko Eisen', character.name)
      assert.equal(406, response.status)
    })
  })

  describe('#deleteCharacter({String id})', () => {
    it('should delete character by id', () => {
      const response = characterHandler.deleteCharacter({id: '0'})
      const character = characterHandler.getCharacterById({id: '0'})
      assert.equal(undefined, character)
      assert.equal(200, response.status)
    })

    it('should fail if no id is provided', () => {
      const response = characterHandler.deleteCharacter({})
      sinon.assert.calledOnce(console.error)
      assert.equal(406, response.status)
    })

    it('should fail if no character with the id is found', () => {
      const response = characterHandler.deleteCharacter({id: '9000'})
      sinon.assert.calledOnce(console.error)
      assert.equal(406, response.status)
    })

    it('should not update on writing failure', () => {
      characterHandler._deleteCharacterFile = sinon.stub().returns(false)
      const response = characterHandler.deleteCharacter({id: '1'})
      const character = characterHandler.getCharacterById({id: '1'})
      assert.equal('Etsuko Eisen', character.name)
      assert.equal(403, response.status)
    })
  })
})
