const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
require('date-utils');
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
        var dt = new Date();
        var formatted = dt.toFormat("YYYY年MM月DD日");
        dateT = ["日", "月", "火", "水", "木", "金", "土"];
        var day = dateT[dt.getDay()];
        console.log(formatted, day);

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
        await page.waitFor(15000);
        await page.click('#u_0_au');
        await page.waitFor(3000);
        await page.type('input[name="message"]', `ハッカソンの為のテスト投稿です！欺して申し訳ないですが無視してください！\n${formatted} (${day})【本日のオールナイト】\n利用される方は「21:00まで」に下記URLよりフォームへ入力してください。\n8人以上になったら抽選を行います。\n抽選時GGA直前の人はフォームにてGGA直前のチェックを入れて貰うと優先されます。\nURL：https://docs.google.com/forms/d/1l6zM7ahAPg4lWnCer5bFvmxZbzFriIKB6jHMbTqi808/viewform?edit_requested=true`);
        await page.waitFor(2000);
        await page.mouse.click(8, 488)

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
