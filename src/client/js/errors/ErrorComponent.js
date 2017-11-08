import React from 'react' // eslint-disable-line
import util from 'util'
import PropTypes from 'prop-types'

const ErrorComponent = ({error}) => {
  return (
    <div>
      <h1>{error.status ? util.format('Error %s', error.status) : 'Unknown error'}</h1>
      <p> {error.statusText} </p>
      <p> {util.format('Log: %s', JSON.stringify(error))} </p>
    </div>
  )
}

ErrorComponent.propTypes = {
  error: PropTypes.object.isRequired
}

export default ErrorComponent
