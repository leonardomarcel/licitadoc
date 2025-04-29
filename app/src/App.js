import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import  {AuthProvider}  from './components/auth/AuthContext'
import  PrivateRoute  from './components/auth/PrivateRoute'
import NavBar from './components/layout/NavBar'
import Home from './components/pages/Home'
import RedirectToHomeIfLoggedIn from './components/pages/RedirectToHomeIfLoggedIn'
import Container from './components/layout/Container';
import Footer from './components/layout/Footer'
import Documents from './components/pages/Documents'
import PasswordReset from './components/pages/PasswordReset'
import NewAccount from './components/pages/NewAccount'
import TagsDocument from './components/pages/TagsDocument'
import DocumentViewe from './components/layout/DocumentViewer'
import TagsDocumentCard from './components/document/TagsDocumentCard'
import { Worker } from '@react-pdf-viewer/core';

function App() {
  return (
    <AuthProvider>
    <Router>
      <NavBar/>
      <Container customClass="min-height">
        <Routes>

            <Route exact path='/' element={<RedirectToHomeIfLoggedIn/>}/>
            <Route exact path='/password_reset' element={<PasswordReset/>}/>
            <Route exact path='/new_account' element={<NewAccount/>}/>
            <Route element={<PrivateRoute />}>
              <Route exact path='/home' element={<Home/>}/>
              <Route exact path='/documents' element={<Documents/>}/>
              <Route exact path='classificacoes/documents/:tag_id' element={<Documents/>}/>
              <Route exact path='/classificacoes/documentos' element={<TagsDocument/>}/>
              <Route exact path='/documents/:id' element={<DocumentViewe/>}/>
            </Route>
             {/* Redirecionar rotas desconhecidas para "/" */}
          <Route path="*" element={<Navigate to="/" replace />} />
            
        </Routes>
      </Container>
      <Footer/>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"/>
   </Router>
   </AuthProvider>
  )
}

export default App;