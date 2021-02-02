import React from 'react'
import { useSelector } from 'react-redux'
import { useUpdateGroup } from '../../../../hooks/api/mutation'
import { useInputState } from '../../../../hooks/state'
import { modalDataSelector } from '../../../../util/redux_selectors'
import SmallModal from './polls_index_modal'

export default function RenameGroupModal() {
  const { group } = useSelector(modalDataSelector)
  const [ title, inputProps ] = useInputState(group?.title)
  const { mutateAsync: updateGroup } = useUpdateGroup()

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