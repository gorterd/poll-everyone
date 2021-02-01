import React from 'react';
import { useSelector } from 'react-redux';
import { modalDataSelector } from '../../../../util/hooks_selectors';
import SmallModal from './polls_index_modal';

export default function ConfirmMoveModal() {
  const { sendMoveRequest, numPolls } = useSelector(modalDataSelector);

  const word = numPolls === 1 ? 'poll' : 'polls';
  const subtext =  (
    <>
      {`You selected ${numPolls} ${word}.`}
      <br />
      {`Click 'Apply' to move the selected ${word}.`}
    </>
  );

  const modalProps = {
    header: 'Confirm move',
    submissionText: 'Apply',
    submissionHandler: sendMoveRequest,
    subtext,
  }

  return <SmallModal {...modalProps} />
}