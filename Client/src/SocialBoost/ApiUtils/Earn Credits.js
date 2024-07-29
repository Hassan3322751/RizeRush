import baseUrl from '../Common Components/baseUrl.js';
// apiUtils.js
export const fetchPromotions = async (platformType) => {
    console.log(platformType);
    try {
      const response = await fetch(`${baseUrl()}/getPromotions?platformType=${platformType}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        const savedPromotions = JSON.parse(localStorage.getItem('usersPromotions')) || [];
        const uniquePromotionIds = [...new Set(savedPromotions.map(promo => promo._id))];
  
        const filteredPromotions = data.promotions.filter(promo => {
          // Filter out promotions that are in local storage or donePromotions
          const isInLocalStorage = uniquePromotionIds.includes(promo._id);
          const isInDonePromotions = data.donePromotions.includes(promo._id);
          const isComplete = promo.isCompleted === true;
  
          return !isInLocalStorage && !isInDonePromotions && !isComplete;
        });
  
        return filteredPromotions;
      } else {
        console.error('Error fetching promotions:', data.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching promotions:', error.message);
      return [];
    }
  };
  