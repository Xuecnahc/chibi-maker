const {JSDOM} = require('jsdom')
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import canvasMock from 'canvas-mock'

Enzyme.configure({adapter: new Adapter()})
const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://test-maker/'
})
const {window} = jsdom

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop))
  Object.defineProperties(target, props)
}

window.HTMLCanvasElement.prototype.getContext = canvasMock.prototype.getContext
global.window = window
global.document = window.document
global.navigator = {userAgent: 'node.js',}
copyProps(window, global)
