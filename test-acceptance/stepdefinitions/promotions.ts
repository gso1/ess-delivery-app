import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const baseURL = 'http://localhost:4200/';
const loginURL = baseURL + 'login/';
const userURL =  baseURL + 'user/';
const restURL =  baseURL + 'rest/';
const adminURL =  baseURL + 'admin/';
const homeURL =  baseURL + 'home';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const toLogin = async (url, type) => {
    await browser.get(url); 
    await $("a[name=" + type + "]").click();
}

const toCouponList = async (type, name) => {
    await toLogin(homeURL, type);
    await login(name);
}    

const toAddCoupon = async () => {
    await $("a[name='add-coupon']").click(); // clica no botão de adicionar cupom
} 

const login = async (id) => {
    await $("input[name='login']").sendKeys(<string> id); // preenche o input login
    await $("a[name='login']").click(); // clica no botão login
}

const getProducts = () => element.all(by.name('product'));
const getCoupons = () => element.all(by.name('coupon-name'));

const getTrash = (couponName) => element.all(by.name('trash-' + couponName));
const toEdit = (couponName) => {
    console.log("entrei toEdit");
    return element.all(by.name('edit-' + couponName));
}
const getCoupon = (couponName) => element.all(by.id('name-' + couponName));

const changeStatus = async () => {
    await $("input[name='status-box']").click();
} 

const addCoupon = async (type, couponName, discount, minValue, product, status) => {
    console.log("entrando pra adicionar");
    await $("input[name='name-box']").sendKeys(<string> couponName);
    await $("input[name='discount-box']").sendKeys(<number> discount);
    await $("input[name='minValue-box']").sendKeys(<number> minValue);
    if(status == "Ativo") {
        await changeStatus();
    }
    if(type == "restaurant"){
        await $("select[name='product-list']").click();
        await getProducts().filter(async p => (await (p.getText().then(name => name === product)))).click();
    }
    await toAddCoupon();
}

const clickAlert = async (action) => {
    var alert = await browser.switchTo().alert();
    if("yes") {
        await alert.accept();
    }else{
        await alert.dismiss(); 
    }
}  

const removeCoupon = async (couponName) => {
    await getTrash(couponName).click();
}


defineSupportCode(function ({ Given, When, Then }) {

    Given(/^o "([^\"]*)" "([^\"]*)" está na página de listagem de cupons$/, async (type, name) => {
        console.log(type);
        await toCouponList(type, name);
    });

    When(/^o "([^\"]*)" "([^\"]*)" tenta cadastrar o cupom "([^\"]*)" e um desconto de "([^\"]*)" com valor mínimo "([^\"]*)", associado ao produto "([^\"]*)" com status "([^\"]*)"$/, async (type, restName, name, discount, minValue, product, status) => {
            await toAddCoupon();
            await addCoupon(type, name, discount, minValue, product, status);
        }
    );

    When(/^o "([^\"]*)" "([^\"]*)" tenta cadastrar o cupom "([^\"]*)" e um desconto de "([^\"]*)" com valor mínimo de "([^\"]*)" com status "([^\"]*)"$/, async (type, adminName, name, discount, minValue, status) => {
            await toAddCoupon();
            await addCoupon(type, name, discount, minValue, "Nenhum", status);
        }
    );
    
    Then(/^o cupom "([^\"]*)" "([^\"]*)"$/, async (couponName, action) => {
        await clickAlert("yes");
    });
    Then(/^o cupom "([^\"]*)" "([^\"]*)" na página de listagem de cupons$/, async (couponName, appears) => {
        if (appears == "aparece"){
            await getCoupon(couponName).getText().then(async text => {
                await expect(text == couponName).to.equal(true);
            });
        }else{
            await getCoupon(couponName).getText().then(async text => {
                await expect(text == couponName).to.equal(false);
            });
        }
    });   

    When(/^o "([^\"]*)" "([^\"]*)" tenta excluir o cupom "([^\"]*)"$/, async (type, name, couponName) => {
        await removeCoupon(couponName);
    });

    When(/^o "([^\"]*)" "([^\"]*)" tenta atualizar o cupom "([^\"]*)" para ter status "([^\"]*)"$/, async (type, name, couponName, status) => {
        await toEdit(couponName).click();
        await changeStatus();   
        await $("a[name='confirm-link']").click();
    });

    Then(/^o cupom "([^\"]*)" aparece com status "([^\"]*)" na página de listagem de cupons$/, async (couponName, status) => {
        await getCoupon(couponName).getText().then(async text => {
            await expect(text == couponName).to.equal(true);
        });
    });  

}) 