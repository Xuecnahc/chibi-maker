import React from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import {fabric} from 'fabric'
import _ from 'lodash'

class ChibiCanvas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {canvasId: 'canvas-' + (props.character.id || 'none')}
    this.canvas = null
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.state.canvasId)
    this._drawChibi(this.canvas, this.props.character)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.character.id !== this.props.character.id) {
      const newId = 'canvas-' + (nextProps.character.id || 'none')
      this.canvas.dispose()
      this.canvas = new fabric.Canvas(newId)
      this.setState({canvasId: 'canvas-' + newId})
    }
    this._drawChibi(this.canvas, nextProps.character)
  }

  _drawChibi(canvas, character) {
    canvas.clear()
    _.forEach(character.parts, part => {
      fabric.loadSVGFromURL('/assets/circle.svg', (objects, options) => {
        const chibiParts = objects.map(object => {
          return _.defaults({stroke: part.colors[0], fill: part.colors[1]}, object)
        })
        let group = fabric.util.groupSVGElements(chibiParts, options)

        group
          .set({
            left: Math.floor(Math.random() * this.props.canvasStyle.width),
            top: Math.floor(Math.random() * this.props.canvasStyle.height)
          })
          .scaleToWidth(Math.floor(Math.random() * 100))
          .setCoords()

        canvas.add(group)
      })
    })
  }

  render() {
    return (
      <div style={this.props.canvasStyle}>
        <canvas
          id={this.state.canvasId}
          width={this.props.width || this.props.canvasStyle.width}
          height={this.props.height || this.props.canvasStyle.height}>
        </canvas>
      </div>
    )
  }
}

ChibiCanvas.propTypes = {
  character: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  canvasStyle: PropTypes.object
}

export default ChibiCanvas
