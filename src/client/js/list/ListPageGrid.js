import React from 'react'
import PropTypes from 'prop-types'
import {Pagination} from 'react-bootstrap'

import {CharacterUtil} from '../utils/CharacterUtil'
import ChibiListElement from './ChibiListElement'

const ITEM_PER_PAGE = 10

const style = {
  page: {
    padding: '0 0 10px 10px'
  }
}

class ListPageGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      characters: props.characters // local state that emulates server character list
    }
  }

  onPageChange(eventKey) {
    this.setState({activePage: eventKey})
  }

  onCharacterDeleted(id) {
    CharacterUtil.delete(id)
    const characters = this.state.characters.filter(character => character.id !== id)
    this.setState({characters: characters})
  }

  onDownload(character) {
    CharacterUtil.download(character)
  }

  render() {
    if (!this.state.characters || this.state.characters.length === 0) {
      return (<div className="no-character-found">No characters found!</div>)
    }

    const pageCharacters = this.state.characters.slice(
      (this.state.activePage - 1) * ITEM_PER_PAGE,
      this.state.activePage * ITEM_PER_PAGE
    )
    const itemCount = Math.floor(this.props.characters.length / ITEM_PER_PAGE)

    return (
      <div style={style.page}>
        <div>
          {pageCharacters.map(character => (
            <ChibiListElement
              key={character.name}
              character={character}
              onDelete={this.onCharacterDeleted.bind(this, character.id)}
              onDownload={this.onDownload.bind(this, character)}/>
          ))}
        </div>
        <Pagination prev next first last ellipsis boundaryLinks
          style={{display: itemCount > 1 ? 'block' : 'none'}}
          items={itemCount}
          maxButtons={ITEM_PER_PAGE}
          activePage={this.state.activePage}
          onSelect={this.onPageChange} />
      </div>
    )
  }
}

ListPageGrid.propTypes = {
  characters: PropTypes.array
}

export default ListPageGrid
