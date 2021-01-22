import React from 'react';
import { useSelector } from 'react-redux';
import { createGroup } from '../../../store/actions/group_actions';
import { clearSelections } from '../../../store/actions/selection_actions/poll_selection_actions';
import { useTextInput } from '../../../util/custom_hooks';
import { currentUserIdSelector, modalDataSelector } from '../../../util/hooks_selectors';
import SmallModal from './small_modal';

export default function NewGroupModal () {
  const [title, inputProps] = useTextInput('');
  const { pollIds } = useSelector(modalDataSelector);
  const currentId = useSelector(currentUserIdSelector);

  function submissionHandler(dispatch) {
    const data = { group: { title }, pollIds };
    return dispatch(createGroup(data, currentId))
      .then( () => dispatch(clearSelections()));      
  }

  const numPolls = pollIds?.length;

  let header, subtext;
  if (numPolls > 0) {
    header = 'Create new group';
    subtext = `${numPolls} selected poll${numPolls > 1 ? 's' : ''} will be moved into this group.`;
  } else {
    header = 'Create empty group';
    subtext = 'No activities selected.'; 
  }
  
  const modalProps = {
    header,
    subtext,
    submissionHandler,
    inputProps: { ...inputProps, placeholder: 'Group name' },
    submissionText: 'Create group',
  }

  return <SmallModal {...modalProps} />
};