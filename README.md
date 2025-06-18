# 🚀 Fullstack Docker App

Proyecto fullstack desarrollado con React, Node.js y Docker, usando Nginx como proxy reverso. Cada servicio se construye y ejecuta por separado, sin docker-compose.

## 📋 Descripción

Esta app muestra frases motivacionales aleatorias obtenidas de una API REST. El frontend (React) y el backend (Node.js/Express) corren en contenedores separados, y Nginx enruta el tráfico entre ambos.

## 🏗️ Arquitectura

```
fullstack-docker-app/
├── frontend/          # Aplicación React
│   ├── Dockerfile    # Imagen del frontend
│   └── src/          # Código fuente React
├── backend/          # API REST
│   ├── Dockerfile    # Imagen del backend
│   └── data/         # Datos de la app
│   └── app.js        # API REST principal
└── nginx/            # Configuración de Nginx
    ├── Dockerfile    # Imagen de nginx
    └── conf.d/       # Configs
```

## 🛠️ Tecnologías Utilizadas

- React + Vite
- Node.js + Express
- Nginx
- Docker

## 🚀 Cómo Levantar el Proyecto (sin docker-compose)

### 1. Construir las imágenes

Desde la raíz del proyecto:

```bash
# Backend
cd backend
docker build -t fullstack-backend .

# Frontend
cd ../frontend
docker build -t fullstack-frontend .

# Nginx
cd ../nginx
docker build -t fullstack-nginx .
```

### 2. Ejecutar los contenedores

```bash
# Backend
# Expone el puerto 3000
# Asegúrate de que la red bridge esté disponible o crea una personalizada si lo deseas
#Crear una red
docker network create app-network

docker run -d --name backend --network bridge -p 3000:3000 fullstack-backend

# Frontend
# Expone el puerto 5173

docker run -d --name frontend --network bridge -p 5173:5173 fullstack-frontend

# Nginx
# Expone el puerto 80 (puedes mapearlo a otro si lo necesitas)
docker run -d --name nginx --network bridge -p 80:80 fullstack-nginx
```

### 3. Acceder a la aplicación
- Frontend: http://localhost:3000/ (Nginx enruta a React)
- API: http://localhost:3000/api/getMensaje (Nginx enruta al backend)

## 📦 Flujo de Red y Proxy

- Nginx escucha en el puerto 80.
- Las peticiones a `/` van al frontend (React).
- Las peticiones a `/api` van al backend (Node.js).
- El frontend hace fetch a `/api/getMensaje` (no a localhost:3000 directamente).

### Ejemplo de configuración Nginx (`nginx/conf.d/default.conf`):

```nginx
upstream backend {
    server backend:3000;
}

server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://frontend:5173;
    }
    location /api/ {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔄 Desarrollo

- Hot-reload disponible en frontend y backend.
- Los cambios en el código se reflejan automáticamente si usas volúmenes (`-v`).

## 📚 Características

- Desarrollo en tiempo real con hot-reload
- Aislamiento de servicios con Docker
- Comunicación entre servicios vía Nginx
- Fácil despliegue y mantenimiento
- Interfaz moderna y responsive
- API REST para frases motivacionales

## 👨‍💻 Autor

- **Santiago Baldini Cuevas**
  - GitHub: [santicue14](https://github.com/santicue14)
  - Linkedin [Santiago_Cuevas](https://www.linkedin.com/in/santiagocuevas147/)

## 📝 Información Académica

- **Asignatura**: Sistemas Operativos 2
- **Docente**: Fabián Palacios
- **Universidad**: UNPAZ
- **Año**: 2025

---

¡Gracias por visitar el proyecto! 🚀
