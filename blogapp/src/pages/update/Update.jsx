import React from 'react';
import'./update.css';
import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect, useCallback } from 'react';
import API from '../../Api.js'

export default function Update() {
  const { id } = useParams();
  let navigate = useNavigate();

  const [data, setData] = useState({
    post_title: '',
    post_author: '',
    post_content: ''
  });

  const getData = useCallback( () => {
    API.get(`/${id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(err => console.log(err));
  }, [ id ]);

  useEffect(() => {
    getData();
  }, [ getData ]);

  function handleChange(value, location){
    setData((data) => ( { ...data, [location] : value} ));
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
    API.put(`/${id}`, data )
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
      <button className='btnSubmit ms-3' onClick={handleFormSubmit}>Update</button>
    </div>
  )
}