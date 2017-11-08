import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import assert from 'assert'
import {QueryRenderer} from 'react-relay'

import testCharacter from '../../json/characters/0.json'
import ListPage from '../../../src/client/js/list/ListPage'

const originalFetch = QueryRenderer.prototype._fetch
describe('<ListPage />', () => {
  it('display the list on data', () => {
    // sauvagely moch the fetch function
    QueryRenderer.prototype._fetch = () => ({props: {getCharacters: [testCharacter]}})
    const wrapper = shallow(<ListPage />)
    assert.equal(1, wrapper.dive().find('ListPageGrid').length)
    QueryRenderer.prototype._fetch = originalFetch
  })

  it('display the error component on error', () => {
    // sauvagely moch the fetch function
    QueryRenderer.prototype._fetch = () => ({error: {status: '406', statusTxt: 'test'}})
    const wrapper = shallow(<ListPage />)
    assert.equal(1, wrapper.dive().find('ErrorComponent').length)
    QueryRenderer.prototype._fetch = originalFetch
  })
})
