from flask import Flask, request, jsonify
from dotenv import load_dotenv
import openai
import os

load_dotenv()

app = Flask(__name__)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("No se encontró la clave de API de OpenAI en las variables de entorno.")

openai.api_key = OPENAI_API_KEY

@app.route('/api/generate', methods=['POST'])
def generate_text():
    data = request.get_json()
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    try:
        response = openai.chat.completions.create(
            model="gpt-4-turbo",  # Puedes cambiar a otro modelo si lo deseas
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return jsonify({'response': response.choices[0].message.content})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
