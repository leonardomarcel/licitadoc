import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import  {AuthProvider}  from './components/auth/AuthContext'
import  PrivateRoute  from './components/auth/PrivateRoute'
import NavBar from './components/layout/NavBar'
import Home from './components/pages/Home'
import LoginPage from './components/pages/LoginPage'
import Container from './components/layout/Container';
import Footer from './components/layout/Footer'
import Documents from './components/pages/Documents'
import DocumentViewe from './components/layout/DocumentViewer'
import { Worker } from '@react-pdf-viewer/core';
import Logout from './components/auth/Logout'

function App() {
  return (
    <AuthProvider>
    <Router>
      <NavBar/>
      <Container customClass="min-height">
        <Routes>

            <Route exact path='/' element={<LoginPage/>}/>
            <Route element={<PrivateRoute />}>
              <Route exact path='/home' element={<Home/>}/>
              <Route exact path='/documents' element={<Documents/>}/>
              <Route exact path='/document/:id' element={<DocumentViewe/>}/>
              <Route exact path='/logout' element={<Logout/>}/>
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