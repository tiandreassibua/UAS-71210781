const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

let driver;

Given(
  "I am logged in as {string} with password {string}",
  async (username, password) => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://parabank.parasoft.com/parabank/index.htm");
    await driver.findElement(By.name("username")).sendKeys(username);
    await driver.findElement(By.name("password")).sendKeys(password);
    await driver.findElement(By.xpath("//input[@value='Log In']")).click();
    await driver.wait(until.titleContains("ParaBank"), 5000);
  }
);

When(
  "I transfer {string} dollars from one account to another",
  async (amount) => {
    await driver.findElement(By.linkText("Transfer Funds")).click();
    await driver.wait(until.titleContains("Transfer Funds"), 5000);
    if (amount !== "") {
      await driver.findElement(By.id("amount")).sendKeys(amount);
    }
    await driver.sleep(1000);

    const fromAccount = await driver.findElement(By.id("fromAccountId"));
    const toAccount = await driver.findElement(By.id("toAccountId"));
    await fromAccount.sendKeys(fromAccount.getText());
    await toAccount.sendKeys(toAccount.getText());
    await driver.findElement(By.xpath("//input[@type='submit']")).click();
  }
);

When(
  "I try to transfer {string} dollars from one account to another",
  async (amount) => {
    await driver.findElement(By.linkText("Transfer Funds")).click();
    if (amount !== "") {
      await driver.findElement(By.id("amount")).sendKeys(amount);
    }
    const fromAccount = await driver.findElement(By.id("fromAccountId"));
    const toAccount = await driver.findElement(By.id("toAccountId"));
    await fromAccount.sendKeys(fromAccount.getText());
    await toAccount.sendKeys(toAccount.getText());
    await driver.findElement(By.xpath("//input[@value='Transfer']")).click();
  }
);

Then("I should see a confirmation message {string}", async () => {
  const messageElement = await driver.findElement(By.id("rightPanel .title"));
  const resultText = await messageElement.getText();
  assert.ok(resultText.includes("Transfer Funds"));
  return "pending";
});

Then("I should see a validation message", async () => {
  const pageSource = await driver.getPageSource();
  assert.ok(
    pageSource.includes("error") || pageSource.includes("Please"),
    "No error message found"
  );
  await driver.quit();
});
