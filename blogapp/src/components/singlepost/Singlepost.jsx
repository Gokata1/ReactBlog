import './singlePost.css';
import Card from 'react-bootstrap/Card';
import {useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import API from '../../Api.js';

export default function SinglePost( {post_id} ) {
  let navigate = useNavigate()

  const [data, setData] = useState({
    post_title: '',
    post_author: '',
    post_content: ''
  })

  const getData = useCallback( () => {
    API.get(`/${post_id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(err => console.log(err));
  }, [ post_id ]);

  useEffect(() => {
    getData();
  }, [getData]);

  function deletePost(){
    API.delete(`/${post_id}`).then(res => console.log(res)).catch(err => console.log(err));
    alert("Post Deleted");
    navigate('/home');
  }

  return (
    <div className="singlePost p-4">
        <Card >
          <Card.Body>
            <Card.Title className=" fs-2 postTitle">{data.post_title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{data.post_author}</Card.Subtitle>
            <Card.Text>
              {data.post_content}
            </Card.Text>
            <Card.Link as={Link} to={`/posts/update/${post_id}`}><i className="singlePostIcon iconEdit fa-solid fa-square-pen m"></i></Card.Link>
            <Popup trigger={
                <Card.Link >
                  <i className="singlePostIcon iconDelete fa-solid fa-trash-can"/>
                </Card.Link>
              } 
              position="right center"
              >
              <div className="text-center">
                <p>
                  Delete Post?
                </p>
                <Button variant="danger" onClick={deletePost}>Delete</Button>
              </div>
            </Popup>
          </Card.Body>
        </Card>
    </div>
  )
}

