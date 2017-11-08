const path = require('path')
const fs = require('fs')
const util = require('util')
const colors = require('colors')
const _ = require('lodash')

const FILE_SUFFIX = '.json'

/**
 * The json that describes the chibi character
 * @typedef {Object} CharacterPart
 * @property {String} part
 * @property {String} id
 * @property {String} imagePath
 * @property {String[]} colors
 */

/**
  * The json that describes the chibi character
  * @typedef {Object} CharacterParts
  */

/**
 * The json that describes the chibi character
 * @typedef {Object} Character
 * @property {String} name
 * @property {CharacterParts} parts
 */

/**
 * Handler for character changes
 * @class
 *
 * @param {String}
 */
class CharacterHandler {
  constructor(characterDirPath = path.join(__dirname, '../../public/characters')) {
    this._characterDirPath = characterDirPath
    this._characterMap = {}

    fs.existsSync(characterDirPath) && fs.readdirSync(characterDirPath).forEach(fileName => {
      const character = require(path.join(characterDirPath, fileName))
      this._characterMap[character.id] = character
    })
  }

  // GET Functions
  /**
   * @returns {Character[]} characterList
   */
  getAllCharacters() {
    return _.values(this._characterMap)
  }

  /**
   * @param {String} name
   *
   * @returns {Character} character
   */
  getCharacterByName({name}) {
    return this._characterMap[this._getIdByName(name)]
  }

  /**
   * @param {String} id
   *
   * @returns {Character} character
   */
  getCharacterById({id}) {
    return this._characterMap[id]
  }

  // POST functions
  /**
   * @param {String} id
   * @param {String} name
   *
   * @returns {Object} response
   * @returns {String} response.status
   * @returns {?String} response.statusText
   */
  renameCharacter({id, name}) {
    if (!id || !name) {
      const msg = 'Can not rename %s to %s: some parameters are not defined'
      console.error(colors.red(msg))
      return {status: 406, statusText: msg}
    }

    if (!this._characterMap[id]) {
      const msg = util.format('Can not rename: character with name %s and id %s does not exist', name, id)
      console.error(colors.red(msg))
      return {status: 403, statusText: msg}
    }

    const character = Object.assign({}, this._characterMap[id], {name: name})
    const isSuccess = this._saveCharacterFile(character)
    if (isSuccess) {
      this._characterMap[id] = character
    }

    return isSuccess
      ? {status: 200, statusText: 'Character successfully renamed'}
      : {status: 403, statusText: 'Could not rename character name'}
  }

  /**
   * @param {Character} character
   * @param {String} [character.id]
   *
   * @returns {Object} response
   * @returns {String} response.status
   * @returns {?String} response.statusText
   */
  saveCharacter({character}) {
    if (!character) {
      const msg = 'Wrong or missing character'
      console.error(colors.red(msg))
      return {status: 406, statusText: msg}
    }

    if (!character.name) {
      const msg = 'Character name missing'
      console.error(colors.red(msg))
      return {status: 406, statusText: msg}
    }

    // generate id and timestamp if new character
    const newId = this._getIdByName(character.name) || this._generateId()
    const saveCharacter = character.id === 'none'
      ? Object.assign({}, character, {id: newId, creationTimestamp: Date.now()})
      : character

    const isSuccess = this._saveCharacterFile(saveCharacter)
    if (isSuccess) {
      this._characterMap[saveCharacter.id] = saveCharacter
    }

    return isSuccess
      ? {status: 200, statusText: 'Character successfully saved'}
      : {
        status: 403,
        statusText: util.format(
          'Could not save the character %s with id %s',
          saveCharacter.name,
          saveCharacter.id
        )
      }
  }

  /**
   * @param {String} id
   *
   * @returns {Object} response
   * @returns {String} response.status
   * @returns {?String} response.statusText
   */
  deleteCharacter({id}) {
    if (!id || !this._characterMap[id]) {
      const msg = 'Wrong or missing character'
      console.error(colors.red(msg))
      return {status: 406, statusText: msg}
    }

    const isSuccess = this._deleteCharacterFile(id)
    const name = this._characterMap[id].name
    if (isSuccess) {
      delete this._characterMap[id]
    }

    return isSuccess
      ? {status: 200, statusText:  util.format('Rest in peace %s...', name)}
      : {
        status: 403,
        statusText: util.format(
          'Could not delete the character with name %s and id %s',
          name,
          id
        )
      }
  }

  // Private function
  /**
   * @return {String} id
   */
  _generateId() {
    let id = 0
    while (this._characterMap[id]) {
      ++id
    }

    console.info(colors.grey('[DEBUG] Generated id %s for new character'), id)
    return id.toString()
  }

  /**
   * @return {String} id
   */
  _getIdByName(name) {
    const id = _.findKey(this._characterMap, character => character.name === name)
    if (id) {
      console.info(colors.grey('[DEBUG] Name %s found with id %s'), name, id)
    }

    return id
  }

  /**
   * @private
   *
   * @param {Character} character
   * @param {String} character.id
   *
   * @returns {Boolean} success
   */
  _saveCharacterFile(character) {
    !fs.existsSync(this._characterDirPath) && fs.mkdirSync(this._characterDirPath)

    const fileName = path.join(this._characterDirPath, character.id + FILE_SUFFIX)
    try {
      fs.writeFileSync(fileName, JSON.stringify(character))
      console.info(colors.grey('[DEBUG] Filename %s written'), fileName)
    } catch(error) {
      console.error(colors.red(error))
      return false
    }

    return true
  }

  /**
   * @private
   *
   * @param {String} id
   *
   * @returns {Boolean} success
   */
  _deleteCharacterFile(id) {
    const fileName = path.join(this._characterDirPath, id + FILE_SUFFIX)
    try {
      fs.unlinkSync(fileName)
      console.info(colors.grey('[DEBUG] Filename %s deleted'), fileName)
    } catch(error) {
      console.error(colors.red(error))
      return false
    }

    return true
  }
}

exports.CharacterHandler = CharacterHandler
