//'use strict';

const loginPage = function () {

    const po = this;

    po.Login_User_Name = by.name('email');
    po.Login_Password = by.name('password');
    po.Login_Button = by.css('button[type="submit"]');
    po.SignUp_Link = by.css('p > a');

    po.openApp = async () => {
        try {
            await browser.get('/login');
            let xx = await browser.getCurrentUrl();
            await browser.executeScript('window.localStorage.clear();');
            await browser.executeScript('window.sessionStorage.clear();');
            await browser.driver.manage().deleteAllCookies();
            await console.log('Application URL - ' + await browser.getCurrentUrl());
            await browser.manage().window().maximize();
            //let menus = await browser.element.all(by.xpath('//div/h3'));
            //await console.log('menu count' + menus.length);
        }catch (e) {
            throw new Error('ERROR: In the openApp function');
        }
    };

    po.userLogin = async (username, password) => {
        try {
            await console.log('Username - ' + username);
            await console.log('Password - ' + password);
            await browser.element(po.Login_User_Name).sendKeys(username.toString());
            await browser.element(po.Login_Password).sendKeys(password.toString());
            //await browser.actions().mouseMove(element).mouseMove({x: 50, y: 0}).perform();
            let loginButton = await browser.element(po.Login_Button);
            let xx = 0;
            let yy = 0;
            await loginButton.getLocation().then(async (location) => {
                xx = await location.x;
                yy = await location.y;
            });
            //await browser.actions().mouseMove(loginButton, {x: xx, y: yy}).click().perform();
            await browser.element(po.Login_Button).click();
            await browser.driver.sleep(4000);
        }catch (e){
            throw new Error('ERROR: In the Login function');
        }
    };

    po.getRandomLoginCredential = async () =>{
        try {
            let givenName = Math.random().toString(36).substring(2);
            let surname = Math.random().toString(36).substring(2);
            let password = Math.random().toString(36).substring(2);
            return givenName + '-' + surname + '-' + password;
        }catch (e){
            throw new Error('ERROR: In the getRandomLoginCredential function');
        }
    };


    po.goToSignUpPage = async () => {
      try{
            let links = await browser.element.all(po.SignUp_Link);
            if(links.length === 0){
                await browser.driver.sleep(4000);
                links = await browser.element.all(po.SignUp_Link);
            }
            let found = false;
            for (let link of links) {
                await link.getText().then(async (text) => {
                    if(await text.includes("Create an account")){
                        await link.click();
                        await browser.driver.sleep(1000);
                        found = true;
                    }
                });
                if(found ===true){
                    break;
                }
            }
      }  catch (e) {
          throw new Error('ERROR: While navigating to the Sign up page');
      }
    };

    po.IsLoginPageVisible = async () => {
        await browser.driver.sleep(1000);
        return browser.element(po.Login_Button).isDisplayed();
    };
};

module.exports = new loginPage();
