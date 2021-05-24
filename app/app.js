const puppeteer =  require("puppeteer-extra");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
exports.lambdaHandler = async (event) => {
  console.log(event);
  const url = event['queryStringParameters'].url;
  console.log(event['queryStringParameters']);
  puppeteer.use(StealthPlugin());
  try {
    const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium', headless: true, userDataDir: "/tmp",dumpio: true, args: ['--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--disk-cache-size=33554432',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
    '--single-process',
    '--enable-logging=stderr',
    '--v=1',
    ]});
    console.log("Launched");
    const page = await browser.newPage();

    if(url) {
      await page.goto(url);
    } else {
      await page.goto("https://google.com");
    }
    
    // const pdfStream = await page.pdf();
    const screenshot = await page.screenshot({ path: '/tmp/page.png', fullPage: true, encoding: "base64" })
    await browser.close();
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-type": "image/png"
      },
      body: screenshot.toString("base64")
    };
  } catch(e) {
    console.log(e);
    return {
      statusCode: 500
    };
  }
    
};