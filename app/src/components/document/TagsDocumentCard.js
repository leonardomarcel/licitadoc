import styles from './css/DocumentCard.module.css'
import { Link } from 'react-router-dom'
import { useState } from "react";
import {BsDownload, BsViewList} from 'react-icons/bs'
import FileViewer  from "../layout/DocumentViewer";

function TagsDocumentCard({name, tag_id}) {

   

    
    return (
        <Link to={`/classificacoes/documents/${tag_id}`}>
            <div className={styles.document_card}>
                        {name}
                
                
            </div>
        </Link>
       
    )
}
export default TagsDocumentCard