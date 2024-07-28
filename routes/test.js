import express from 'express';

const router = express.Router();
console.log()

router.get(`/api/v1/test`, (req, res) => {
    console.log('test worked');
    res.status(201).json({ success: true, message: `Registration successful with referral ${process.env.BASE_ROUTE} and origin is : ${  process.env.STATE == "production" ? process.env.DEV_HTTPS_FRONT : process.env.HTTPS_FRONT } and ${process.env.STATE == "production" ? (`${process.env.DEV_DOMAIN}`
                ) : (
                    `${process.env.VERCEL_DOMAIN}`)}` });
})

export default router
