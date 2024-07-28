import React, { useState, useEffect } from 'react';

const YouTubeSubscribeButton = () => {
  useEffect(()=>{


    const fnctn = async ()=>{
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/ytSubscribe`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response) {
          console.log(response)
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
    fnctn();
  },[])


    return (
      <div>
        
          <p>You are subscribed to Google Developers!</p>
        
          <p>You are not subscribed to Google Developers.</p>
        
      </div>
    );
  }
export default YouTubeSubscribeButton;