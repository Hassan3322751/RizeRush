import express from 'express';
import puppeteer from 'puppeteer'

const router = express.Router();

router.post('/api/v1/ytSubscribe', async (req, res) => {
    const channelUrl = 'https://www.youtube.com/channel/UC-H_I6hG2SumoeILxfdSjTw';
  
    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
  
    // Subscribe to YouTube channel
    await page.goto(channelUrl, { timeout: 60000 });
  
    // Use a more reliable selector to target the subscribe button
    await page.evaluate(() => {
        const subscribeButton = document.querySelector('button[aria-label="Subscribe"]');
        if (subscribeButton) {
          subscribeButton.click();
        }
        else {
       console.log('Subscribe button not found');
     }
    });
  
    // Close Puppeteer
    await browser.close();
  
    res.json({ message: 'YouTube actions completed successfully' });
  });

export default router