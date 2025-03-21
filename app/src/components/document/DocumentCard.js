import styles from './css/DocumentCard.module.css'
import { Link } from 'react-router-dom'
import { useState } from "react";
import {BsDownload, BsViewList} from 'react-icons/bs'
import FileViewer  from "../layout/DocumentViewer";

function DocumentCard({doc}) {

   
      

    function DowloadDocument(doc){
        fetch(`http://3.88.34.201:8000/documents/api/download/${doc.id}`, {
            method: "GET",
            headers: {
               Accept: '*/*'
            },
            responseType: 'blob',
            credentials: "include",
        })
        .then(response => response.blob())
        .then(blob   => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = doc.title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => console.log(error));
    }

    

    
    return (
        <div className={styles.document_card}>
            <h4>{doc.title}</h4>
            <p>
                {doc.description}
            </p>
            
            <div className={styles.document_card_actions}>
                <Link to={`/documents/${doc.id}`}>
                    <BsViewList/> Vizializar
                 </Link>
                 <Link onClick={() => DowloadDocument(doc)}>
                    <BsDownload/> Baixar
                 </Link>
               
            </div>
            
        </div>
       
    )
}
export default DocumentCard