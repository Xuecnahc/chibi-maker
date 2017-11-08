import React from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import _ from 'lodash'

const style = {
  buttonGroup: {
    width: '100%',
    height: '215px',
    overflow: 'auto'
  },
  button: {
    width: '10%',
    padding: '5px'
  }
}

const ElementCollection = ({name, selected, values, onChange}) => {
  return (
    <ToggleButtonGroup
      style={style.buttonGroup}
      type="radio"
      name={name}
      onChange={onChange}
      value={selected}>
      {
        _.map(values, (value, key) => {
          return (
            <ToggleButton
              key={name + '-' + key}
              style={style.button}
              value={key}>
              {key}
            </ToggleButton>)
        })
      }
    </ToggleButtonGroup>
  )
}

ElementCollection.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func
}

export default ElementCollection
