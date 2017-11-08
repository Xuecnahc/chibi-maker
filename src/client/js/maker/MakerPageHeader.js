'use strict'
import React from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import Icon from 'react-fontawesome'
import {Button, ButtonToolbar, Form, InputGroup, FormGroup, FormControl} from 'react-bootstrap'
import {CharacterUtil} from '../utils/CharacterUtil'

const style = {
  header: {
    width: '100%',
    height: '42px',
    padding: '4px',
    margin: '0',
    backgroundColor: '#7BDCB5',
    borderBottom: '1px solid #ABB8C3',
    display: 'flex'
  },
  nameInputForm: {
    display: 'inline-block'
  },
  buttonBar: {
    marginLeft: '10px',
    paddingLeft: '5px',
    borderLeft: '1px solid grey'
  }
}

const MakerPageHeader = ({addCharacter, renameCharacterWithName, characters, removeLastCharacter}) => {
  const character = characters.slice(-1)[0]
  const randomize = () => addCharacter(CharacterUtil.generateRandom())
  const saveName = event => renameCharacterWithName(character.name, event.target.value)
  const randomizeName = () => renameCharacterWithName(character.name, CharacterUtil.generateName())
  const download = () => CharacterUtil.download(characters)

  return (
    <div style={style.header}>
      <ButtonToolbar>
        <Button disabled={characters.length <= 1} onClick={removeLastCharacter} title="Previous">
          <Icon name="arrow-left" />
        </Button>
        <Button onClick={randomize} bsStyle="danger" title="Randomize">
          <Icon name="random" />
        </Button>
      </ButtonToolbar>
      <ButtonToolbar style={style.buttonBar}>
        <Form inline style={style.nameInputForm}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" value={character.name || ''} onChange={saveName}/>
              <InputGroup.Button>
                <Button onClick={randomizeName} title="Generate name">
                  <Icon name="repeat" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Form>
        <Button disabled={!character.name} onClick={download} title="Download">
          <Icon name="download" />
        </Button>
        <Button disabled={!character.name} onClick={CharacterUtil.save.bind(null, character)} title="Save">
          <Icon name="save" />
        </Button>
      </ButtonToolbar>
    </div>
  )
}

MakerPageHeader.propTypes = {
  characters: PropTypes.array.isRequired,
  addCharacter: PropTypes.func.isRequired,
  renameCharacterWithName: PropTypes.func.isRequired,
  removeLastCharacter:  PropTypes.func.isRequired
}

export default MakerPageHeader
