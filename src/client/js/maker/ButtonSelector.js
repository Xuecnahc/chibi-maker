import React from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import _ from 'lodash'

const ButtonSelector = ({name, selected, values, onChange, fullWidth}) => {
  return (
    <ButtonToolbar>
      <ToggleButtonGroup
        type="radio"
        justified={fullWidth}
        name={name}
        onChange={onChange}
        value={selected}>
        {_.map(values, (value, key) => {
          return (<ToggleButton key={name + '-' + key} value={key}>{key}</ToggleButton>)
        })}
      </ToggleButtonGroup>
    </ButtonToolbar>
  )
}

ButtonSelector.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool
}

export default ButtonSelector
