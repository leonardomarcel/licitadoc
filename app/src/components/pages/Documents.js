import styles from './css/Documents.module.css'
import Container from '../layout/Container'
import { Link } from 'react-router-dom'
import {BsDownload, BsViewList} from 'react-icons/bs'
// import DocumentCard from '../document/DocumentCard' 
import { useState, useEffect } from 'react'
function Documents() {
    const[documents, setDocuments] = useState([])

    function DowloadDocument(doc){
        fetch(`https://3.86.227.12.nip.io/documents/api/download/${doc.id}`, {
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
    

    useEffect(()=>{
        setTimeout(
            () => {
                fetch("https://52.23.176.133.nip.io/documents/api/documents/", {
                    method: "GET",
                    headers: {
                        'content-type': 'application/json'
                    },
                    credentials: "include",  // Permite enviar os cookies de autenticação
                })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setDocuments(data)
                    // setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
            }, 300)

    }, [])

    return (
        <div className={styles.documents_container}>
            <div className={styles.title_container}>
                <h1>Meus Documentos</h1>
                
            </div>
           <Container customClass="start">
           <div className={styles.document_list_container}>
           <table className={styles.document_table}>
            <thead>
                <tr>
                    <th>Título do Documento</th>
                    <th>Data de Publicação</th>
                    <th>Visualizar</th>
                    <th>Download</th>
                </tr>
            </thead>
            <tbody>
                
                {documents.length > 0 &&
                documents.map((document) => (
                    <tr key={document.id}>
                        <td>{document.title}</td>
                        <td>{document.date}</td>
                        <td>
                            <Link to={`/documents/${document.id}`} title='Visualizar'>
                                <BsViewList/> 
                            </Link>
                            
                        </td>
                        <td>
                            <Link onClick={() => DowloadDocument(document)} title='Download'>
                                    <BsDownload/> 
                            </Link>  
                        </td>
                    </tr>
                ))}
                {/*removeLoading && */documents.length === 0 && (
                    <p> Não há documentos cadastrados</p>
                )}
            </tbody>
            </table>
            </div>
            </Container>
            
            
        </div>
    )
}
export default Documents