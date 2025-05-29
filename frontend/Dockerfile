FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm i 
EXPOSE 5173
EXPOSE 80
CMD ["npm", "run", "dev"]