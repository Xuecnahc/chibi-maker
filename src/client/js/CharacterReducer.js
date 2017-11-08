import defaultCharacter from '../config/default_design.json'

const CharacterReducer = (state = [defaultCharacter], action) => {
  switch (action.type) {
  case 'ADD_CHARACTER':
    return state.concat(action.character)
  case 'REMOVE_LAST_CHARACTER':
    return state.slice(0, -1)
  case 'REMOVE_CHARACTER':
    return state.filter(character => {
      return action.character.name === character.name
    })
  case 'RENAME_CHARACTER':
    return state.map(character => {
      return !character.name || action.name === character.name
        ? Object.assign({}, character, {name: action.newName})
        : character
    })
  case 'REPLACE_CHARACTER':
    return state.map(character => {
      return action.name === character.name ? action.character : character
    })
  case 'RESET':
    return []
  default:
    return state
  }
}

export default CharacterReducer
