import React from 'react';
import { useSelector } from 'react-redux';
import { updateGroup } from '../../../store/actions/group_actions';
import { useTextInput } from '../../../util/custom_hooks';
import { modalDataSelector } from '../../../util/hooks_selectors';
import SmallModal from './small_modal';

export default function RenameGroupModal() {
  const { group } = useSelector(modalDataSelector);
  const [ title, inputProps ] = useTextInput(group?.title);

  function submissionHandler(dispatch) {
    return dispatch(updateGroup({ ...group, title }));
  };

  const modalProps = {
    header: 'Edit group',
    subtext: 'Update group name',
    submissionText: 'Update name',
    submissionDisabled: !title,
    inputProps,
    submissionHandler,
  }

  return <SmallModal {...modalProps} />
}