import {Link} from 'react-router-dom'
import Container from './Container'
import style from './css/NavBar.module.css'
// import logo from '../../img/costs_logo.png'


function NavBar(){
    return(
        <nav className={style.navbar}>
            <Container>
                
                <ul className={style.list}>
                    <li className={style.item}><Link to='/'> Home</Link></li>
                    <li className={style.item}><Link to='/documents'> Documentos</Link></li>
                    
                    

                </ul>
                
                
                
            </Container>
        </nav>
    )
}
export default NavBar