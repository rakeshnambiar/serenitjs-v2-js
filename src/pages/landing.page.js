//'use strict';
// const
//     citationPage = require('../pages/citation.page');

const landingPage = function() {

    const po = this;

    po.Submit_Manuscript_button = by.css('a[href="/create"]');
    po.All_Buttons = by.css('button');
    po.First_Manuscript = by.css('ul > li:nth-child(1) a');
    po.All_Manuscripts = by.css('ul > li > div:nth-child(1) > p > a');
    po.All_InProgress_Manuscripts = by.xpath('//h4[1]//following-sibling::ul[1]/li/div[1]/p/a');
    po.All_Submitted_Manuscripts = by.xpath('//h4[2]//following-sibling::ul[1]/li/div[1]/p/a');
    po.All_ManuscriptIDs = by.xpath('//ul/li/div/div[2]/span[1]');
    po.All_Manuscrit_Links = by.xpath('//div[1]/p/a');
    po.UserGuide_Link = by.css('a[href="/user-guide"]');
    po.userName_Link = by.xpath('//button/span[2]');
    po.All_Manuscript_Row = by.css('ul > li');
    po.Completed_Tab = by.css('a[href$="completed=true"]');
    po.My_Manuscripts = by.css('a[href="/dashboard"]')

    po.getLandingPageURL = () => {
        console.log('Function called');
        browser.getCurrentUrl().then((currentURL) => {
            console.log('Current URL - ' + currentURL);
            return currentURL.contains('login');
        });
    };

    /**
     * @return {boolean}
     */
    po.IsLandingPageVisible = async () =>  {
        let visibility;
        let EC = protractor.ExpectedConditions;
        await browser.wait(EC.visibilityOf(browser.element(po.Submit_Manuscript_button)), 20000);
        if(await browser.element(po.Submit_Manuscript_button).isPresent()) {
            visibility = true;
        }
        return visibility;
    };

    po.TriggerManuscriptSubmission = async () => {
        try {
                let page_URL = await browser.getCurrentUrl();
                let EC = protractor.ExpectedConditions;
                await browser.wait(EC.elementToBeClickable($('a[href="/create"]')), 20000);
                await browser.driver.sleep(1000);
                let submitManuscriptBtn = await browser.element(po.Submit_Manuscript_button);
                await submitManuscriptBtn.click();
                await console.log('Clicked first time');
                let i;
                for (i=0; i < 5; ++i) {
                    await console.log('In Loop');
                    let citation_URL = await browser.getCurrentUrl();
                    if (page_URL.valueOf() === await citation_URL.valueOf()) {
                        await submitManuscriptBtn.click();
                    } else {
                        await console.log('Button clicked successfully');
                        break;
                    }
            }
        }catch (e) {
            throw new ERROR('Error: While Clicks on Submit a manuscript button' + e);
        }
    };

    po.SelectFirstManuscript = async () => {
        try{
            await browser.element(po.First_Manuscript).click();
        }catch (e) {
            throw new Error('ERROR: While selecting the very first Manuscript from the dashboard');
        }
    };

    po.getManuscriptsCount = async () => {
      try{
          await browser.driver.sleep(4000);
          return await browser.element.all(po.All_Manuscripts).count();
      }catch (e) {
          throw new Error('ERROR: While getting the Manuscript count');
      }
    };

    po.SelectSpecificManuscript = async (emdID) => {
        try{
            await browser.driver.sleep(3000);
            let manuscripts = await browser.element.all(po.All_ManuscriptIDs);
            let titleLinks = await browser.element.all(po.All_Manuscrit_Links);
            let clicked = false;
            let position = 1;
            for (let manuscript of await manuscripts) {
                let rowID = await manuscript.getText();
                if(await rowID.includes(emdID)){
                    if(await titleLinks.length > 0){
                        await browser.executeScript('arguments[0].scrollIntoView()', titleLinks[position].getWebElement());
                        await browser.executeScript("arguments[0].click()", titleLinks[position].getWebElement());
                    }
                    await console.log('');
                    clicked = true;
                }
                if(clicked){
                    break;
                }
                position++;
            }
            await console.log('selected')
            return clicked;
        }catch (e) {
            throw new Error('ERROR: While selecting the Manuscript - ' + emdID);
        }
    };

    po.SelectLastManuscript = async () => {
        try{
            await browser.driver.sleep(2000);
            let allLinks = await browser.element.all(po.All_InProgress_Manuscripts);
            if(await allLinks.length > 0){
                await allLinks[allLinks.length-1].click();
            }
        }catch (e) {
            throw new Error('ERROR: While selecting the very Last(from Draft) Manuscript from the dashboard');
        }
    };

    po.SelectLastSubmittedManuscript = async () => {
        try{
            await browser.driver.sleep(4000);
            let allLinks = await browser.element.all(po.All_Submitted_Manuscripts);
            if(await allLinks.length > 0){
                await allLinks[allLinks.length-1].click();
            }
        }catch (e) {
            throw new Error('ERROR: While selecting the very Last(from Submitted) Manuscript from the dashboard');
        }
    };

    po.Logout = async () => {
        try{
            let clicked = false;
            await browser.driver.sleep(2000);
            let buttons = await browser.element.all(po.All_Buttons);
            await buttons[1].click();
            await browser.driver.sleep(1500);
            await buttons[1].click();
            await browser.driver.sleep(1500);
            buttons = await browser.element.all(po.All_Buttons);
            if(buttons.length > 0) {
                for (let button of await buttons) {
                    let text = await button.getText();
                    if (await text.toLowerCase().includes('logout')) {
                        await button.click();
                        await browser.driver.sleep(2000);
                        clicked = true;
                        break;
                    }
                }
            }
            return clicked;
        }catch (e) {
            throw new Error('ERROR: While Logging out');
        }
    };

    po.getManuscriptStatus = async (emsID) => {
        try{
            let final_status;
            await po.clickOnMyManuscriptLink();
            let rows = await browser.element.all(po.All_Manuscript_Row);
            if(await rows.length < 1){
                await browser.driver.sleep(4000);
                rows = await browser.element.all(po.All_Manuscript_Row);
            }
            final_status = await po.matchRowStatus(rows, emsID);
            if(final_status==null){
                if(await browser.element(po.Completed_Tab).isPresent()){
                    await browser.element(po.Completed_Tab).click();
                    await browser.driver.sleep(1000);
                    rows = await browser.element.all(po.All_Manuscript_Row);
                    final_status = await po.matchRowStatus(rows, emsID);
                }
            }
            return final_status;
        }catch (e) {
            throw new Error('ERROR: While getting the manuscript status' +  e.toString());
        }
    };

    po.clickOnMyManuscriptLink = async () => {
        try{
            await browser.element(po.My_Manuscripts).click();
            await browser.driver.sleep(2000);
        }catch (e){
            throw new Error('ERROR: While clicks on the My Manuscript link');
        }
    };

    po.matchRowStatus = async (rows, emsID) => {
        try{
            let status = null;
            let found = false;
            for (let row of rows) {
                let row_text = await row.getText();
                if (await row_text.toLowerCase().includes(emsID.toLowerCase())){
                    row_text = await row_text.split('\n');
                    status = await row_text[row_text.length - 2];
                    found = true;
                }
                if(found){
                    break;
                }
            }
            return status;
        }catch (e) {
            throw new Error('ERROR: While getting the manuscript status' +  e.toString());
        }
    };

    po.verifyCountAfterBulkUpload = async () => {
        try{
            await browser.driver.sleep(1000);
            let before_count = await po.getManuscriptsCount();
            await browser.driver.sleep(25000);
            await browser.driver.navigate().refresh();
            await browser.driver.sleep(3000);
            let after_count = await po.getManuscriptsCount();
            if(before_count === after_count || before_count < after_count){
                await console.log('INFO: Trying second time');
                await browser.driver.sleep(25000);
                await browser.driver.navigate().refresh();
                await browser.driver.sleep(3000);
                after_count = await po.getManuscriptsCount();
            }
            if(before_count === after_count || before_count < after_count){
                await console.log('INFO: Trying third time');
                await browser.driver.sleep(25000);
                await browser.driver.navigate().refresh();
                await browser.driver.sleep(3000);
                after_count = await po.getManuscriptsCount();
            }
            return before_count < after_count;
        }catch (e) {
            throw new Error('ERROR: While verifying the count after bulk upload');
        }
    };
};

module.exports = new landingPage();
