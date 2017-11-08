import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import assert from 'assert'
import _ from 'lodash'
import sinon from 'sinon'

import {CharacterUtil} from '../../../src/client/js/utils/CharacterUtil'
import MakerPageHeader from '../../../src/client/js/maker/MakerPageHeader'
import testCharacter from '../../json/characters/0.json'

describe('<MakerPageHeader />', () => {
  const props = {
    characters: [testCharacter, testCharacter],
    addCharacter: sinon.stub(),
    renameCharacterWithName: sinon.stub(),
    removeLastCharacter: sinon.stub()
  }

  let sandbox = null
  before(() => {
    sandbox = sinon.sandbox.create()
  })

  after(() => {
    sandbox.restore()
  })

  it('should render the header with characters', () => {
    const wrapper = shallow((<MakerPageHeader {...props}/>))
    assert.equal(false, wrapper.find('[title="Previous"]').props().disabled)
    assert.equal(false, wrapper.find('[title="Save"]').props().disabled)
    assert.equal(1, wrapper.find('[title="Randomize"]').length)
    assert.equal(1, wrapper.find('[title="Generate name"]').length)
    assert.equal(false, wrapper.find('[title="Download"]').props().disabled)
    assert.equal(testCharacter.name, wrapper.find('FormControl').props().value)
  })

  it('should render the header without name', () => {
    const noCharacterProps = {
      characters: [_.omit(testCharacter, 'name')],
      addCharacter: sandbox.stub(),
      renameCharacterWithName: sandbox.stub(),
      removeLastCharacter: sandbox.stub()
    }

    const wrapper = shallow((<MakerPageHeader {...noCharacterProps}/>))
    assert.equal(true, wrapper.find('[title="Previous"]').props().disabled)
    assert.equal(true, wrapper.find('[title="Save"]').props().disabled)
    assert.equal(true, wrapper.find('[title="Download"]').props().disabled)
    assert.equal('', wrapper.find('FormControl').props().value)
  })

  it('should generate character and store the last', () => {
    props.addCharacter.reset()
    sandbox.stub(CharacterUtil, 'generateRandom')
    const wrapper = shallow((<MakerPageHeader {...props}/>))
    wrapper.find('[title="Randomize"]').simulate('click')
    sinon.assert.calledOnce(CharacterUtil.generateRandom)
    sinon.assert.calledOnce(props.addCharacter)
  })

  it('should generate name', () => {
    props.renameCharacterWithName.reset()
    sandbox.stub(CharacterUtil, 'generateName')
    const wrapper = shallow((<MakerPageHeader {...props}/>))
    wrapper.find('[title="Generate name"]').simulate('click')
    sinon.assert.calledOnce(CharacterUtil.generateName)
    sinon.assert.calledOnce(props.renameCharacterWithName)
  })

  it('should save character', () => {
    sandbox.stub(CharacterUtil, 'save')
    const wrapper = shallow((<MakerPageHeader {...props}/>))
    wrapper.find('[title="Save"]').simulate('click')
    sinon.assert.calledOnce(CharacterUtil.save)
  })

  it('should download character', () => {
    sandbox.stub(CharacterUtil, 'download')
    const wrapper = shallow((<MakerPageHeader {...props}/>))
    wrapper.find('[title="Download"]').simulate('click')
    sinon.assert.calledOnce(CharacterUtil.download)
  })
})
