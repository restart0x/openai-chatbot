import axios from 'axios';
import { apiKey } from './api_config.js';
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
async function sendMessageToOpenAI(message) {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        };
        const data = {
            prompt: message,
            max_tokens: 50,
            n: 1,
            stop: null,
            temperature: 0.5
        };
        const response = await axios.post(OPENAI_API_URL, data, config);
        return response.data.choices[0].text.trim();
    } catch (error) {
        if (error.response) {
            console.error(`OpenAI API Error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            console.error(`OpenAI API Error: No response received`);
        } else {
            console.error(`Error: ${error.message}`);
        }
        return "Sorry, we encountered an error processing your request. Please try again later.";
    }
}
export { sendMessageToOpenAI };