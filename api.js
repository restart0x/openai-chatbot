import axios from 'axios';
import { apiKey } from './api_config.js';

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';

async function sendMessageToOpenAI(message) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    };

    const body = {
        prompt: message,
        max_tokens: 50,
        n: 1,
        temperature: 0.5
    };

    try {
        const { data } = await axios.post(OPENAI_API_URL, body, config);
        return data.choices[0].text.trim();
    } catch (error) {
        console.error(`OpenAI API Error: ${error.response ? error.response.status + ' - ' + error.response.data : error.message}`);
        return "Sorry, we encountered an error processing your request. Please try again later.";
    }
}

export { sendMessageToOpenAI };