import styles from './css/Home.module.css'
// import savings from '../../img/savings.svg'
// import LinkButton from '../layout/LinkButton'
function Home(){
    return (
        <section className={styles.home_container}>
            <h1> Bem-vindo ao <span>Licita.doc</span></h1>
            <p>Comece a usar os nosso templates de documentos. </p>
            
        </section>
    )
}
export default Home