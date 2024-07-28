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
    const url = `${import.meta.env.VITE_API_URL}/getChannelInfo`;
    return fetchData(url);
  };
  
  // Similar utility functions for TikTok and Instagram
  export const getTikTokData = async () => {
    const url = `${import.meta.env.VITE_API_URL}/getTiktokProfInfo`;
    return fetchData(url);
  };
  
  export const getInstagramData = async () => {
    const url = `${import.meta.env.VITE_API_URL}/getInstaProfInfo`;
    return fetchData(url);
  };  