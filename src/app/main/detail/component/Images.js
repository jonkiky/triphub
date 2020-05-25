import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';
import DOMPurify from 'dompurify'
import Img from '../../../assets/images/not-found-image.jpg'

function PlaceImage(props) {

const	[img,setImg] = useState("")
const [source,setSource] = useState("")

useEffect(() => {
      try {
        axios.get(props.url,{
           headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods' : 'GET',
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json',
        },
        }).then(res => {
        const result = res.data;
        setImg(JSON.parse(Base64.decode(result.content))['img'].slice(0,5))
        setSource(JSON.parse(Base64.decode(result.content))['source'].slice(0,5))
      });
      } catch (error) {
      	console.log("error")
      }
  },[props.url]);
  
let img_html ="";
let source_data="";

if(img!= ""){
  img_html = img.map((pic)=>(<div className="pics" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(pic)}}></div>))
}
if(source!=""){
  source_data = source.map((source)=>{
  return <div className="pic_source" >{source}</div>
})
}

return img == ""||source==""?<img src={Img}/>: <>{img_html}{source_data}</>;
}

export default PlaceImage;
   