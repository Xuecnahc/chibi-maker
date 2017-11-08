import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import assert from 'assert'
import sinon from 'sinon'

import groups from '../../json/groups.json'
import ElementCollection from '../../../src/client/js/maker/ElementCollection'

describe('<ElementCollection />', () => {
  const groupId = Object.keys(groups)[0]
  const group = groups[groupId]
  const firstItemId = Object.keys(group)[0]
  const props = {
    name: groupId,
    values: group,
    selected: firstItemId,
    onChange: sinon.stub()
  }

  it('should create the element with props', () => {
    const wrapper = shallow((<ElementCollection {...props}/>))
    assert.equal(Object.keys(group).length, wrapper.find('ToggleButton').length)
  })
})
