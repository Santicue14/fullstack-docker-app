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
      const response = await fetch('http://localhost:3000/getMensaje')
      const data = await response.json()
      setMessage(data.mensaje)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
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
              <h2 className="instructivo-title">Guía de Arquitectura: Fullstack con Docker y WSL2</h2>
              
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
│   ├── Dockerfile    # Configuración del contenedor frontend<br/>
│   └── src/          # Código fuente React<br/>
├── backend/          # API REST<br/>
│   ├── Dockerfile    # Configuración del contenedor backend<br/>
│   └── data/         # Datos de la aplicación<br/>
│   └── app.js        # Archivo principal de la API REST<br/>
└── docker-compose.yml # Orquestación de contenedores<br/>
</pre>
                </li>

                <li>
                  <strong>Frontend Container</strong>
                  <pre className="dockerfile-block">FROM node:20-alpine<br/>
WORKDIR /app<br/>
COPY . .<br/>
RUN npm i<br/>
EXPOSE 5173<br/>
EXPOSE 80<br/>
CMD ["npm", "run", "dev"]<br/>
</pre>
                  <span className="dockerfile-desc">Configura un entorno Node.js optimizado para desarrollo React con hot-reload.</span>
                </li>

                <li>
                  <strong>Backend Container</strong>
                  <pre className="dockerfile-block">FROM node:alpine<br/>
WORKDIR /app<br/>
COPY . .<br/>
RUN npm install<br/>
EXPOSE 3000<br/>
CMD ["node", "app.js"]<br/>
</pre>
                  <span className="dockerfile-desc">Configura un servidor Node.js ligero para la API REST.</span>
                </li>

                <li>
                  <strong>Docker Compose</strong>
                  <pre className="dockerfile-block">version: '3.8'<br/>
services:<br/>
  frontend:<br/>
    ports: ["80:5173"]<br/>
    build: { `context: ./frontend `}<br/>
    volumes: ["./frontend:/app"]<br/>
    depends_on: [backend]<br/>
    networks: [app-network]<br/>
  
  backend:
    ports: ["3000:3000"]<br/>
    build: { `context: ./backend` }<br/>
    volumes: ["./backend:/app"]<br/>
    networks: [app-network]<br/>

networks:<br/>
  app-network:<br/>
    driver: bridge<br/>
</pre>
                  <span className="dockerfile-desc">Orquesta los servicios, configura volúmenes y networking.</span>
                </li>

                <li>
                  <strong>Iniciar el Proyecto</strong>
                  <ul>
                    <li>Navega al directorio: <code>cd /ruta/a/fullstack-docker-app</code><br/></li>
                    <li>Construye y levanta: <code>docker-compose up --build</code></li>
                    <li>Accede a:
                      <ul>
                        <li>Frontend: <code>http://localhost:5173</code></li>
                        <li>Backend: <code>http://localhost:3000</code></li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Características Principales</strong>
                  <ul>
                    <li>Desarrollo en tiempo real con hot-reload</li>
                    <li>Aislamiento de servicios con Docker</li>
                    <li>Comunicación segura entre contenedores</li>
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
