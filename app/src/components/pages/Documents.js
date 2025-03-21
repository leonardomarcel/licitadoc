import styles from './css/Documents.module.css'
import Container from '../layout/Container'
import DocumentCard from '../document/DocumentCard' 
import { useState, useEffect } from 'react'
function Documents() {
    const[documents, setDocuments] = useState([])
    

    useEffect(()=>{
        setTimeout(
            () => {
                fetch("http://3.88.34.201:8000/documents/api/documents/", {
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
            {/* {message && <Message type="success" msg={message} />} */}
            {/* {projectMessagem && <Message type="success" msg={projectMessagem} />} */}
            <Container customClass="start">
                {documents.length > 0 &&
                documents.map((document) => 
                    (<DocumentCard
                        doc={document}
                        key={document.id}
                    />
                ))}
                {/* {!removeLoading && <Loading/>} */}
                {/*removeLoading && */documents.length === 0 && (
                    <p> Não há projetos cadastrados</p>
                )}
            </Container>
            
        </div>
    )
}
export default Documents