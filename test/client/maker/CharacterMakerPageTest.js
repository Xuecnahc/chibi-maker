import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import assert from 'assert'
import {QueryRenderer} from 'react-relay'

import testCharacter from '../../json/characters/0.json'
import CharacterMakerPage from '../../../src/client/js/maker/CharacterMakerPage'
import MakerPage from '../../../src/client/js/maker/MakerPage'
import Routes from '../../../src/common/constants/Routes'

const originalFetch = QueryRenderer.prototype._fetch
describe('<CharacterMakerPage />', () => {
  const props = {match: {path: Routes.CREATE + '/0', params: {id: '0'}}}

  it('display the maker page on data', () => {
    QueryRenderer.prototype._fetch = () => ({props: {getCharacterById: testCharacter}})
    const wrapper = shallow(<CharacterMakerPage {...props}/>)
    assert.equal(1, wrapper.dive().find(MakerPage).length)
    assert.equal(undefined, wrapper.dive().find(MakerPage).props().editCharacter.id)
    QueryRenderer.prototype._fetch = originalFetch
  })

  it('display the maker page with id for edit route on data', () => {
    const editProps = {  match: {path: Routes.EDIT + '/0', params: {id: '0'}}  }
    QueryRenderer.prototype._fetch = () => ({props: {getCharacterById: testCharacter}})
    const wrapper = shallow(<CharacterMakerPage {...editProps}/>)
    assert.equal(1, wrapper.dive().find(MakerPage).length)
    assert.equal('0', wrapper.dive().find(MakerPage).props().editCharacter.id)
    QueryRenderer.prototype._fetch = originalFetch
  })

  it('display the character not found error if no character provided', () => {
    QueryRenderer.prototype._fetch = () => ({props: {getCharacterById: null}})
    const wrapper = shallow(<CharacterMakerPage {...props}/>)
    assert.equal(1, wrapper.dive().find('ErrorComponent').length)
    QueryRenderer.prototype._fetch = originalFetch
  })

  it('display the error component on error', () => {
    QueryRenderer.prototype._fetch = () => ({error: {status: '406', statusTxt: 'test'}})
    const wrapper = shallow(<CharacterMakerPage {...props}/>)
    assert.equal(1, wrapper.dive().find('ErrorComponent').length)
    QueryRenderer.prototype._fetch = originalFetch
  })
})
