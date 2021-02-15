/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type pollsIndexQueryVariables = {||};
export type pollsIndexQueryResponse = {|
  +groups: $ReadOnlyArray<{|
    +title: string,
    +numPolls: number,
    +ord: number,
    +polls: ?$ReadOnlyArray<{|
      +title: string,
      +active: boolean,
      +ord: number,
      +numResponses: number,
    |}>,
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
    title
    numPolls
    ord
    polls {
      title
      active
      ord
      numResponses
      id
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numPolls",
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
  "name": "active",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numResponses",
  "storageKey": null
},
v5 = {
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
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Poll",
            "kind": "LinkedField",
            "name": "polls",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v3/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
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
            "concreteType": "Poll",
            "kind": "LinkedField",
            "name": "polls",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v3/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2938b70f33884fe863c2ea4be178b572",
    "id": null,
    "metadata": {},
    "name": "pollsIndexQuery",
    "operationKind": "query",
    "text": "query pollsIndexQuery {\n  groups {\n    title\n    numPolls\n    ord\n    polls {\n      title\n      active\n      ord\n      numResponses\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '76f8a9b4f78ae6056184914091b86067';

module.exports = node;
