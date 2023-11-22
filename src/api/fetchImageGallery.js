import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39895100-b1bc415b383dfc0e1a37c2dc7';
export const PER_PAGE = 12;

export const fetchImageGallery = async (query, page) => {
  const responce = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=${PER_PAGE}&image_type=photo&orientation=horizontal`
  );

  return responce.data;
};
