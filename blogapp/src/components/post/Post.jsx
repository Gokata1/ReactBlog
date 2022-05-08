import React from 'react';
import Card from 'react-bootstrap/Card';
import './post.css';
import {useState, useEffect, useCallback, memo} from 'react';
import { Link } from 'react-router-dom';
import API from '../../Api.js';

function Post({post_id}) {

  const [data, setData] = useState({
    post_title: '',
    post_author: '',
    post_content: ''
  });

  const getData = useCallback( () => {
    API.get(`/${post_id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(err => console.log(err));
  }, [post_id])

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="post m-2 ">
        <Card style={{ width: '18rem', cursor:'pointer'}}>
          <Card.Body>
            <Card.Title> {data.post_title} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{data.post_author}</Card.Subtitle>
            <Card.Text className="cardContent overflowControl" >
              {data.post_content}
            </Card.Text>
            <Card.Link as={Link} to={`/posts/${post_id}`}>Read...</Card.Link>
          </Card.Body>
        </Card>        
    </div>
  )
}

export default memo(Post);