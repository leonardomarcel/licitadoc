
import { Viewer} from '@react-pdf-viewer/core';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {useParams} from 'react-router-dom'
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { useState, useEffect } from 'react'



function DocomuntViewer() {
    const [pdfUrl, setPdfUrl] = useState(null);
    const { id } = useParams();

    const getFilePluginInstance = getFilePlugin();

    
    
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `https://3.95.74.135.nip.io/documents/api/download/${id}`;
        link.setAttribute('download', 'documento.pdf'); // Nome opcional do arquivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
  useEffect(() => {
      const fetchPdf = async () => {
          try {
              const response = await fetch(`https://3.95.74.135.nip.io/documents/api/view/${id}`, {
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
    
    <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
    {/* Header fixo com botão */}
    <div style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        padding: "1rem 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 1000,
    }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
            <button
                onClick={handleDownload}
                style={{
                    padding: '0.5rem 1.2rem',
                    backgroundColor: '#4f46e5',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    transition: 'background 0.3s',
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#4338ca'}
                onMouseOut={e => e.target.style.backgroundColor = '#4f46e5'}
            >
                Baixar
            </button>
        </div>
    </div>

    {/* Viewer com rolagem abaixo do botão */}
    <div style={{
        flex: 1,
        marginTop: "100px",
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 100px)",
        minHeight: "0",
        padding: "1rem"
    }}>
        {pdfUrl ? (
            <Viewer fileUrl={pdfUrl} />
        ) : (
            <p>Carregando PDF...</p>
        )}
    </div>
</div>

  );
}

export default DocomuntViewer
