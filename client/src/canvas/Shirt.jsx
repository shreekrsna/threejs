
import {easing} from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal,useGLTF,useTexture } from '@react-three/drei';
import state from '../store';


const Shirt = () => {
    const snap= useSnapshot(state);
    const {nodes,materials} = useGLTF('/shirt_baked.glb')

    const logoTeaxture =useTexture(snap.logoDecal);
    const fullTeaxture =useTexture(snap.fullDecal);

    const stateUpdate= JSON.stringify(snap);

    //coloring smoothly on shirt(not to look dramatic)
    useFrame((state,delta) => {
      easing.dampC(materials.lambert1.color,snap.color,0.25,delta)
})

  return (
   
    
        <group
        key={stateUpdate}>
                <mesh castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}>


            {/* logo on shirt */}

            {snap.isFullTexture && (
              <Decal
              position={[0,0,0]}
              rotation={[0,0,0]}
              scale={1}
              map={fullTeaxture}
              />

            )}

        {snap.isLogoTexture && (
              <Decal
              position={[0,0.04,0.15]}
              rotation={[0,0,0]}
              scale={0.15}
              map={logoTeaxture}
              depthTest={false}
              depthWrite={true}
              />
              
            )}
                </mesh>
        </group>
      
  
        
  )
}

export default Shirt;