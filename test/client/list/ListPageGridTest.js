import React from 'react' // eslint-disable-line
import {shallow} from 'enzyme'
import path from 'path'
import fs from 'fs'
import assert from 'assert'
import sinon from 'sinon'

import ListPageGrid from '../../../src/client/js/list/ListPageGrid'
import {CharacterUtil} from '../../../src/client/js/utils/CharacterUtil'

const ITEM_PER_PAGE = 10
const characterDirPath = path.join(__dirname, '../../json/characters')
const characters = fs.readdirSync(characterDirPath).map(fileName => {
  return require(path.join(characterDirPath, fileName))
})

describe('<ListPageGrid />', () => {
  let sandbox = null
  before(() => {
    sandbox = sinon.sandbox.create()
  })

  after(() => {
    sandbox.restore()
  })

  it('should display no character found message if no character provided', () => {
    const wrapper = shallow((<ListPageGrid characters={null}/>))
    assert.equal(1, wrapper.find('div.no-character-found').length)
    assert.equal(0, wrapper.find('ChibiListElement').length)
  })

  it('should render all characters', () => {
    const wrapper = shallow((<ListPageGrid characters={characters}/>))
    assert.equal(characters.length, wrapper.find('ChibiListElement').length)
    assert.equal(1, wrapper.find('Pagination').length)
  })

  it('should hide pagination for less than ' + ITEM_PER_PAGE + ' characters', () => {
    const shortCharacterList = (new Array(ITEM_PER_PAGE - 2)).map(() => characters[0])
    const wrapper = shallow((<ListPageGrid characters={shortCharacterList}/>))
    const paginationProps = wrapper.find('Pagination').props()
    assert.equal('none', paginationProps.style.display)
  })

  it('should show pagination for ore than ' + ITEM_PER_PAGE + ' characters', () => {
    const longCharacterList = (new Array(ITEM_PER_PAGE * 3)).map(() => characters[0])
    const wrapper = shallow((<ListPageGrid characters={longCharacterList}/>))
    const paginationProps = wrapper.find('Pagination').props()
    assert.equal('block', paginationProps.style.display)
    assert.equal(3, paginationProps.items)
    assert.equal(1, paginationProps.activePage)
  })

  it('should change page on pagination button clicked', () => {
    const longCharacterList = (new Array(ITEM_PER_PAGE * 3)).map(() => characters[0])
    const wrapper = shallow((<ListPageGrid characters={longCharacterList}/>))
    wrapper.instance().onPageChange(2)
    wrapper.update()

    const paginationProps = wrapper.find('Pagination').props()
    assert.equal(2, paginationProps.activePage)
  })

  it('should remove deleted character from list', () => {
    sandbox.stub(CharacterUtil, 'delete')
    const wrapper = shallow((<ListPageGrid characters={characters}/>))
    wrapper.instance().onCharacterDeleted('1')
    wrapper.update()

    sinon.assert.calledOnce(CharacterUtil.delete)
    assert.equal(characters.length - 1, wrapper.find('ChibiListElement').length)
  })

  it('should ownload characters', () => {
    sandbox.stub(CharacterUtil, 'download')
    const wrapper = shallow((<ListPageGrid characters={characters}/>))
    wrapper.instance().onDownload(characters[0])

    sinon.assert.calledOnce(CharacterUtil.download)
  })
})
