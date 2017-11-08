import React from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import {ButtonToolbar, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Icon from 'react-fontawesome'

// Routes
import Routes from '../../../common/constants/Routes'

import ChibiCanvas from '../canvas/ChibiCanvas'

const width = 150
const height = (width / 25) * 40

const style = {
  container: {
    borderRadius: '10px',
    backgroundColor: '#ABB8C3',
    border: '1px solid #000000',
    display: 'inline-block',
    maxWidth: width + 'px',
    margin: '10px 10px 0 0'
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '30px',
    borderBottom: '1px solid #000000',
    paddingTop: '4px',
    margin: 0
  },
  buttonBar: {
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '40px',
    borderTop: '1px solid #000000',
    padding: '6px',
    margin: 0
  },
  button: {
    padding: '3px 6px',
    marginLeft: '5px'
  },
  icon: {
    color: 'black'
  },
  canvas: {
    width: width,
    height: height
  }
}

const ChibiListElement = ({character, onDelete, onDownload}) => {
  return (
    <div style={style.container}>
      <div style={style.title}>
        <span>{character.name}</span>
      </div>
      <ChibiCanvas character={character} canvasStyle={style.canvas}/>
      <ButtonToolbar style={style.buttonBar}>
        <Link to={[Routes.CREATE, character.id].join('/')}>
          <Button name="Create From" style={style.button}>
            <Icon name="user-plus" style={style.icon}/>
          </Button>
        </Link>
        <Link to={[Routes.EDIT, character.id].join('/')}>
          <Button name="Edit" style={style.button}>
            <Icon name="edit" style={style.icon}/>
          </Button>
        </Link>
        <Button name="Delete" onClick={onDelete} style={style.button}>
          <Icon name="trash" style={style.icon}/>
        </Button>
        <Button name="Download" onClick={onDownload} style={style.button}>
          <Icon name="download" style={style.icon}/>
        </Button>
      </ButtonToolbar>
    </div>
  )
}

ChibiListElement.propTypes = {
  character: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired
}

export default ChibiListElement
