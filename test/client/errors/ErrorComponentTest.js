import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import assert from 'assert'

import ErrorComponent from '../../../src/client/js/errors/ErrorComponent'

describe('<ErrorComponent />', () => {
  it('should renders the error', () => {
    const error = {status: '403', statusText: 'test'}
    const wrapper = shallow((<ErrorComponent error={error}/>))

    assert(wrapper.find('h1').text().includes(error.status))
    assert(wrapper.find('p').first().text().includes(error.statusText))
  })
})
