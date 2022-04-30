import React from 'react';
import'./update.css';
import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import axios from 'axios';

export default function Update() {
  const { id } = useParams();
  let navigate = useNavigate()

  const api = axios.create({
    baseURL: 'http://localhost:5000/posts'
  });

  const [data, setData] = useState({
    post_title: '',
    post_author: '',
    post_content: ''
  })

  function getData(){
    api.get(`/${id}`)
      .then(response => {
        setData(response.data[0]);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getData();
  }, []);

  function handleChange(value, location){
    setData({...data, [location] : value})
  };

  function handleFormSubmit(){
    if(!data.post_title || !data.post_content){
      alert(`${(!data.post_title) ? "Title" : "Content"} can not be empty`);
    }else{
      updateData();
      alert("Post Updated Successfully!");
      navigate('/home')
    }
  }

  function updateData(){
    api.put(`/${id}`, data )
      .then(function (response){
        console.log(response);
      }).catch(function (err){
        console.log(err);
    });
  }

  return (
    <div className="write" >
      <form className="createForm">
        <div className='formContent d-flex flex-column m-6 p-3'>
          <input 
            type="text" 
            placeholder='Title' 
            className="writeInput titleInput"
            autoFocus={true} 
            value={data.post_title}
            onChange={(event) => handleChange(event.target.value, "post_title")}
            />
          <textarea 
            placeholder='Tell your Story....' 
            type='text' className='writeInput textInput' 
            value={data.post_content}
            onChange={(event) => handleChange(event.target.value, "post_content")}
          />
        </div>
      </form>
      <button className='btnSubmit ms-3' onClick={handleFormSubmit}>Publish</button>
    </div>
  )
}