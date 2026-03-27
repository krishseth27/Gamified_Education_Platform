import { useEffect } from "react";

export default function Toast({ msg, onDone }) {
useEffect(()=>{
const t = setTimeout(onDone,2000);
return ()=>clearTimeout(t);
},[]);

return (
<div style={{
position:"absolute",
top:"50%",
left:"50%",
transform:"translate(-50%,-50%)",
background:"#001a00",
color:"#4ade80",
padding:20,
border:"2px solid #4ade80",
zIndex:90
}}>
{msg} </div>
);
}
