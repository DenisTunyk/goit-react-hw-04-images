import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '31824211-7ef4149e7674ea42a18560458';

export const fetchPicture = async () => {
    const response = await axios.get('', {
        params: {
            key: API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            page: '1',
            per_page: '12',
        }
    })
    return response.data;
}

export const fetchPictureQuery = async (query, page) => {
    const response = await axios.get('', {
        params: {
            q: query,
            key: API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            page: page,
            per_page: '12',
        }
    })
    return response.data;
}