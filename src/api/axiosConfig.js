import axios from 'axios';

export default axios.create({
    baseURL: ' https://c774-14-232-58-92.ngrok-free.app/',   // ngrok is used to expose the API endpoint
    headers: {"ngrok-skip-browser-warning": "true"}   // Needed in order for our client HTTP requests not to be blocked by CORS
});