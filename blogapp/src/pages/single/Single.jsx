import React from 'react'
import SinglePost from '../../components/singlepost/Singlepost'
import { useParams } from 'react-router-dom'

export default function Single() {

  const { id } = useParams();

  return (
    <div>
        <SinglePost post_id={id}/>
    </div>
  )
}
