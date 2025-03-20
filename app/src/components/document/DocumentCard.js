import styles from './css/DocumentCard.module.css'
import { Link } from 'react-router-dom'
import { useState } from "react";
import {BsDownload, BsViewList} from 'react-icons/bs'
import FileViewer  from "../layout/DocumentViewer";

function DocumentCard({doc}) {

    const [fileUrl, setFileUrl] = useState(null);
    // const [selectedDoc, setSelectedDoc] = useState(null);
    // const [loading, setLoading] = useState(false);
      
    // async function ViewDocument({doc}) {
    //     setLoading(true);
    //     try {
    //     // Simulação de uma requisição à API
    //     const response = await fetch(`http://127.0.0.1:8000/documents/download/${doc.id}`);
    //     if (!response.ok) {
    //         throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    //     }

    //     const blob = await response.blob();
    //     setSelectedDoc(blob);
    //     setLoading(false);
    //     } catch (error) {
    //     console.error(error);
    //     setLoading(false);
    //     }
    // }
      

    function DowloadDocument({doc}){
        fetch(`http://127.0.0.1:8000/documents/api/download/${doc.id}`, {
            method: "GET",
            headers: {
               Accept: '*/*'
            },
            responseType: 'blob'
        })
        .then(response => response.blob())
        .then(blob   => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = document.title;
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
                <Link to={`/document/${doc.id}`}>
                    <BsViewList/> Vizializar
                 </Link>
                 <Link onClick={() => DowloadDocument({doc})}>
                    <BsDownload/> Baixar
                 </Link>
               
            </div>
            {fileUrl && <FileViewer pdfUrl={fileUrl} />}
        </div>
       
    )
}
export default DocumentCard