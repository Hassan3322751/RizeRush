import axios from 'axios';
import baseUrl from '../Common Components/baseUrl.js';

export const fetchChannelInfo = async (inputValue) => {
  try {
    const isChannelLink = inputValue.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:user\/|channel\/|c\/)?([\w-]+)/);
    
    let channelId;
    if (isChannelLink) {
      channelId = isChannelLink[1];
    } else {
      channelId = inputValue;
    }

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?key=${import.meta.env.VITE_YT_API_KEY}&part=snippet&id=${channelId}`
    );
      // console.log(response)
    const snippetData = response.data.items[0].snippet;
    const thumbnailUrl = snippetData.thumbnails.default.url;
    const channelName = snippetData.title;
    const id = response.data.items[0].id;
    return { channelName, id, thumbnail: thumbnailUrl };
  } catch (error) {
    console.error('Error fetching channel info:', error);
    return false 
  }
};

export const saveChannelInfo = async (channelInfo) => {
  try {
    const response = await fetch(`${baseUrl()}/saveYoutubeInfo`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(channelInfo),
    });

    if (response.ok) {
      return true;
    } 
  } catch (error) {
    console.error('Error saving channel info:', error);
    return false;
  }
};