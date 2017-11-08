const {graphql} = require('react-relay')

const GetAllCharacterQuery = graphql`
  query GetAllCharacterQuery {
    getCharacters {
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

exports.GetAllCharacterQuery = GetAllCharacterQuery
