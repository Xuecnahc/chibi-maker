const {graphql} = require('react-relay')

const GetCharacterByIdQuery = graphql`
  query GetCharacterByIdQuery(
    $id: String!
  ) {
    getCharacterById(id: $id) {
      id
      name
      parts {
        eyes {
          id
          path
          colors
        }
        hairs {
          id
          path
          colors
        }
        jackets {
          id
          path
          colors
        }
        shirts {
          id
          path
          colors
        }
        pants {
          id
          path
          colors
        }
        shoes {
          id
          path
          colors
        }
      }
    }
  }`

exports.GetCharacterByIdQuery = GetCharacterByIdQuery
