import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39895100-b1bc415b383dfc0e1a37c2dc7';

export const fetchImageGallery = async (query, page, perPage) => {
  const responce = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`
  );

  return responce.data;
};
