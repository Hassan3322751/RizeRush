export const addPromotion = async (promotionData) => {
    return fetch(`${import.meta.env.VITE_API_URL}/addPromotion`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promotionData),
    });
  };
  
  export const validateLink = (link, type) => {

    const youtubeChannelRegex = /^(https?:\/\/)?(www\.youtube\.com)\/(?:c\/|channel\/|user\/)?([a-zA-Z0-9_-]{1,})$/i;
    const youtubeVideoRegex = /^(https?:\/\/)?(www\.youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=))([a-zA-Z0-9_-]{11})/i;
    const youtubeChannelIdRegex = /^[a-zA-Z0-9_-]{24}$/;
    const instagramReelRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(?:reel\/|reels\/)[a-zA-Z0-9_-]+/i;
    const instagramProfileRegex = /^[a-zA-Z0-9._]{1,30}$/;
    const tiktokVideoRegex = /^(https?:\/\/)?(?:www\.)?tiktok\.com\/(?:@[\w.-]+\/)?video\/\d+/    ;
    const tiktokProfileRegex = /^(?!.*\.{2})[a-zA-Z0-9_.]{2,24}$/;
    const tiktokProfileRegex2 = /^@[a-zA-Z0-9_.]{2,24}$/;

    if(type === 'youtube'){
      // YouTube regex patterns
      if (youtubeVideoRegex.test(link)) {
        return link;
      } else if (youtubeChannelRegex.test(link)) {
        return link;
      } else if(youtubeChannelIdRegex.test(link)){
        return `https://www.youtube.com/channel/${link}` 
      }
    }
    else if(type === 'instagram'){
      // Instagram regex patterns
      if (instagramProfileRegex.test(link)) {
        return `https://www.instagram.com/${link}`;
      } else if (instagramReelRegex.test(link)) {
        return link
      }
    }
    else if(type === 'tiktok'){
      // TikTok regex patterns
      if (tiktokVideoRegex.test(link)) {
        return link;
      } else if(tiktokProfileRegex.test(link)){
        return `https://www.tiktok.com/@${link}`;
      } else if(tiktokProfileRegex2.test(link)) {
        return `https://www.tiktok.com/${link}`
      }
    }
  
    // If none of the above match, return false
    return false;
  };
  