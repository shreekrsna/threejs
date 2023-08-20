import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store';
import { getContrastingColor } from '../config/helpers';

const Button = ({type,title,customStyles,handleClick}) => {
const snap =useSnapshot(state);
const generateStyle =(type) =>{
    if(type=='filled'){
        return{
            backgroundColor: snap.color,
            color: getContrastingColor(snap.color)
        }
    } 
}
  return (
    <button
    className={`px-2 py-2 flex-1 rounded-full ${customStyles}`}
    style={generateStyle(type)}
    onClick={handleClick}>

        {title}
    </button>
  )
}

export default Button