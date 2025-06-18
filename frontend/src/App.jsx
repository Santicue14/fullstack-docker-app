import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentView, setCurrentView] = useState('frases')

  async function getDataFromApi() {
    try {
      setMessage(null)
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/getMensaje')
      const data = await response.json()
      setMessage(data.mensaje)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error al obtener el mensaje')
      setLoading(false)
    }
  }

  function clearMessage() {
    setMessage(null)
  }

  return (
    <>
      <div>
        <h1 className='title'>Proyecto de React con Api Rest</h1>
        <p className='subtitle'>Contenedores en Docker</p>
        <div className="card">
          <div className='nav-container'>
            <div className='nav-content'>
              <button 
                className={`nav-button ${currentView === 'frases' ? 'active' : ''}`} 
                onClick={() => setCurrentView('frases')}
              >
                Frases Motivacionales
              </button>
              <button 
                className={`nav-button ${currentView === 'instructivo' ? 'active' : ''}`} 
                onClick={() => setCurrentView('instructivo')}
              >
                ¿Cómo funciona?
              </button>
              <button 
                className={`nav-button ${currentView === 'info' ? 'active' : ''}`} 
                onClick={() => setCurrentView('info')}
              >
                Información
              </button>
            </div>
          </div>

          {currentView === 'frases' && (
            <div className="content-section">
              <p className='text'>Hacé click en el botón para obtener una frase motivacional desde el contenedor de la api rest</p>
              <div className="actions">
                <button className="action-button" onClick={getDataFromApi}>Obtener frase</button>
                <button className="action-secondary-button" onClick={clearMessage} disabled={!message}>Limpiar</button>
              </div>
              {loading && <p className='loading'>Cargando...</p>}
              {message && <p className='message'>{message}</p>}
            </div>
          )}

          {currentView === 'instructivo' && (
            <div className="content-section instructivo-section">
              <h2 className="instructivo-title">Guía de Arquitectura: Fullstack con Docker y Nginx</h2>
              <ol className="instructivo-list">
                <li>
                  <strong>Entorno de Desarrollo</strong>
                  <p>WSL2 (Windows Subsystem for Linux) con Ubuntu proporciona un entorno Linux completo dentro de Windows, optimizado para Docker y desarrollo web moderno.</p>
                </li>
                <li>
                  <strong>Estructura del Proyecto</strong>
                  <pre className="estructura">
fullstack-docker-app/ <br/>
├── frontend/          # Aplicación React<br/>
│   ├── Dockerfile    # Imagen del frontend<br/>
│   └── src/          # Código fuente React<br/>
├── backend/          # API REST<br/>
│   ├── Dockerfile    # Imagen del backend<br/>
│   └── data/         # Datos de la aplicación<br/>
│   └── app.js        # API REST principal<br/>
└── nginx/            # Configuración de Nginx<br/>
    ├── Dockerfile    # Imagen de nginx<br/>
    └── conf.d/       # Configs<br/>
</pre>
                </li>
                <li>
                  <strong>Flujo de Red y Proxy</strong>
                  <pre className="estructura">
Nginx escucha en el puerto 80.<br/>
Las peticiones a <b>/</b> van al frontend (React).<br/>
Las peticiones a <b>/api</b> van al backend (Node.js).<br/>
El frontend hace fetch a <b>/api/getMensaje</b> (no a localhost:3000 directamente).<br/>
</pre>
                </li>
                <li>
                  <strong>Cómo levantar la app</strong>
                  <ul>
                    <li>Construí cada imagen por separado:<br/>
                      <code>cd backend && docker build -t fullstack-backend .</code><br/>
                      <code>cd ../frontend && docker build -t fullstack-frontend .</code><br/>
                      <code>cd ../nginx && docker build -t fullstack-nginx .</code>
                    </li>
                    <li>Levantá los contenedores:<br/>
                      <code>docker run -d --name backend --network bridge -p 3000:3000 fullstack-backend</code><br/>
                      <code>docker run -d --name frontend --network bridge -p 5173:5173 fullstack-frontend</code><br/>
                      <code>docker run -d --name nginx --network bridge -p 80:80 fullstack-nginx</code>
                    </li>
                    <li>Accedé a la app en <code>http://localhost</code> (Nginx enruta todo).</li>
                  </ul>
                </li>
                <li>
                  <strong>Características Principales</strong>
                  <ul>
                    <li>Desarrollo en tiempo real con hot-reload</li>
                    <li>Aislamiento de servicios con Docker</li>
                    <li>Comunicación entre servicios vía Nginx</li>
                    <li>Fácil despliegue y mantenimiento</li>
                  </ul>
                </li>
              </ol>
              <div className="footer-note">
                <b>🚀 ¡Listo para desarrollar! Este setup te permite trabajar en un entorno moderno y profesional.</b>
              </div>
            </div>
          )}

          {currentView === 'info' && (
            <div className="content-section info-section">
              <h2 className="info-title">Información del Proyecto</h2>
              <div className="info-content">
                <div className="info-card">
                  <h3>👨‍💻 Desarrollador</h3>
                  <p>
                    <a href="https://github.com/santicue14" className='link' target="_blank" rel="noopener noreferrer">
                      Santiago Baldini Cuevas
                    </a>
                  </p>
                </div>
                
                <div className="info-card">
                  <h3>📚 Asignatura</h3>
                  <p>Sistemas Operativos 2</p>
                  <p>Docente: Fabián Palacios</p>
                  <p>Universidad: UNPAZ</p>
                  <p>Año: 2025</p>
                </div>

                <div className="info-card">
                  <h3>🛠️ Tecnologías</h3>
                  <ul>
                    <li>React + Vite</li>
                    <li>Node.js + Express</li>
                    <li>Docker</li>
                    <li>WSL2 + Ubuntu</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
