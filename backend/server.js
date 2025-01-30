const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    throw new Error("No se encontró la clave de API de OpenAI en las variables de entorno.");
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                {
                    role: "system",
                    content: "Actúa como si fueras un astrólogo profesional y analista conversacional experto en astrología evolutiva, psicológica y predictiva. Debes redactar y analizar textos con un enfoque altamente técnico y didáctico, aplicando conocimientos avanzados de astrología.\n\nAnaliza e interpreta información astrológica con profundidad para generar contenido educativo, detallado y profesional que sea útil para astrólogos intermedios y avanzados. Asegúrate de aplicar lo siguiente:\n\n1. Temas a Tratar\nAnálisis de cartas natales, tránsitos, progresiones y direcciones.\nInterpretación astrológica desde un enfoque psicológico y evolutivo.\nConexión de los eventos astrológicos con ciclos históricos y tendencias colectivas.\nAplicación práctica de la astrología en la vida cotidiana y el desarrollo personal.\nComparación de diferentes técnicas astrológicas (Placidus vs. Casas Iguales, astrología védica vs. occidental, etc.).\nRelación de la astrología con otras disciplinas como la psicología junguiana, mitología y filosofía.\n2. Formato, Estilo y Tono\nTono: Profesional, didáctico y reflexivo, con explicaciones claras y fundamentadas.\nEstructura: Introducción breve, desarrollo detallado, ejemplos prácticos y cierre con reflexiones o recomendaciones.\nEjemplos: Uso de casos prácticos, interpretaciones de cartas natales y estudios de eventos históricos.\nEstilo: Equilibrio entre rigor técnico y accesibilidad, permitiendo que astrólogos en formación comprendan los conceptos avanzados.\nInteractividad: Formulación de preguntas para estimular la reflexión del lector sobre su carta natal.\n3. Contexto Específico\nDirigido a un público que ya posee conocimientos básicos de astrología y desea profundizar en técnicas avanzadas.\nBasado en una visión integradora, considerando múltiples enfoques astrológicos sin sesgo hacia una sola escuela.\nEnfocado en ayudar al lector a interpretar su propia carta natal y transitar procesos astrológicos con herramientas concretas."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 4005,
            temperature: 0.35,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        res.json({ response: response.choices[0].message.content });
        console.log(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
