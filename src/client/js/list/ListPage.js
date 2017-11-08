import React from 'react' // eslint-disable-line
import {QueryRenderer} from 'react-relay'

import {GetAllCharacterQuery} from '../graphql/queries/GetAllCharacterQuery'
import environment from '../Environment'
import ErrorComponent from '../errors/ErrorComponent.js'
import ListPageGrid from './ListPageGrid'

const ListPage = () => {
  return (
    <QueryRenderer
      environment={environment}
      query={GetAllCharacterQuery}
      variables={{}}
      render={({props, error}) => {
        if (error) {
          return <ErrorComponent error={error} />
        }
        if (props) {
          return <ListPageGrid characters={props.getCharacters}/>
        }

        return <div className="loader">Loading</div>
      }}
    />
  )
}

export default ListPage
