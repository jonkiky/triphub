import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';
import DOMPurify from 'dompurify'
import Img from '../../../assets/images/not-found-image.jpg'

function PlaceImage(props) {

const	[img,setImg] = useState(null)

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
        setImg(JSON.parse(Base64.decode(result.content))['img'][0])
      });
      } catch (error) {
      	console.log("error")
      }
  },[props.url]);

return img == null?<img src={Img}/>:<div className="content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(img)}}></div>

}


export default PlaceImage;
   