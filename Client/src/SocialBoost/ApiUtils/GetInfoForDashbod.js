import baseUrl from '../Common Components/baseUrl.js';
// apiUtils.js

const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data.message;
      } else {
        alert('failed to fetch data')
        return false
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert("An error occurred while fetching data Please try again");
    }
  };
  
  export const getYoutubeData = async () => {
    const url = `${baseUrl()}/getChannelInfo`;
    return fetchData(url);
  };
  
  // Similar utility functions for TikTok and Instagram
  export const getTikTokData = async () => {
    const url = `${baseUrl()}/getTiktokProfInfo`;
    return fetchData(url);
  };
  
  export const getInstagramData = async () => {
    const url = `${baseUrl()}/getInstaProfInfo`;
    return fetchData(url);
  };  