import {Canvas} from '@react-three/fiber';
import { Center} from '@react-three/drei';
import Shirt from './Shirt';
import Backdrop from './Backdrop';
import Camera from './Camera';
import { useSnapshot } from 'valtio';
import state from '../store';


const CanvasModel = () => {
  const snap = useSnapshot(state);
  return (
    
   
   <Canvas
   shadows camera={{ position:[0,0,0], fov:25}}
   gl={{preserveDrawingBuffer:true}} className='w-full h-full max-w-full transition-all ease-in'>

            <ambientLight intensity={0.5}/>
           {/* <Environment preset='city'/>*/}
           <Camera>
              <Backdrop/>
                <Center>
             
                  <Shirt/>
                 
                </Center>
              
           </Camera>
   </Canvas>
    
  )
}

export default CanvasModel