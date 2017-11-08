import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import assert from 'assert'
import sinon from 'sinon'

import groups from '../../json/groups.json'
import colors from '../../json/colors.json'
import testCharacter from '../../json/characters/0.json'
import ElementChooser from '../../../src/client/js/maker/ElementChooser'

describe('<ElementChooser />', () => {
  const props = {
    colors: colors,
    groups: groups,
    character: testCharacter,
    replaceCharacter: sinon.stub()
  }

  it('should create the element with props', () => {
    const wrapper = shallow((<ElementChooser {...props}/>))
    assert.equal(1, wrapper.find('ElementCollection').length)
  })

  it('should trigger change callback on color change', () => {
    const wrapper = shallow((<ElementChooser {...props}/>))
    wrapper.instance().colorSelected(1, {rgb: {r: 255, b: 255, g: 255, a: 1}})
    sinon.assert.calledOnce(props.replaceCharacter)
    props.replaceCharacter.reset()
  })

  it('should trigger change callback on item change', () => {
    const wrapper = shallow((<ElementChooser {...props}/>))
    wrapper.instance().itemSelected('happy')
    sinon.assert.calledOnce(props.replaceCharacter)
    props.replaceCharacter.reset()
  })
})
