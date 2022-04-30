import React from 'react'
import Post from '../post/Post'
import axios from 'axios';
import {useState, useEffect} from 'react'

export default function Posts() {

  const api = axios.create({
    baseURL: "http://localhost:5000/posts"
  });

  const [data, setData] = useState([]);

  function getData(){
    api.get('/')
      .then(response => {
        setData(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="posts justify-content-center " style={{display:'flex', flexWrap:'wrap'}}>
        {data.map(post => <Post key={post.post_id} post_id={post.post_id}/>)}
    </div>
  )
}
