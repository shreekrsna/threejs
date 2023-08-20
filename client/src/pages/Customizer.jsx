import React, {useState,useEffect} from 'react'
import {AnimatePresence,motion} from 'framer-motion';
import {useSnapshot} from 'valtio';

import config from '../config/config';
import state from '../store';
import {download, fileIcon, logoShirt, stylishShirt, swatch} from '../assets';
import {downloadCanvasToImage,reader} from '../config/helpers';
import {EditorTabs,FilterTabs,DecalTypes} from '../config/constants';

import {fadeAnimation,slideAnimation } from '../config/motion';
import {AiPicker,FilePicker,Tab,Button} from '../components';
import { SketchPicker } from 'react-color';
import { color } from 'framer-motion';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file,setFile] = useState('');
  const [prompt,setPrompt] =useState('');
  const [giveImg,setGiveImg] = useState(false);
  const [activeEditorTab , setActiveEditorTab] = useState('');
  const [activeFilterTab , setActiveFilterTab] = useState({logoShirt:true,stylishShirt: false});
 

  //colorpicker
 const DesignTab = () => {
  const [isopen,setisopen] = useState(false);
     
  const toggle =() => {
          setisopen(!isopen);
        } 
    const snap =useSnapshot(state);
 

    return (
      <div onClick={toggle} >
          
     {!isopen && (
     

     
        <SketchPicker
         
        color={snap.color} 
        disableAlpha
        presetColors={['#ccc',
                '#EFBD4E', '#C19277',
              '#7098DA','#ff8a65','#FF96AD']}  //your colors
        onChange={(color) => state.color = color.hex}
        className='ml-[270px] mt-[-300px]'
        
        /> 
        
        )}
        </div>

        
         
         
      )}
  
  
  // editor tab content
    const tabContent = () =>{
      switch (activeEditorTab) {
        case "colorpicker":
           return   <DesignTab/>
                  
                  
         
        case "aipicker":
           return <AiPicker
           prompt={prompt}
           setPrompt={setPrompt}
           giveImg={giveImg}
           handleSubmit={handleSubmit}/>
         
        case "filepicker":
          return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}/>
        
        default:return null;
        
      }
    } 

   
  
    const handleSubmit = async (type) =>
    {
         if(!prompt)
         return alert("please give a promt");

         try {
          //call backend to generate
            setGiveImg(true);

            const response=await fetch('http://localhost:8080/api/v1/dalle',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                prompt,
              })
            })

            const data=await response.json();
              //logo or texture
            handleDecals(type,`data:image/png;base64,${data.photo}`)

         } catch (error) {
          alert(error);
         }finally{
          setGiveImg(false);
          setActiveEditorTab("");
         }
    }


   
    const handleDecals =(type,result) =>{

      const decalType =DecalTypes[type];

      state[decalType.stateProperty]= result;

      if(!activeFilterTab[decalType.filterTab]){
        handleActiveFilterTab(decalType.filterTab)
      }
    }

    const handleActiveFilterTab=(tabName)=>{
      switch (tabName) {
        case "logoShirt":
             state.isLogoTexture= !activeFilterTab[tabName];
          
          break;
      case "stylishShirt":
            state.isFullTexture=!activeFilterTab[tabName];
            break;

        default:
          state.isLogoTexture=true;
          state.isFullTexture=false;
          break;
      }
//after the activefilter tab updated then toggle 
      setActiveFilterTab((prevState)=>{
        return{
          ...prevState,
          [tabName]:!prevState[tabName]
        }
      })

    }

    /*
    const reader = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
      });
    };
  
    const readFile = (type) => {
      if (file) {
        reader(file)
          .then((result) => {
            handleDecals(type, result);
            setActiveEditorTab("");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.error("No file selected.");
      }
    };
*/
  

      const readFile=(type)=>{
                reader(file)
                .then((result) =>{
                  handleDecals(type,result);
                  setActiveEditorTab("")
                })
      }

  return (
   <AnimatePresence>
      {!snap.intro && (
        <>
       <motion.div
       key="custom"
       className='absolute top-0 left-3 z-10'
       {...slideAnimation('left')}>
        <div className='flex items-center min-h-screen'>
          <div className='editortabs-container tabs '>
                  {EditorTabs.map((tab) => (
                    <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() =>{setActiveEditorTab(tab.name)}}></Tab>
                  ))}

                  {tabContent()}
                

          </div>

        </div>
         
       </motion.div>
                    <motion.div className='absolute z-10 top-6 right-8'
                    {...fadeAnimation}>
                       <Button
                       type='filled'
                       title= 'Go back'
                       handleClick={() => state.intro=true}
                       customStyles="w-fit px-3 py-2.5 font-bold text-sm"/> 
                    </motion.div>


                   

                <motion.div className='filtertabs-container tabs'
                {...slideAnimation('up')}>
                   {FilterTabs.map((tab) => (
                    <Tab
                    key={tab.name}
                    tab={tab}
                     isFilterTab
                     isActiveTab={activeFilterTab[tab.name]}
                    handleClick={() =>handleActiveFilterTab(tab.name)}></Tab>
                  ))}

                   {/*dowload button*/}
    <button className='download-btn ' onClick={downloadCanvasToImage}>
      <img src={download}
      alt='download image'
      className='w-3/5 h-3/5 object-contain'/>
    </button>

                  </motion.div>    

                
        </>
      )}

   </AnimatePresence>
  )
}

export default Customizer