import React from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import {Tabs, Tab} from 'react-bootstrap'
import _ from 'lodash'

import ElementChooser from './ElementChooser'

const style = {
  padding: '0 5px',
  borderTopRadius: '5px',
  border: '1px solid #ccc'
}

const CreatorComponent = ({categories, character, colors, replaceCharacter}) => {
  return (
    <Tabs
      id="creator-component-tabs"
      justified={true}
      style={style}
      defaultActiveKey={Object.keys(categories)[0]}
      animation={false}>
      {
        _.map(categories, (category, key) =>
          <Tab eventKey={key} key={key} title={key}>
            <ElementChooser
              category={key}
              character={character}
              groups={category}
              colors={colors}
              replaceCharacter={replaceCharacter} />
          </Tab>)
      }
    </Tabs>
  )
}

CreatorComponent.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  replaceCharacter: PropTypes.func.isRequired
}

export default CreatorComponent
