import styles from './css/DocumentCard.module.css'
import { Link } from 'react-router-dom'
import { useState } from "react";
import {BsDownload, BsViewList} from 'react-icons/bs'
import FileViewer  from "../layout/DocumentViewer";

function TagsDocumentCard({name, tag_id}) {

   

    
    return (
        <div className={styles.document_card}>
           <Link to={`/classificacoes/documents/${tag_id}`}>
                    {name}
            </Link>
            
            
        </div>
       
    )
}
export default TagsDocumentCard