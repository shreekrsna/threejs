import { proxy } from "valtio";

const state =proxy({
      intro:true,
      color:'#6495ED',
      isLogoTexture:true,
      isFullTexture:false,
      logoDecal:'./threejs.png',
      fullDecal:'./pp.png',
})
export default state;