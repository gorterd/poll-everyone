/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type groupHeader$ref: FragmentReference;
declare export opaque type groupHeader$fragmentType: groupHeader$ref;
export type groupHeader = {|
  +_id: number,
  +title: string,
  +ord: number,
  +numPolls: number,
  +pollIds: ?$ReadOnlyArray<number>,
  +$refType: groupHeader$ref,
|};
export type groupHeader$data = groupHeader;
export type groupHeader$key = {
  +$data?: groupHeader$data,
  +$fragmentRefs: groupHeader$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "groupHeader",
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
      "name": "numPolls",
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
(node/*: any*/).hash = '1b1426a914e33d3b42ff26cf3ca57bb9';

module.exports = node;
