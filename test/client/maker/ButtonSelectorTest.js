import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import sinon from 'sinon'
import assert from 'assert'

import ButtonSelector from '../../../src/client/js/maker/ButtonSelector'

describe('<ButtonSelector />', () => {
  const props = {
    name: 'some_name',
    values: {test1: 'test1', test2: 'test2'},
    selected: 'test2',
    onChange: sinon.stub()
  }

  it('should create the list of buttons', () => {
    const wrapper = shallow((<ButtonSelector {...props}/>))
    assert.equal(1, wrapper.find('[name=\'some_name\']').length)
    assert.equal(2, wrapper.find('ToggleButton').length)
    assert.equal(1, wrapper.find('ToggleButton[value=\'test1\']').length)
    assert.equal(1, wrapper.find('ToggleButton[value=\'test2\']').length)
  })

})
