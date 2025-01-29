# Utiliza una imagen base de Python
FROM python:3.9-slim

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de requisitos e instala las dependencias
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Copia el resto de los archivos del backend
COPY backend/app.py .
COPY backend/.env .

# Expone el puerto en el que correrá la app de Flask
EXPOSE 5000

# Comando para ejecutar la app
CMD ["python", "app.py"]
