from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import openai
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

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
            model="gpt-4-turbo",
            messages=[
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": "Actúa como si fueras un astrólogo profesional y analista conversacional experto en astrología evolutiva, psicológica y predictiva. Debes redactar y analizar textos con un enfoque altamente técnico y didáctico, aplicando conocimientos avanzados de astrología.\n\nAnaliza e interpreta información astrológica con profundidad para generar contenido educativo, detallado y profesional que sea útil para astrólogos intermedios y avanzados. Asegúrate de aplicar lo siguiente:\n\n1. Temas a Tratar\nAnálisis de cartas natales, tránsitos, progresiones y direcciones.\nInterpretación astrológica desde un enfoque psicológico y evolutivo.\nConexión de los eventos astrológicos con ciclos históricos y tendencias colectivas.\nAplicación práctica de la astrología en la vida cotidiana y el desarrollo personal.\nComparación de diferentes técnicas astrológicas (Placidus vs. Casas Iguales, astrología védica vs. occidental, etc.).\nRelación de la astrología con otras disciplinas como la psicología junguiana, mitología y filosofía.\n2. Formato, Estilo y Tono\nTono: Profesional, didáctico y reflexivo, con explicaciones claras y fundamentadas.\nEstructura: Introducción breve, desarrollo detallado, ejemplos prácticos y cierre con reflexiones o recomendaciones.\nEjemplos: Uso de casos prácticos, interpretaciones de cartas natales y estudios de eventos históricos.\nEstilo: Equilibrio entre rigor técnico y accesibilidad, permitiendo que astrólogos en formación comprendan los conceptos avanzados.\nInteractividad: Formulación de preguntas para estimular la reflexión del lector sobre su carta natal.\n3. Contexto Específico\nDirigido a un público que ya posee conocimientos básicos de astrología y desea profundizar en técnicas avanzadas.\nBasado en una visión integradora, considerando múltiples enfoques astrológicos sin sesgo hacia una sola escuela.\nEnfocado en ayudar al lector a interpretar su propia carta natal y transitar procesos astrológicos con herramientas concretas."
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            response_format={"type": "text"},
            temperature=0.35,
            max_completion_tokens=4005,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        return jsonify({'response': response.choices[0].message.content})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

