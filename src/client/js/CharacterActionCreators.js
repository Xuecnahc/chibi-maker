export const addCharacter = character => {
  return {type: 'ADD_CHARACTER', character: character}
}

export const removeCharacter = character => {
  return {type: 'REMOVE_CHARACTER', character: character}
}

export const removeLastCharacter = () => {
  return {type: 'REMOVE_LAST_CHARACTER'}
}

export const renameCharacterWithName = (name, newName) => {
  return {type: 'RENAME_CHARACTER', name: name, newName: newName}
}

export const replaceCharacter = (name, character) => {
  return {type: 'REPLACE_CHARACTER', name: name, character: character}
}

export const reset = () => {
  return {type: 'RESET'}
}
