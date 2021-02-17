/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type pollListItem$ref: FragmentReference;
declare export opaque type pollListItem$fragmentType: pollListItem$ref;
export type pollListItem = {|
  +_id: number,
  +title: string,
  +active: boolean,
  +ord: number,
  +numResponses: number,
  +pollType: string,
  +$refType: pollListItem$ref,
|};
export type pollListItem$data = pollListItem;
export type pollListItem$key = {
  +$data?: pollListItem$data,
  +$fragmentRefs: pollListItem$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "pollListItem",
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
      "name": "active",
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
      "name": "numResponses",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pollType",
      "storageKey": null
    }
  ],
  "type": "Poll",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '214abbe95828e38d516a1b34c12f8ab9';

module.exports = node;
