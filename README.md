# Interfaz Web para APIs de LLMs (Gemini y OpenAI)

Este proyecto proporciona una interfaz web sencilla para interactuar con las APIs de modelos de lenguaje grandes (LLMs) de Google Gemini y OpenAI. Permite a los usuarios enviar prompts y recibir respuestas a través de una interfaz de usuario simple, construida con tecnologías web estándar.

## Características

*   **Soporte para Gemini y OpenAI:** Permite seleccionar entre dos APIs de LLMs para generar texto.
*   **Interfaz de usuario simple:** Interfaz web intuitiva para enviar prompts y visualizar respuestas.
*   **Backend con Flask:** Servidor backend construido con Python y Flask, que maneja la comunicación con las APIs de LLMs.
*   **Variables de entorno:** Las claves de API se gestionan de forma segura mediante variables de entorno.
*   **Dockerizado:** La aplicación se ejecuta en contenedores Docker para facilitar el despliegue y la gestión de entornos.

## Estructura del Proyecto
Use code with caution.
Markdown
gemini-openai-web-app/ 
├── backend/
│ ├── app.py # Código del servidor Flask
│ ├── requirements.txt # Lista de dependencias de Python
│ └── .env # Archivo para variables de entorno
├── frontend/
│ ├── index.html # Estructura de la interfaz web
│ ├── styles.css # Estilos CSS
│ └── script.js # Lógica de la interfaz web (JavaScript)
├── Dockerfile # Definición de la imagen Docker para el backend
├── Dockerfile.frontend # Definición de la imagen Docker para el frontend
└── docker-compose.yml # Configuración de Docker Compose

## Requisitos

*   **Claves de API:** Necesitas obtener claves de API de Google Gemini y/o OpenAI, según qué modelo quieras usar.
*   **Docker:** Debes tener Docker y Docker Compose instalados en tu sistema.

## Configuración

1.  **Claves de API:**
    *   Crea un archivo `.env` dentro del directorio `backend/`.
    *   Agrega tus claves de API de la siguiente manera:
        *   Para Gemini:
            ```
            GOOGLE_API_KEY=Tu_Clave_API_De_Google_Aquí
            ```
        *   Para OpenAI:
            ```
            OPENAI_API_KEY=Tu_Clave_API_De_OpenAI_Aquí
            ```
    *   **¡Importante!** No incluyas tus claves de API directamente en el código fuente.
2.  **Instala Docker:** Asegúrate de tener Docker y Docker Compose instalados en tu sistema. Puedes seguir las instrucciones de instalación en la documentación oficial de Docker.

## Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone [URL del repositorio]
    cd [nombre del repositorio]
    ```
2.  **Construye y ejecuta la aplicación:**
    ```bash
    sudo docker-compose up --build
    ```
    Esto construirá las imágenes Docker y ejecutará los contenedores. El frontend estará disponible en `http://localhost:3000`.

## Uso

1.  **Abre la interfaz web:** Accede a `http://localhost:3000` en tu navegador web.
2.  **Ingresa un prompt:** Escribe tu prompt en el área de texto proporcionada.
3.  **Haz clic en "Generate":** Presiona el botón para enviar el prompt al backend y obtener una respuesta del modelo de lenguaje.
4.  **Visualiza la respuesta:** La respuesta generada aparecerá en el área de respuesta.

## Detalles Técnicos

### Backend (Python/Flask)

*   Utiliza Flask para crear un servidor que recibe las peticiones del frontend y se comunica con las APIs de Gemini u OpenAI.
*   Las variables de entorno se cargan utilizando la librería `python-dotenv`.
*   Las librerías `google-generativeai` y `openai` se utilizan para comunicarse con las APIs de LLM correspondientes.

### Frontend (HTML/CSS/JavaScript)

*   Interfaz web básica construida con HTML, CSS y JavaScript.
*   Utiliza JavaScript para realizar peticiones asíncronas al backend y actualizar la interfaz con la respuesta del modelo.
*   Tiene una estructura básica que se repite en ambas interfaces (Gemini y OpenAi), permitiendo reutilizar las plantillas html, css y javascript.

### Docker

*   La aplicación se ejecuta en contenedores Docker para un despliegue más sencillo.
*   Docker Compose se utiliza para orquestar la construcción y ejecución de los contenedores.
*   El `Dockerfile` del backend se basa en una imagen base de Python, y el `Dockerfile.frontend` se basa en una imagen base de Nginx.

## Posibles Problemas y Soluciones

*   **Problemas de resolución DNS durante la construcción de la imagen Docker:** Si tienes problemas de conectividad con Docker, intenta agregar los servidores DNS de Google (8.8.8.8, 8.8.4.4) al archivo `/etc/docker/daemon.json`. Luego, reinicia el servicio de Docker.
*   **Problemas al usar diferentes modelos de OpenAI o Gemini:** Revisa la documentacion de las apis para conocer como usar los modelos adecuados.
*   **Problemas al ejecutar docker:** Si tienes problemas ejecutando docker, comprueba que el servicio esta activo, que los puertos no esten usados, que tienes los permisos adecuados, etc.

## Contribución

Las contribuciones al proyecto son bienvenidas. Si encuentras errores o tienes alguna mejora que proponer, no dudes en abrir un issue o enviar un pull request.

## Licencia

Este proyecto se encuentra bajo la licencia MIT.