/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type toolbar$ref: FragmentReference;
declare export opaque type toolbar$fragmentType: toolbar$ref;
export type toolbar = $ReadOnlyArray<{|
  +_id: number,
  +ord: number,
  +pollIds: ?$ReadOnlyArray<number>,
  +$refType: toolbar$ref,
|}>;
export type toolbar$data = toolbar;
export type toolbar$key = $ReadOnlyArray<{
  +$data?: toolbar$data,
  +$fragmentRefs: toolbar$ref,
  ...
}>;
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "toolbar",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pollIds",
      "storageKey": null
    }
  ],
  "type": "Group",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '4aa58d7f36984d6c0f62cf8743992353';

module.exports = node;
