import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import sinon from 'sinon'
import assert from 'assert'

import ChibiListElement from '../../../src/client/js/list/ChibiListElement'
import testCharacter from '../../json/characters/0.json'

describe('<ChibiListElement />', () => {
  const props = {
    character: testCharacter,
    onDelete: sinon.stub(),
    onDownload: sinon.stub()
  }

  it('should create element with character', () => {
    const wrapper = shallow((<ChibiListElement {...props}/>))
    assert.equal(1, wrapper.find('ChibiCanvas').length)
    assert.equal(1, wrapper.find('ButtonToolbar').length)
    assert.equal(1, wrapper.find('Button[name="Delete"]').length)
    assert.equal(1, wrapper.find('Button[name="Download"]').length)
    assert.equal(2, wrapper.find('Link Button').length)
  })

  it('should trigger deletion', () => {
    const wrapper = shallow((<ChibiListElement {...props}/>))
    wrapper.find('Button[name="Delete"]').simulate('click')
    sinon.assert.calledOnce(props.onDelete)
  })

  it('should trigger download', () => {
    const wrapper = shallow((<ChibiListElement {...props}/>))
    wrapper.find('Button[name="Download"]').simulate('click')
    sinon.assert.calledOnce(props.onDownload)
  })
})
