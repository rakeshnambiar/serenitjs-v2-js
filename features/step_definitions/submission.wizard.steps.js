//'use strict';
// const
//     loginPage = require('../../src/pages/login.page'),
//     landingPage = require('../../src/pages/landing.page'),
//     assert = require('../../src/utils/assert').assert;



module.exports = function submitManuscriptSteps() {
    // import { Actors } from '../support/screenplay';
    //
    // Before(() => engage(new Actors()));

    let password;
    let email;
    let admin_username;
    let admin_password;
    let normal_username;
    let normal_password;
    let reviewer_username;
    let reviewer_password;

    this.Given(/^I am an Admin user$/, async () => {
       // await loginPage.openApp();
    });

    this.When(/^I login to the xPub system with the admin credential$/, async (table) => {
        // await console.log('------------Admin user login--------------');
        // email = table.raw().map(row => row[0]);
        // password = await table.raw().map(row => row[1]);
        // admin_username = email;
        // admin_password = password;
        // await browser.driver.sleep(1000); //demo
        // await loginPage.userLogin(admin_username, admin_password);
    });

    this.When(/^I login to the xPub system with the credential$/, async (table) => {
        // await console.log('------------Normal user login--------------');
        // email = table.raw().map(row => row[0]);
        // password = await table.raw().map(row => row[1]);
        // normal_username = email;
        // normal_password = password;
        // await browser.driver.sleep(1000);
        // await loginPage.userLogin(normal_username, normal_password);
    });

    this.When(/^the "([^"]*)" user re\-login again$/, async (user_type) => {
        // await console.log('------------Re-login as ' + user_type + ' user --------------');
        // await loginPage.openApp();
        // await browser.driver.sleep(1000);
        // if(user_type === 'admin'){
        //     await loginPage.userLogin(admin_username, admin_password);
        // } else if(user_type === 'normal') {
        //     await loginPage.userLogin(normal_username, normal_password);
        // } else {
        //     await loginPage.userLogin(reviewer_username, reviewer_password);
        // }
    });

    this.Then(/^I should able to see the xPub landing page$/, async () => {
        // await assert.isTrue(await landingPage.IsLandingPageVisible(), 'FAILED: Landing Page NOT loaded');
    });

};
