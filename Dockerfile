# Utiliza una imagen base de Node.js
FROM node:20

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json e instala las dependencias
COPY backend/package*.json ./
RUN npm install

# Copia el resto de los archivos del backend
COPY backend/ .

# Expone el puerto en el que correrá la app de Express
EXPOSE 5000

# Comando para ejecutar la app
CMD ["node", "server.js"]