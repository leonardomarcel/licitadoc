
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {useParams} from 'react-router-dom'
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { ZoomInIcon, ZoomOutIcon } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { useState, useEffect } from 'react'


function DocomuntViewer() {
  const[document, setDocument] = useState([])
  const {id} = useParams()
  const zoomPluginInstance = zoomPlugin();
  var fileUrl = `http://127.0.0.1:8000/documents/view/${id}`; 


  return (
   
      <div style={{height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>

        <Viewer 
        fileUrl={fileUrl}
        plugins={[zoomPluginInstance, ZoomInIcon, ZoomOutIcon]}
        />
      </div>
    
    


    
   

  )
}

export default DocomuntViewer
