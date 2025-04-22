// import Message from '../layout/Message'
import {useLocation} from 'react-router-dom'
import Container from '../layout/Container'
// import Loading from '../layout/Loading'
// import LinkButton from '../layout/LinkButton'
import styles from './css/Tags.module.css'
// import ProjectCard from '../project/ProjectCard'
import { useState, useEffect } from 'react'
import TagsDocumentCard from '../document/TagsDocumentCard'
function TagsDocument(){
    const[tags, setTags] = useState([])
    const[removeLoading, setRemoveLoading] = useState(false)
    const[projectMessagem, setProjectMessage] = useState('')
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const location = useLocation()
    let message = ''
    if (location.state){
        message = location.state.message
    }
    
    const fetchTags = (page = 1) => {
        fetch(`https://3.95.74.135.nip.io/documents/api/tags/?page=${page}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            },
            credentials: "include",
        })
        .then((resp) => resp.json())
        .then((data) => {
            setTags(data.results)
            setTotalPages(Math.ceil(data.count / 10))  //  10 itens por página
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchTags(currentPage)
    }, [currentPage])

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }


    
    return(
        <div className={styles.project_container}>
            
            
            <Container customClass="start">
                {tags.length > 0 &&
                tags.map((tag) => 
                    (<TagsDocumentCard
                    
                        name={tag.name}
                        tag_id={tag.id}
                        key={tag.id}
                        
                    />
                ))}
                {tags.length === 0 && (
                    <p> Não há projetos cadastrados</p>
                )}
            </Container>
            
        </div>
    )
}
export default TagsDocument