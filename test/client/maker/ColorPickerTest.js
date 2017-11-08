import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import assert from 'assert'
import {TwitterPicker, AlphaPicker} from 'react-color'

import ColorPicker from '../../../src/client/js/maker/ColorPicker'
import colors from '../../json/colors.json'

describe('<ColorPicker />', () => {
  const props = {
    colors: colors,
    selectedColor: {r: 0, g: 0, b: 0, a: 1}
  }

  it('should create the list of buttons', () => {
    const wrapper = shallow((<ColorPicker {...props}/>))
    assert.equal(1, wrapper.find(TwitterPicker).length)
    assert.equal(1, wrapper.find(AlphaPicker).length)
    assert.equal(props.selectedColor, wrapper.find(TwitterPicker).props().color)
    assert.equal(props.colors, wrapper.find(TwitterPicker).props().colors)
    assert.equal(props.selectedColor, wrapper.find(AlphaPicker).props().color)
  })
})
