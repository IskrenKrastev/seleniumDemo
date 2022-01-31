const {
    Builder,
    By,
    Key
} = require("selenium-webdriver");

const assert = require("assert");



async function buyIpad() {

    // launch the browser
    let driver = await new Builder().forBrowser("chrome").build();
    // 1. Go to https://www.a1.bg/bg
    await driver.get("https://www.a1.bg/bg")

    let emergency = await driver.findElement(By.id('emergency'))
    if (emergency !== false) {
        await driver.findElement(By.className('close closeModal')).click()
    }

    // 2. Click on button "Устройства".
    await driver.findElement(By.linkText("Устройства")).click();

    // 3. Verify that the correct page is loaded
    let title = await driver.getTitle();
    assert.strictEqual(title, "Устройства - Частни клиенти - А1")

    // 4. Click on "Таблети"
    await driver.findElement(By.linkText("Таблети")).click();

    // 5. Click on "Apple iPad Pro 12,9'' (5th Gen)"
    await driver.findElement(By.xpath("//*[@id='devices_content_4']/div[1]/ul/li[7]/figure/a")).click()

    //5. Verify that the correct device is displayed.

    let currentPage = await driver.getTitle();
    assert.strictEqual(currentPage, "А1 - Apple iPad Pro 12,9'' (5th Gen)")

}
buyIpad()