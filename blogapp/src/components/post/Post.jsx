import React from 'react';
import Card from 'react-bootstrap/Card';
import './post.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function Post({post_id}) {

  const api = axios.create({
    baseURL: `http://localhost:5000/posts`
  });

  const [data, setData] = useState({
    post_title: '',
    post_author: '',
    post_content: ''
  });

  function getData(){
    api.get(`/${post_id}`)
      .then(response => {
        setData(response.data[0]);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="post m-2 ">
        <Card style={{ width: '18rem', cursor:'pointer'}}>
          <Card.Body>
            <Card.Title> {data.post_title} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{data.post_author}</Card.Subtitle>
            <Card.Text className="cardContent overflowControl" >
              {data.post_content}
            </Card.Text>
            <Card.Link as={Link} to={`/single/${post_id}`}>Read...</Card.Link>
          </Card.Body>
        </Card>        
    </div>
  )
}
