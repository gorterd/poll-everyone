/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type groupSearch$ref = any;
export type pollsNewQueryVariables = {||};
export type pollsNewQueryResponse = {|
  +groups: $ReadOnlyArray<{|
    +_id: number,
    +$fragmentRefs: groupSearch$ref,
  |}>
|};
export type pollsNewQuery = {|
  variables: pollsNewQueryVariables,
  response: pollsNewQueryResponse,
|};
*/


/*
query pollsNewQuery {
  groups {
    _id
    ...groupSearch
    id
  }
}

fragment groupSearch on Group {
  _id
  title
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pollsNewQuery",
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
            "name": "groupSearch"
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
    "name": "pollsNewQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8bd083b3b5df6030be5ae1f8f0300143",
    "id": null,
    "metadata": {},
    "name": "pollsNewQuery",
    "operationKind": "query",
    "text": "query pollsNewQuery {\n  groups {\n    _id\n    ...groupSearch\n    id\n  }\n}\n\nfragment groupSearch on Group {\n  _id\n  title\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b078374eb8a8ab0f6c4e8f863b36bc1e';

module.exports = node;
