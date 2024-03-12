import React from 'react'

const ListItem = ({items, renderItem}) => {
  return <>{items.map(renderItem)}</>
}

export default ListItem
