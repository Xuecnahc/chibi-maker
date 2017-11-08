import React from 'react' // eslint-disable-line
import util from 'util'

import {ERRORS} from '../../../common/constants/Codes.js'
import ErrorComponent from './ErrorComponent.js'

const NotFoundPage = () => {
  return (<ErrorComponent
    partial={false}
    error={{
      status: ERRORS.ERROR_PAGE_NOT_FOUND,
      statusText: util.format('Page Not Found: %s', window.location.href)
    }}
  />)
}

export default NotFoundPage
