import React from 'react'
import Post from '../post/Post'
import {useState, useEffect, useCallback} from 'react';
import API from '../../Api.js';

export default function Posts() {

  const [data, setData] = useState([]);

  const getData = useCallback( () => {
    API.get("")
      .then(response => {
        setData(response.data);
      })
      .catch(err => console.log(err));
  }, [ ]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="posts justify-content-center " style={{display:'flex', flexWrap:'wrap'}}>
      {data.map(post => <Post key={post.post_id} post_id={post.post_id}/>)}
    </div>
  )
}
