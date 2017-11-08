import React from 'react' // eslint-disable-line
import {QueryRenderer} from 'react-relay'
import _ from 'lodash'

import MakerPage from './MakerPage'
import {GetCharacterByIdQuery} from '../graphql/queries/GetCharacterByIdQuery'
import environment from '../Environment'
import ErrorComponent from '../errors/ErrorComponent'

import Routes from '../../../common/constants/Routes'

const CharacterMakerPage = ({match}) => {
  const characterId = match.params.id || null
  return (
    <QueryRenderer
      environment={environment}
      query={GetCharacterByIdQuery}
      variables={{id: characterId}}
      render={({error, props}) => {
        if (error) {
          return <ErrorComponent error={error} />
        } else if (props) {
          if (!props.getCharacterById) {
            return <ErrorComponent error={{status:'406', statusText: 'Character not found'}} />
          }

          const character = match.path.includes(Routes.EDIT)
            ? props.getCharacterById
            : _.omit(props.getCharacterById, 'id')
          return <MakerPage editCharacter={character}/>
        }

        return <div>Loading</div>
      }}
    />
  )
}

CharacterMakerPage.propTypes = {}

export default CharacterMakerPage
