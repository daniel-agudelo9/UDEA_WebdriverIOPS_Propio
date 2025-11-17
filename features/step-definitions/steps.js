import { Given, When, Then } from "@wdio/cucumber-framework";

import LoginPage from '../pageobjects/login.page.js';
import TransferPage from '../pageobjects/transfer.page.js';

const pages = {
  login: LoginPage,
  transfer: TransferPage
};

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
});

//LOGIN
When(/^I login with (\w+) and (.+)$/, async (username, password) => {
  await LoginPage.login(username, password);
});

Then(/^I should see a text saying (.*)$/, async (message) => {
  if (message == "Error!") {
    // invalid username or password
    await expect($('.title')).toBeExisting();
    await expect($('.title')).toHaveTextContaining(message);
  } else {
    // valid username or password
    await expect($('.title')).toBeExisting();
    await expect($('.title')).toHaveTextContaining(message);
  }
});

//TRANSFER
When(/^I write the (.*) to transfer from the account (.*) to the account (.*) and press transfer$/,
     async (amount, fromAccount, toAccount) => {
       await TransferPage.transfer(amount, fromAccount, toAccount);
});

Then(/^I see (.*)$/, async (message) => {
  if (message == "Error!") {
    // invalid username or password
    await expect($("//h1[normalize-space()='Error!']")).toBeExisting();
    await expect($("//h1[normalize-space()='Error!']")).toHaveTextContaining(message);
    await TransferPage.logout();
  } else {
    // valid username or password
    await expect($("//h1[normalize-space()='Transfer Complete!']")).toBeExisting();
    await expect($("//h1[normalize-space()='Transfer Complete!']")).toHaveTextContaining(message);
    await TransferPage.logout();
  }
});
