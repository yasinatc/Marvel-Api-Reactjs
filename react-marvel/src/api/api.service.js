const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://gateway.marvel.com/v1/public/';

const ApiService = () => {
    const getData = (url, queryParams) => {
        return fetch(`${BASE_URL}/${url}?${queryParams}&apikey=${API_KEY}`, { method: 'GET' });
    }

    return ({ getData });
}

export default ApiService;
