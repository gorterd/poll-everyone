import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import ajax from '../util/ajax.js'

const fetchQuery = (operation, variables) => ajax({
  url: '/graphql',
  method: 'POST',
  data: {
    query: operation.text,
    variables,
  },
})

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

export default environment