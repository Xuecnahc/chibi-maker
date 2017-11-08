const {commitMutation} = require('react-relay')
import defaultEnvironment from '../Environment'

const onCompleted = response => {
  const key = Object.keys(response)[0]
  const message = response[key]
  if (message.status !== '200') {
    console.error(message.statusText)
  }
}

const onError = err => console.error(err)

class RequestUtil {
  /**
   * @params {Mutation} mutation
   * @params {Object} [variables]
   * @params {Environment} [environment]
   * @params {Function} [successCallback]
   * @params {Function} [errorCallback]
   */
  static commitMutation({mutation, variables, environment, successCallback, errorCallback}) {
    commitMutation(environment || defaultEnvironment, {
      mutation,
      variables,
      onCompleted: successCallback || onCompleted,
      onError: errorCallback || onError,
    })
  }
}

exports.RequestUtil = RequestUtil
