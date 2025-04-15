import styles from './css/Documents.module.css'
import Container from '../layout/Container'
import { Link } from 'react-router-dom'
import {BsDownload, BsViewList} from 'react-icons/bs'
import Paginator from '../layout/Paginator'
// import DocumentCard from '../document/DocumentCard' 
import { useState, useEffect } from 'react'
function Documents() {
    const[documents, setDocuments] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [userGroups, setUserGroups] = useState([])

    function DowloadDocument(doc){
        fetch(`https://3.95.74.135.nip.io/documents/api/download/${doc.id}`, {
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
    

    const fetchDocuments = (page = 1) => {
        fetch(`https://3.95.74.135.nip.io/documents/api/documents/?page=${page}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            },
            credentials: "include",
        })
        .then((resp) => resp.json())
        .then((data) => {
            setDocuments(data.results)
            setTotalPages(Math.ceil(data.count / 10))  //  10 itens por página
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchDocuments(currentPage)
    }, [currentPage])

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    useEffect(() => {
        fetchDocuments(currentPage)
    
        fetch("https://3.95.74.135.nip.io/auth/api/check-groups/", {
            credentials: "include",
        })
        .then(resp => resp.json())
        .then(data => {
            setUserGroups(data.groups)
        })
        .catch(err => console.log(err))
    }, [currentPage])

    const hasDownloadPermission = userGroups.includes("premium") || userGroups.includes("admin")
    console.log(userGroups)
    console.log(hasDownloadPermission)
    return (
        <div className={styles.document_list_container}>
            <h1>Documentos</h1>
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
                        {hasDownloadPermission ? (
                            <Link onClick={() => DowloadDocument(document)} title='Download'>
                            <BsDownload />
                            </Link>
                        ) : (
                            <BsDownload style={{ opacity: 0.4, cursor: 'not-allowed' }} title="Sem permissão para download" />
                        )}
                        </td>
                    </tr>
                ))}
                {/*removeLoading && */documents.length === 0 && (
                    <p> Não há documentos cadastrados</p>
                )}
            </tbody>
            </table>
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            </div>
            
            
       
    
    )
}
export default Documents