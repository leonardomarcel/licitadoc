import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Home from './components/pages/Home'
import Container from './components/layout/Container';
import Footer from './components/layout/Footer'
import Documents from './components/pages/Documents'
import DocumentViewe from './components/layout/DocumentViewer'
import { Worker } from '@react-pdf-viewer/core';

function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass="min-height">
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/documents' element={<Documents/>}/>
            <Route exact path='/document/:id' element={<DocumentViewe/>}/>
            
        </Routes>
      </Container>
      <Footer/>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"/>
   </Router>
  )
}

export default App;