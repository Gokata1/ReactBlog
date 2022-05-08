import React from 'react';
import'./create.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../Api.js';

export default function Create () {
  const [data, setData] = useState({
    post_title:'',
    post_author:"John Doe",
    post_content: ""
  })

  let navigate = useNavigate('/home');

  function handleChange(value, location){
    setData({...data, [location]: value});
  };

   async function postData(){
    if(!data.post_title || !data.post_content){
      alert(`${(!data.post_title) ?"Title"  : "Content"} can not be empty!!`)
    }else{
      alert("New Post Created!!!!!");
      await API.post("",data).then(response => console.log(response)).catch(error => console.log(error));
      navigate('/home');
    }
  }

  return (
    <div className="write">
      <form className="createForm">
        <div className='formContent d-flex flex-column m-6 p-3'>
          <input 
            type="text" 
            placeholder='Title' 
            className="writeInput titleInput" 
            autoFocus={true}
            value={data.post_title}
            onChange={event => handleChange(event.target.value, "post_title")}
          />
          <textarea 
            placeholder='Tell your Story....' 
            type='text' 
            className='writeInput textInput'
            value={data.post_content}
            onChange={event => handleChange(event.target.value, "post_content")}
          />
        </div>
      </form>
      <button className='writeSubmit ms-3' onClick={postData}>Publish</button>
    </div>
  )
}
