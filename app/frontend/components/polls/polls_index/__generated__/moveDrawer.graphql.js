/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type groupSearch$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type moveDrawer$ref: FragmentReference;
declare export opaque type moveDrawer$fragmentType: moveDrawer$ref;
export type moveDrawer = $ReadOnlyArray<{|
  +_id: number,
  +ord: number,
  +$fragmentRefs: groupSearch$ref,
  +$refType: moveDrawer$ref,
|}>;
export type moveDrawer$data = moveDrawer;
export type moveDrawer$key = $ReadOnlyArray<{
  +$data?: moveDrawer$data,
  +$fragmentRefs: moveDrawer$ref,
  ...
}>;
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "moveDrawer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "_id",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "groupSearch"
    }
  ],
  "type": "Group",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'e99928bdf5d30a1cd42738d241105ae3';

module.exports = node;
