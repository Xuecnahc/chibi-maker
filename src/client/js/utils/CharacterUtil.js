import generateName from 'japanese-name-generator'
import _ from 'lodash'

import {ColorUtil} from './ColorUtil'
import items from '../../config/items.json'
import {SaveCharacterMutation} from '../graphql/mutations/SaveCharacterMutation.js'
import {DeleteCharacterMutation} from '../graphql/mutations/DeleteCharacterMutation.js'
import {RenameCharacterMutation} from '../graphql/mutations/RenameCharacterMutation.js'
import {RequestUtil} from './RequestUtil'

class CharacterUtil {

  /**
   * Save the character into a json file on server side using character name
   * @static
   *
   * @param {Object} character
   * @param {String} character.name
   * @param {Object} character.parts
   */
  static save(character) {
    if (!character.name) {
      return
    }

    const newCharacter = Object.assign({id: 'none'}, character)
    RequestUtil.commitMutation({
      mutation: SaveCharacterMutation,
      variables: {character: newCharacter}
    })
  }

  /**
   * Export the character and serve it to the user
   * @static
   *
   * @param {Object} character
   * @param {String} character.name
   * @param {Object} character.parts
   */
  static download(character) {
    if (!character.name) {
      return
    }

    console.error('Not implemented')
  }

  /**
   * Rename the character with a new name
   * @static
   *
   * @param {String} id
   * @param {String} name
   */
  static rename(id, name) {
    if (!id || !name) {
      return
    }

    RequestUtil.commitMutation({
      mutation: RenameCharacterMutation,
      variables: {id: id, name: name}
    })
  }

  /**
   * Delete the character with the given ID
   * @static
   *
   * @param {String|Object} name|character
   */
  static delete(character) {
    if (!character) {
      return
    }

    const id = typeof character === 'object' ? character.id : character
    RequestUtil.commitMutation({
      mutation: DeleteCharacterMutation,
      variables: {id: id}
    })
  }

  /**
   * Generate a weighted random character
   * @static
   *
   * @returns {Object} character
   */
  static generateRandom() {
    let characterParts = {}
    _.forEach(items, groups => {
      _.forEach(groups, (elements, group) => {
        const totalWeigth = _.reduce(elements, (sum, element) => {
          return sum + (element.weight || 1)
        }, 0)

        let decount = Math.floor(Math.random() * totalWeigth) + 1
        const selectedElement = _.findKey(elements, elem => {
          const weight = elem.weight || 1
          decount = decount - weight
          return decount <= 0
        })

        characterParts[group] = Object.assign(
          {id: selectedElement, colors: [ColorUtil.randHex(), ColorUtil.randHex()]},
          elements[selectedElement]
        )
      })
    })

    return {parts: characterParts, name: generateName().name}
  }

  /**
   * @static
   *
   * @returns {String} A random japanese name...
   */
  static generateName() {
    return generateName().name
  }
}

exports.CharacterUtil = CharacterUtil
