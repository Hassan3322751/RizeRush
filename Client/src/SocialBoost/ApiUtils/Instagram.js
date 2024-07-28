
export const fetchInstaProfInfo = async (inputValue) => {
  console.log(inputValue);
    try {
      let profileInfo = {
        id: "hassansInstaProfile",
        userName: "mianhassan6964",
        thumbnail: "https://Instagram_Profile_Thumbnail"
      }
      return { profileInfo };
    } catch (error) {
      console.error('Error fetching channel info:', error);
      return false 
    }
};

export const saveInstaProfInfo = async (profInfo) => {
    // console.log(profInfo);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/saveInstaProfInfo`, {
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