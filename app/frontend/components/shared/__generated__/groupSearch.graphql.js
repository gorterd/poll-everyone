/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type groupSearch$ref: FragmentReference;
declare export opaque type groupSearch$fragmentType: groupSearch$ref;
export type groupSearch = $ReadOnlyArray<{|
  +_id: number,
  +title: string,
  +$refType: groupSearch$ref,
|}>;
export type groupSearch$data = groupSearch;
export type groupSearch$key = $ReadOnlyArray<{
  +$data?: groupSearch$data,
  +$fragmentRefs: groupSearch$ref,
  ...
}>;
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "groupSearch",
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
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Group",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'ba353c76cbc84f5bf8c0ce1939e7c10c';

module.exports = node;
