import React, { useState } from 'react'
import Button from './Button';




const AiPicker = ({prompt,setPrompt,giveImg,handleSubmit}) => {
  
 const[isopen,setisopen]=useState(false);

 const toggle =() => {
  setisopen(!isopen);
} 

  return (

    <div onClick={toggle} className='mt-[-180px] mb-[150px] ' >
          
     {!isopen && (
     
   
    <div className='aipicker-container  ' onClick={toggle}>
    
      <textarea 
      
            rows={6}
            
            placeholder='Ask Ai.....



   Ai is coming soon... '
            value={prompt}
            onChange={(e) =>setPrompt(e.target.value)}
            className="aipicker-textarea placeholder-pink-900 placeholder-opacity-100 ... " >
            
      </textarea>
      
      <div className='flex flex-wrap gap-3'>
        {giveImg?(
          <Button
          type='outline'
          title='Ask Ai...'
          customstyles="text-xs"/>
        ): (
          <>
          <Button
          type='outline'
          title='AI logo'
          handleClick={()=> alert("Ai is coming soon")}  //handleSubmit('logo')
          customstyles="text-xs"/>

<Button
          type='filled'
          title='AI full'
          handleClick={()=> alert("Ai is coming soon")}   //handleSubmit('full')
          customStyles="text-xs"/>
          </>
        )}

      </div>
      
    </div>
    
     )}
     </div>
     
  )
}

export default AiPicker