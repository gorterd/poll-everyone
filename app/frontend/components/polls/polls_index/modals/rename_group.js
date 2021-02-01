import React from 'react';
import { useSelector } from 'react-redux';
import { useUpdateGroup } from '../../../../util/api/mutation_hooks';
import { useTextInput } from '../../../../util/custom_hooks';
import { modalDataSelector } from '../../../../util/hooks_selectors';
import SmallModal from './polls_index_modal';

export default function RenameGroupModal() {
  const { group } = useSelector(modalDataSelector);
  const [ title, inputProps ] = useTextInput(group?.title);
  const { mutateAsync: updateGroup } = useUpdateGroup();

  const modalProps = {
    header: 'Edit group',
    subtext: 'Update group name',
    submissionText: 'Update name',
    submissionDisabled: !title,
    submissionHandler: () => updateGroup({ ...group, title }),
    inputProps,
  }

  return <SmallModal {...modalProps} />
}