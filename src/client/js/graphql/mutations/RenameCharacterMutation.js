const {graphql} = require('react-relay')

const RenameCharacterMutation = graphql`
  mutation RenameCharacterMutation(
    $id: String!
    $name: String!
  ) {
    renameCharacter(id: $id, name: $name) {
      status
      statusText
    }
  }
`

exports.RenameCharacterMutation = RenameCharacterMutation
