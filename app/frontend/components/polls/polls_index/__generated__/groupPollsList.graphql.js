/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type groupHeader$ref = any;
type pollListItem$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type groupPollsList$ref: FragmentReference;
declare export opaque type groupPollsList$fragmentType: groupPollsList$ref;
export type groupPollsList = {|
  +_id: number,
  +title: string,
  +ord: number,
  +pollIds: ?$ReadOnlyArray<number>,
  +polls: ?$ReadOnlyArray<{|
    +_id: number,
    +$fragmentRefs: pollListItem$ref,
  |}>,
  +$fragmentRefs: groupHeader$ref,
  +$refType: groupPollsList$ref,
|};
export type groupPollsList$data = groupPollsList;
export type groupPollsList$key = {
  +$data?: groupPollsList$data,
  +$fragmentRefs: groupPollsList$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "_id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "groupPollsList",
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
      "name": "ord",
      "storageKey": null
    },
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
      "concreteType": "Poll",
      "kind": "LinkedField",
      "name": "polls",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "pollListItem"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "groupHeader"
    }
  ],
  "type": "Group",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a03e172f0825df9529f1120969efcc9d';

module.exports = node;
