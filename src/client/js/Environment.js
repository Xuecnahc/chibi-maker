import {Environment, Network, RecordSource, Store} from 'relay-runtime'

const store = new Store(new RecordSource())
const network = Network.create((operation, variables) => {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    })})
    .then(response => response.json())
    .catch(error => console.error(error))
})

const environment = new Environment({network, store})
export default environment
