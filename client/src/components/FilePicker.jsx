import React from 'react'
import Button from './Button';
import { useState } from 'react';


const FilePicker = ({file,setFile,readFile}) => {

  return (
 
  
    <div className='filepicker-container'>

      
      <div className='flex-1 flex-col flex'>
        <input id='file-upload'
        type='file'
        accept='image/*'
        onChange={(event) => setFile(event.target.files[0])}  // first file is selected
        /> 

    <label htmlFor="file-upload" className='filepicker-label '> upload file
      </label>  
      <p className='mt-2 text-gray-700 text-xs text-ellipsis overflow-hidden'>
      {file === '' ? "No file selected" : file.name }
      </p>
   
        <div className='py-20 flex  gap-2 text-gray-800'>
           <Button
           type="filled"
           title="logo"
           handleClick={()=> readFile('logo')}
           customStyles="text-md"/>


    <Button height=""
           type="filled"
           title="Full"
           handleClick={()=> readFile('full')}
           customStyles="text-md"/>
           
  </div>
  
      </div>
      
    </div>
   
    
  )
}

export default FilePicker