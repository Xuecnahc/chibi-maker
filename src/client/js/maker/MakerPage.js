import React from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as actionsCreator from '../CharacterActionCreators'
import CreatorComponent from './CreatorComponent'
import ChibiCanvas from '../canvas/ChibiCanvas'
import MakerPageHeader from './MakerPageHeader'
import items from '../../config/items.json'
import colors from '../../config/colors.json'

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  body: {
    display: 'flex',
    padding: '5px'
  },
  canvas: {
    backgroundColor: '#ABB8C3',
    border: '1px solid #ABB8C3',
    width: 250,
    height: 400
  }
}

class MakerPage extends React.Component {
  constructor(props) {
    super(props)
    this.actions = bindActionCreators(actionsCreator, props.dispatch)
    if (props.editCharacter) {
      this.actions.addCharacter(props.editCharacter)
    }
  }

  render() {
    return (
      <div style={style.container}>
        <MakerPageHeader
          items={items}
          characters={this.props.characters}
          {...this.actions} />
        <div style={style.body}>
          <ChibiCanvas canvasStyle={style.canvas} character={this.props.lastCharacter}/>
          <CreatorComponent
            categories={items}
            colors={colors}
            character={this.props.lastCharacter}
            replaceCharacter={this.actions.replaceCharacter} />
        </div>
      </div>
    )
  }
}

MakerPage.propTypes = {
  characters: PropTypes.array.isRequired,
  lastCharacter: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editCharacter: PropTypes.object
}

const mapStateToProps = characters => ({
  characters: characters,
  lastCharacter: characters.slice(-1)[0]
})

export default connect(mapStateToProps)(MakerPage)
