import React from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import {TwitterPicker, AlphaPicker} from 'react-color'

const ColorPicker = props => {
  return (
    <div style={{display: 'inline-block', padding: '0 10px'}}>
      <TwitterPicker
        colors={props.colors}
        color={props.selectedColor}
        onChangeComplete={props.onChange}
        triangle="hide"
        width="400px" />
      <AlphaPicker
        color={props.selectedColor}
        onChangeComplete={props.onChange}
        width="400px" />
    </div>
  )
}

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedColor: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired
  }),
  onChange: PropTypes.func
}

export default ColorPicker
