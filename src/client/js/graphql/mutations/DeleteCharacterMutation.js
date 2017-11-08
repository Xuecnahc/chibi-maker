const {graphql} = require('react-relay')

const DeleteCharacterMutation = graphql`
  mutation DeleteCharacterMutation(
    $id: String!
  ) {
    deleteCharacter(id: $id) {
      status
      statusText
    }
  }
`

exports.DeleteCharacterMutation = DeleteCharacterMutation
