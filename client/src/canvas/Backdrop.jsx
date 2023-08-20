import React, { useRef } from 'react'
import {easing} from 'maath'
import { useFrame } from '@react-three/fiber'

import { AccumulativeShadows,RandomizedLight } from '@react-three/drei'


const Backdrop = () => {
const shadows = useRef();

  return (
   <AccumulativeShadows 
        ref={shadows}
        temporal    //edges transition
        frames={60}
        alphaTest={0.90}    //transparenci of shadows
        scale={10}
        rotation={[Math.PI/2,0,0]}
          position={[0,0,-0.16]}>
    {/*<RandomizedLight amount={4}
            radius={6}
            intensity={0.65}
            ambient={0.30}
            position={[10,5,-10]}>

    </RandomizedLight>

    <RandomizedLight amount={4}
            radius={5}
            intensity={0.25}
            ambient={0.60}
            position={[-5,5,-10]}>

  </RandomizedLight>*/}
    
    <RandomizedLight amount={4}
            radius={9}
            intensity={0.55}
            ambient={0.25}
            position={[5,5,-10]}>

    </RandomizedLight>

    <RandomizedLight amount={4}
            radius={5}
            intensity={0.25}
            ambient={0.55}
            position={[-5,5,-9]}>

    </RandomizedLight>
   </AccumulativeShadows>
  )
}

export default Backdrop