import axios from 'axios';

export default axios.create({
    baseURL: 'https://1603-123-24-218-12.ngrok-free.app',   // ngrok is used to expose the API endpoint
    headers: {"ngrok-skip-browser-warning": "true"}   // Needed in order for our client HTTP requests not to be blocked by CORS
});