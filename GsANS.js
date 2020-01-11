const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
require('dotenv').config();
// const path = require('path');
// const screenshotPath = path.resolve('./out/screenshot/') + '/';
process.setMaxListeners(Infinity);


try {

    (async () => {
        // init

        const browser = await puppeteer.launch({
            headless: false,
            args: ['--lang=ja']
        });


        const page = await browser.newPage();
        let targetElement = "";
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'ja-JP'
        });

        const client = await page.target().createCDPSession();
        await client.send('Network.emulateNetworkConditions', {
            offline: false,
            latency: 20, // 20ms
            downloadThroughput: 4 * 1024 * 1024 / 8, // 4Mbps
            uploadThroughput: 2 * 1024 * 1024 / 8 // 2Mbps
        });


        // await page.setJavaScriptEnabled(false)
        await page.emulate(devices['iPad Pro landscape']);
        // await page.setUserAgent('Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3679.0 Mobile Safari/537.36');

        await page.goto('https://www.facebook.com/groups/183545349248040/');
        // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await page.waitFor(2000);
        await page.type('input[name="email"]', process.env.MAILADDRESS);
        await page.type('input[name="pass"]', process.env.PASS);
        await page.waitFor(1000);
        await page.click('#u_0_5');
        await page.waitFor(20000);
        await page.click('#u_0_au');
        await page.waitFor(5000);
        await page.type('input[name="message"]', "1/10 (金）【本日のオールナイト】\n利用される方は「21:00まで」にコメントください！\n①入室時間（入室最終23:30まで）\n②退室予定時刻\n③本日やることや目標");


        //age_ok_btn


        // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        // await page.click('#ios_view_btn');

        // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        // await page.waitFor(10000);
        // await page.tap('#contents');
        // await page.click('#contents');
        // await page.waitFor(10000);
        // setTimeout(2000)
        process.on('unhandledRejection', console.dir);
        // await page.waitFor(60000);
        // await browser.close();
    })();

} catch (err) {
    console.error(err)
}
