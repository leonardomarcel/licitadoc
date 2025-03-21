
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {useParams} from 'react-router-dom'
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { ZoomInIcon, ZoomOutIcon } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { useState, useEffect } from 'react'


function DocomuntViewer() {
    const [pdfUrl, setPdfUrl] = useState(null);
    const { id } = useParams();
    const zoomPluginInstance = zoomPlugin();
  // var fileUrl = `http://localhost:8000/documents/api/view/${id}`; 
  useEffect(() => {
    const fetchPdf = async () => {
        try {
            const response = await fetch(`http://3.88.34.201:8000/documents/api/view/${id}`, {
                method: "GET",
                credentials: "include", // Enviar cookies de sessão
                headers: {
                    Accept: '*/*'
                },
            });

            if (!response.ok) throw new Error("Erro ao carregar o PDF");

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error(error);
        }
    };

    fetchPdf();
    return () => {
        if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl); // Limpa a URL para evitar vazamento de memória
        }
    };
}, [id]);

return (
  <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {pdfUrl ? (
          <Viewer fileUrl={pdfUrl} plugins={[zoomPluginInstance]} />
      ) : (
          <p>Carregando PDF...</p>
      )}
  </div>
);
}

export default DocomuntViewer
