const {graphql} = require('react-relay')

const SaveCharacterMutation = graphql`
  mutation SaveCharacterMutation(
    $character: CharacterInput!
  ) {
    saveCharacter(character: $character) {
      status
      statusText
    }
  }
`

exports.SaveCharacterMutation = SaveCharacterMutation
