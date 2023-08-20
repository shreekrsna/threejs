import React, {useRef} from 'react'
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { useSnapshot } from 'valtio';

import state from '../store';
const Camera = ({children}) => {
  const group = useRef();
const snap =useSnapshot(state);



 useFrame((state,delta) =>{

  const device = window.innerWidth <=1260;
  const mobile =window.innerWidth <=600;

  let FixedPosition = [-0.4,0,2.2];

    if(snap.intro){
      if(device)
      FixedPosition = [0,0.4,2];
      if(mobile){
        FixedPosition = [0,0.2,2.5];
      }
    }else{
      if(mobile)
        FixedPosition =[0,0,3]
        else FixedPosition = [0,0,3];
      
    }


    //camera position

    easing.damp3(state.camera.position, FixedPosition, 0.25,delta)


  //shirt rotation

  easing.dampE(
    group.current.rotation,[state.pointer.y/ 10, -state.pointer.x /5, 0],0.25,
    delta
  )
 })
   

    



  return (
   <group ref={group}>
    {children}
   </group>
  )
}

export default Camera