import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import assert from 'assert'

import NotFoundPage from '../../../src/client/js/errors/NotFoundPage'

describe('<NotFoundPage />', () => {
  it('should renders the page not found error', () => {
    const wrapper = shallow((<NotFoundPage/>))

    const props = wrapper.find('ErrorComponent').props()
    assert.equal('404', props.error.status)
    assert(props.error.statusText.includes('Page Not Found'))
  })
})
