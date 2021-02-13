import React from 'react'
import { useSelector } from 'react-redux'
import { useCreateGroup } from '../../../../hooks/api/mutation'
import { useInputState } from '../../../../hooks/state'
import { modalDataSelector } from '../../../../util/redux_selectors'
import SmallModal from './polls_index_modal'

export default function NewGroupModal () {
  const [ title, inputProps ] = useInputState()
  const { pollIds } = useSelector(modalDataSelector)
  const { mutate: createGroup } = useCreateGroup()

  const submissionHandler = () => {
    createGroup({ group: { title }, pollIds })
    return Promise.resolve()
  }

  const numPolls = pollIds?.length

  let header, subtext
  if (numPolls > 0) {
    header = 'Create new group'
    subtext = `${numPolls} selected poll${numPolls > 1 ? 's' : ''} will be moved into this group.`
  } else {
    header = 'Create empty group'
    subtext = 'No activities selected.' 
  }
  
  const modalProps = {
    header,
    subtext,
    submissionHandler,
    inputProps: { ...inputProps, placeholder: 'Group name' },
    submissionText: 'Create group',
  }

  return <SmallModal {...modalProps} />
}