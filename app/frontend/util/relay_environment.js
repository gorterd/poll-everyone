import {
  Environment, Network, RecordSource, Store
} from 'relay-runtime'
import ajax from './ajax.js'

export default new Environment({
  network: Network.create((params, variables) => ajax({
    url: '/graphql',
    method: 'POST',
    data: { query: params.text, variables }
  })),
  store: new Store(new RecordSource(), {
    gcReleaseBufferSize: 10
  }),
})