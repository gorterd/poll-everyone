import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useQueryLoader } from 'react-relay/hooks'

const QueryLink = ({ query, variables = {}, ...rest}) => {
  const [queryRef, loadQuery] = useQueryLoader(query)
  
  const onEnter = () => {
    if (!queryRef) loadQuery(variables, { fetchPolicy: 'store-and-network' })
  }

  return <RouterLink onMouseEnter={onEnter} {...rest} />
}

export default QueryLink