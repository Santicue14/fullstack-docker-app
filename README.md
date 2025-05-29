# 🚀 Fullstack Docker App

Proyecto fullstack desarrollado con React, Node.js y Docker, utilizando WSL2 como entorno de desarrollo.

## 📋 Descripción

Este proyecto demuestra la implementación de una aplicación fullstack utilizando contenedores Docker, con un frontend en React y un backend en Node.js. La aplicación muestra frases motivacionales aleatorias obtenidas de una API REST.

## 🏗️ Arquitectura

```
fullstack-docker-app/
├── frontend/          # Aplicación React
│   ├── Dockerfile    # Configuración del contenedor frontend
│   └── src/          # Código fuente React
├── backend/          # API REST
│   ├── Dockerfile    # Configuración del contenedor backend
│   ├── data/         # Datos de la aplicación
│   └── app.js        # Archivo principal de la API REST
└── docker-compose.yml # Orquestación de contenedores
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- React + Vite
- CSS Moderno
- Docker

### Backend
- Node.js + Express
- Docker

### Infraestructura
- Docker
- Docker Compose
- WSL2 + Ubuntu

## 🚀 Cómo Levantar el Proyecto

### Prerrequisitos
- Windows 10/11 con WSL2 habilitado
- Docker Desktop instalado
- Git instalado

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd fullstack-docker-app
```

2. Construir y levantar los contenedores:
```bash
docker-compose up --build
```

3. Acceder a la aplicación:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📦 Estructura de Contenedores

### Frontend Container
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 5173
EXPOSE 80
CMD ["npm", "run", "dev"]
```

### Backend Container
```dockerfile
FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  frontend:
    ports: ["80:5173"]
    build: { context: ./frontend }
    volumes: ["./frontend:/app"]
    depends_on: [backend]
    networks: [app-network]
  
  backend:
    ports: ["3000:3000"]
    build: { context: ./backend }
    volumes: ["./backend:/app"]
    networks: [app-network]

networks:
  app-network:
    driver: bridge
```

## 🔄 Desarrollo

El proyecto está configurado con hot-reload tanto para el frontend como para el backend. Los cambios en el código se reflejarán automáticamente en la aplicación.

### Comandos Útiles

```bash
# Ver logs de los contenedores
docker-compose logs -f

# Detener los contenedores
docker-compose down

# Reconstruir un servicio específico
docker-compose up --build frontend

# Ver estado de los contenedores
docker-compose ps
```

## 📚 Características

- Desarrollo en tiempo real con hot-reload
- Aislamiento de servicios con Docker
- Comunicación segura entre contenedores
- Fácil despliegue y mantenimiento
- Interfaz de usuario moderna y responsive
- API REST para frases motivacionales

## 👨‍💻 Autor

- **Santiago Baldini Cuevas**
  - GitHub: [santicue14](https://github.com/santicue14)

## 📝 Información Académica

- **Asignatura**: Sistemas Operativos 2
- **Docente**: Fabián Palacios
- **Universidad**: UNPAZ
- **Año**: 2025

## 📄 Licencia

Este proyecto es parte de un trabajo académico y está sujeto a los términos y condiciones de la Universidad.

---

¡Gracias por visitar el proyecto! 🚀
