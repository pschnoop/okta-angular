var webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
var chromeCapabilities = webdriver.Capabilities.chrome();

var browser = new webdriver.Builder().forBrowser('chrome')
                                         //.setChromeOptions(new chrome.Options().headless())
                                         .setChromeOptions(new chrome.Options().addArguments("--headless",
                                           "--disable-dev-shm-usage",
                                              "--verbose",
                                              "--headless",
                                              "--disable-web-security",
                                              "--ignore-certificate-errors",
                                              "--allow-running-insecure-content",
                                              "--allow-insecure-localhost",
                                              "--no-sandbox",
                                              "--disable-gpu"
                                         ))
                                         .build();
var assert = require('assert');
(async function example() {
    try {

        browser.manage().setTimeouts( { implicit: 10000 } );
        browser.get('http://localhost:6379/');

        await browser.wait(webdriver.until.elementLocated(webdriver.By.xpath('//button[@routerlink=\'/login\']')), 10000).click();

        await browser.wait(webdriver.until.elementLocated(webdriver.By.name('username')), 10000).sendKeys('testkostyadrozdov@gmail.com');

        await browser.wait(webdriver.until.elementLocated(webdriver.By.name('password')), 10000).sendKeys('Okta455099');

        await browser.wait(webdriver.until.elementLocated(webdriver.By.id('okta-signin-submit')), 10000).click();

        await browser.wait(webdriver.until.elementLocated(webdriver.By.xpath('//button[@routerlink=\'/protected\']')), 10000).click();

        var protectedEndPoint = await browser.wait(webdriver.until.elementLocated(webdriver.By.xpath('//app-secure[text()="Protected endpoint!"]')), 10000).getText();

        console.log(protectedEndPoint);
        assert.deepStrictEqual(protectedEndPoint,'Protected endpoint!');

        await browser.wait(webdriver.until.elementLocated(webdriver.By.xpath('//*[contains(text(),"Logout")]')), 10000).click();

        await browser.wait(webdriver.until.elementLocated(webdriver.By.xpath('//button[@routerlink=\'/login\']')), 10000).click();

        await browser.quit();

        console.log("Test passed");

    }
    catch(err){
        //console.log(err);
        console.error(err);
        browser.quit();
    }
    

})();