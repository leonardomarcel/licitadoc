import {Link} from 'react-router-dom'
import Container from './Container'
import { useAuth } from '../auth/AuthContext'
import style from './css/NavBar.module.css'
// import logo from '../../img/costs_logo.png'


function NavBar(){
    const { user } = useAuth(); // Obtém o usuário do contexto
    const { logout } = useAuth()
    return(
        <nav className={style.navbar}>
            <Container>
                
                <ul className={style.list}>
                    {user && (
                        <>
                            <li className={style.item}><Link to='/home'> Home</Link></li>
                            <li className={style.item}><Link to='/documents'> Documentos</Link></li>
                            <li className={style.item} onClick={logout}><Link> Logout</Link></li>
                        </>
                    )}
                </ul>
                
                
                
            </Container>
        </nav>
    )
}
export default NavBar