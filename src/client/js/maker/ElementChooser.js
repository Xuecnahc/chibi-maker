import React from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import ButtonSelector from './ButtonSelector'
import ElementCollection from './ElementCollection'
import ColorPicker from './ColorPicker'
import {ColorUtil} from '../utils/ColorUtil'

class ElementChooser extends React.Component {
  constructor(props) {
    super(props)
    const defaultGroup = Object.keys(this.props.groups)[0]
    this.state = {
      selectedItemGroup: defaultGroup,
      selectedItem: this.props.character.parts[defaultGroup].id || null,
      selectedColors: this.props.character.parts[defaultGroup].colors
    }
  }

  componentWillReceiveProps(nextProps) {
    const group = this.props.groups === nextProps.groups
      ? this.state.selectedItemGroup
      : Object.keys(nextProps.groups)[0]

    this.itemGroupSelected(group, nextProps)
  }

  /**
   * @param {String} groupId
   * @param {Object} [props=this.props]
   */
  itemGroupSelected(groupId, props = this.props) {
    this.setState({
      selectedItemGroup: groupId,
      selectedItem: props.character.parts[groupId].id || null,
      selectedColors: props.character.parts[groupId].colors
    })
  }

  /**
   * @param {String} itemId
   * @param {String[]} colors contains primary and secondary colors in hex format
   */
  _triggerChangeCallback(itemId, colors) {
    const itemParams = this.props.groups[this.state.selectedItemGroup][itemId]
    const element = Object.assign({id: itemId, colors: colors}, itemParams)
    const name = this.props.character.name
    const characterParts = Object.assign(
      {},
      this.props.character.parts,
      {[this.state.selectedItemGroup]: element}
    )

    this.props.replaceCharacter(name, {parts: characterParts, name: name})
  }

  /**
   * @param {String} itemId
   */
  itemSelected(itemId) {
    this._triggerChangeCallback(itemId, this.state.selectedColors)
  }

  /**
   * @param {Number} position 0 for primary color, 1 for secondary color
   * @param {Object} color
   * @param {Number} color.r red
   * @param {Number} color.g green
   * @param {Number} color.b blue
   * @param {Number} color.a opacity
   */
  colorSelected(position, {rgb}) {
    const newColors = this.state.selectedColors.slice(0)
    newColors[position] = ColorUtil.RGBAToHex(rgb)
    this._triggerChangeCallback(this.state.selectedItem, newColors)
  }

  render() {
    return (
      <div>
        <ButtonSelector
          name={'creator-subheader'}
          fullWidth={true}
          values={this.props.groups}
          selected={this.state.selectedItemGroup}
          onChange={this.itemGroupSelected.bind(this)} />
        <ElementCollection
          name={'creator-element-picker-' + this.state.selectedItemGroup}
          values={this.props.groups[this.state.selectedItemGroup]}
          selected={this.state.selectedItem || 'none'}
          onChange={this.itemSelected.bind(this)} />
        <ColorPicker
          key={'primary-color-picker-' + this.state.selectedItemGroup}
          onChange={this.colorSelected.bind(this, 0)}
          selectedColor={ColorUtil.hexToRGBA(this.state.selectedColors[0])}
          colors={this.props.colors} />
        <ColorPicker
          key={'secondary-color-picker-' + this.state.selectedItemGroup}
          onChange={this.colorSelected.bind(this, 1)}
          selectedColor={ColorUtil.hexToRGBA(this.state.selectedColors[1])}
          colors={this.props.colors} />
      </div>
    )
  }
}

ElementChooser.propTypes = {
  groups: PropTypes.object.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  character: PropTypes.object.isRequired,
  replaceCharacter: PropTypes.func.isRequired
}

export default ElementChooser
