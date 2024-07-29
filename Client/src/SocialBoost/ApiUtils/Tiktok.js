import baseUrl from '../Common Components/baseUrl.js';
export const fetchTiktokProfInfo = async (inputValue) => {
    console.log(inputValue);
    try {
        let profileInfo = {
          id: "hassansTiktokProfile",
          userName: "hassanraza",
          thumbnail: "https://Tiktok_Profile_Thumbnail"
        }
        return { profileInfo };
      } catch (error) {
        console.error('Error fetching channel info:', error);
        return false 
      }
  };
  
  export const saveTiktokProfInfo = async (profInfo) => {
      // console.log(profInfo);
      try {
        const response = await fetch(`${baseUrl()}/saveTiktokProfInfo`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profInfo),
        });

        if (response.ok) {
          return true;
        } 
      } catch (error) {
        console.error('Error saving channel info:', error);
        return false;
      }
    };