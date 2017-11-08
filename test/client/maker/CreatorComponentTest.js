import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import assert from 'assert'
import sinon from 'sinon'
import {Tab} from 'react-bootstrap'

import testCharacter from '../../json/characters/0.json'
import categories from '../../json/categories.json'
import colors from '../../json/colors.json'
import CreatorComponent from '../../../src/client/js/maker/CreatorComponent'

describe('<CreatorComponent />', () => {
  const props = {
    colors: colors,
    categories: categories,
    character: testCharacter,
    replaceCharacter: sinon.stub()
  }

  it('should create the list of buttons', () => {
    const wrapper = shallow((<CreatorComponent {...props}/>))
    assert.equal(Object.keys(props.categories).length, wrapper.find(Tab).length)
  })
})
