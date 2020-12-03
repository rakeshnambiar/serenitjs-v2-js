//'use strict';


const
    loginPage = require('../../pages/login.page'),
    landingPage = require('../../pages/landing.page'),
    assert = require('../../utils/assert').assert;

const {Given, When, Then, After, Before} = require('cucumber');
const {actorCalled, engage} = require('@serenity-js/core');
const {TakeScreenshot, Navigate} = require('@serenity-js/protractor');
const {equals, Check} = require("@serenity-js/assertions");
const {Actors} = require("../support/screenplay");
const {Log} = require("@serenity-js/core/src/screenplay/interactions/Log");
const {Website} = require("@serenity-js/protractor/src/screenplay/questions/Website");

let password;
let email;
let admin_username;
let admin_password;
let normal_username;
let normal_password;
let reviewer_username;
let reviewer_password;

Before(() => engage(new Actors()));

After(scenario => actorCalled('Inspector').attemptsTo(
    Check.whether(scenario.result.status, equals('failed').describedAs('Failure reason by the end of the test'))
        .andIfSo(TakeScreenshot.of(scenario.pickle.name))
));

// After(scenario => actorCalled('Inspector').attemptsTo(
//     TakeScreenshot.of(scenario.pickle.name)
// ));

Given(/^I am an Admin user$/, async () => {
    await actorCalled('Inspector').attemptsTo(Navigate.to('/'),);
    //await actorCalled('Inspector').attemptsTo(Log.the(Website.url()))
    await loginPage.openApp();
});

When(/^I login to the xPub system with the admin credential$/, async (table) => {
    await console.log('------------Admin user login--------------');
    email = table.raw().map(row => row[0]);
    password = await table.raw().map(row => row[1]);
    admin_username = email;
    admin_password = password;
    await browser.driver.sleep(1000); //demo
    await loginPage.userLogin(admin_username, admin_password);
});

When(/^I login to the xPub system with the credential$/, async (table) => {
    await console.log('------------Normal user login--------------');
    email = table.raw().map(row => row[0]);
    password = await table.raw().map(row => row[1]);
    normal_username = email;
    normal_password = password;
    await browser.driver.sleep(1000);
    await loginPage.userLogin(normal_username, normal_password);
});

When(/^the "([^"]*)" user re\-login again$/, async (user_type) => {
    await console.log('------------Re-login as ' + user_type + ' user --------------');
    await loginPage.openApp();
    await browser.driver.sleep(1000);
    if (user_type === 'admin') {
        await loginPage.userLogin(admin_username, admin_password);
    } else if (user_type === 'normal') {
        await loginPage.userLogin(normal_username, normal_password);
    } else {
        await loginPage.userLogin(reviewer_username, reviewer_password);
    }
});

Then(/^I should able to see the xPub landing page$/, async () => {
    await assert.isTrue(await landingPage.IsLandingPageVisible(), 'FAILED: Landing Page NOT loaded');
});
