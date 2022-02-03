const {
    Builder,
    By,
    Key,
} = require("selenium-webdriver");

const assert = require("assert");


async function buyVignette() {
    // launch the browser
    let driver = await new Builder().forBrowser("chrome").build();
    // 1. Go to https://www.a1.bg/bg
    await driver.get("https://www.a1.bg/bg")

    // let emergency = await driver.findElement(By.id('emergency'))
    // if (emergency !== undefined) {
    //     await driver.findElement(By.className('close closeModal')).click()
    // }

    // 2. Click on button "е-Винетка"
    await driver.findElement(By.linkText("е-Винетка")).click();

    // 3. Click on button "Купи тук"
    await driver.findElement(By.linkText("Купи тук")).click();

    //Store the ID of the original window
    const originalWindow = await driver.getWindowHandle();

    //Check we don't have other windows open already
    await driver.getAllWindowHandles().length === 1

    //Wait for the new window or tab
    await driver.wait(
        async () => (await driver.getAllWindowHandles()).length === 2,
            10000
    );

    //Loop through until we find a new window handle
    const windows = await driver.getAllWindowHandles();
    windows.forEach(async handle => {
        if (handle !== originalWindow) {
            await driver.switchTo().window(handle);
        }
    });

    // 4. Choose vehicle "Категория 3 - лек автомобил
    await driver.findElement(By.id("ico1")).click();

    // 5. Choose period – 30 лв. месечна
    await driver.findElement(By.id("priceTag-4")).click();

    // 6. Fill in registration number "CA1234BТ"
    await driver.findElement(By.id("plate")).sendKeys("СА1234ВТ");

    // 7. Choose Today's date.
    await driver.findElement(By.id("startFrom2")).click();
    await driver.findElement(By.className("ui-datepicker-days-cell-over  ui-datepicker-today")).click();

    //8. Click button "Продължи"
    await driver.findElement(By.className("button arrowright")).click();

    // 9. Enter email address 
    await driver.findElement(By.id("email")).click();
    await driver.findElement(By.id("email")).sendKeys("iskren@iskren.com", Key.RETURN)

    // 10. Mark "Съгласен съм с Общите условия" checkbox
    await driver.findElement(By.className("checkbox")).click();

    //11. Click button "Продължи"
    await driver.findElement(By.className("button arrowright")).click();

    //12. Verify the data on the screen: correct registration number and vignette type
    let carPlate = await (await driver.findElement(By.xpath("//table/tbody/tr[1]/td[2]")).getText())
    assert.strictEqual(carPlate, "СА1234ВТ")

    //13. Click button "Продължи"
    await driver.findElement(By.xpath("//button[text()='Потвърди']")).click();

    // 14 Verify that the Borica page - "Покупка на винетка" is opened
    let titleBorica = await driver.getTitle();
    assert.strictEqual(titleBorica, "Borica E-Payment")

}
buyVignette()