import _ from 'lodash'

class ColorUtil {
  /**
   * @static
   *
   * @param {String} hex color of form #RRGGBBAA or #RRGGBB
   *
   * @returns {Object} rgba
   * @returns {Number} rgba.r red value from 0 to 255
   * @returns {Number} rgba.g green value from 0 to 255
   * @returns {Number} rgba.b blue value from 0 to 255
   * @returns {Number} rgba.a transparancy value from 0 to 1
   */
  static hexToRGBA(hex) {
    _.padEnd(hex, 9, 'F') // Add alpha if missing
    return {
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
      a: parseInt(hex.slice(7, 9), 16) / 255
    }
  }

  /**
   * @static
   *
   * @param {Object} rgba
   * @param {Number} rgba.r red value from 0 to 255
   * @param {Number} rgba.g green value from 0 to 255
   * @param {Number} rgba.b blue value from 0 to 255
   * @param {Number} [rgba.a=1] transparancy value from 0 to 1
   *
   * @returns {String} hex color of form #RRGGBBAA or #RRGGBB
   */
  static RGBAToHex({r, g, b, a = 1}) {
    return '#' + [r, g, b, a * 255].map(x => {
      const hex = x.toString(16).split('.')[0]
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  /**
   * @static
   *
   * @returns {String} hex color of form #RRGGBBAA or #RRGGBB
   */
  static randHex() {
    return '#' + ((1 << 24) * Math.random() | 0).toString(16).padEnd(6, 0)
  }
}

exports.ColorUtil = ColorUtil
