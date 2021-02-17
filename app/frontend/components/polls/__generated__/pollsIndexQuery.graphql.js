/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type groupPollsList$ref = any;
type moveDrawer$ref = any;
type toolbar$ref = any;
export type pollsIndexQueryVariables = {||};
export type pollsIndexQueryResponse = {|
  +groups: $ReadOnlyArray<{|
    +_id: number,
    +$fragmentRefs: groupPollsList$ref & moveDrawer$ref & toolbar$ref,
  |}>
|};
export type pollsIndexQuery = {|
  variables: pollsIndexQueryVariables,
  response: pollsIndexQueryResponse,
|};
*/


/*
query pollsIndexQuery {
  groups {
    _id
    ...groupPollsList
    ...moveDrawer
    ...toolbar
    id
  }
}

fragment groupHeader on Group {
  _id
  title
  ord
  numPolls
  pollIds
}

fragment groupPollsList on Group {
  _id
  title
  ord
  pollIds
  ...groupHeader
  polls {
    _id
    ...pollListItem
    id
  }
}

fragment groupSearch on Group {
  _id
  title
}

fragment moveDrawer on Group {
  _id
  ord
  ...groupSearch
}

fragment pollListItem on Poll {
  _id
  title
  active
  ord
  numResponses
  pollType
}

fragment toolbar on Group {
  _id
  ord
  pollIds
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ord",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pollsIndexQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "groups",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "groupPollsList"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "moveDrawer"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "toolbar"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pollsIndexQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "groups",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pollIds",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "numPolls",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Poll",
            "kind": "LinkedField",
            "name": "polls",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "active",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "numResponses",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "pollType",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f49e44d1e7d0d527f4cd055e493014dc",
    "id": null,
    "metadata": {},
    "name": "pollsIndexQuery",
    "operationKind": "query",
    "text": "query pollsIndexQuery {\n  groups {\n    _id\n    ...groupPollsList\n    ...moveDrawer\n    ...toolbar\n    id\n  }\n}\n\nfragment groupHeader on Group {\n  _id\n  title\n  ord\n  numPolls\n  pollIds\n}\n\nfragment groupPollsList on Group {\n  _id\n  title\n  ord\n  pollIds\n  ...groupHeader\n  polls {\n    _id\n    ...pollListItem\n    id\n  }\n}\n\nfragment groupSearch on Group {\n  _id\n  title\n}\n\nfragment moveDrawer on Group {\n  _id\n  ord\n  ...groupSearch\n}\n\nfragment pollListItem on Poll {\n  _id\n  title\n  active\n  ord\n  numResponses\n  pollType\n}\n\nfragment toolbar on Group {\n  _id\n  ord\n  pollIds\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dd3167a3637e46daade7aaf986f0598b';

module.exports = node;
