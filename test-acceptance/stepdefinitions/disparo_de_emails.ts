import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, protractor } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var EC = protractor.ExpectedConditions;
// let alert = browser.switchTo().alert();


// Definição de constantes
const baseURL = "http://localhost:4200/"
const homeURL = baseURL + 'home';

const user_name = "mileto"
const user_id = "578dbdea"
const order_id = " 9c83c7d0"


const selectLoginType = async (url, type) => {
    // escolhe o tipo de usuário, indo à página de login
    // (vai apra /home)
    // console.log("\nEntrando na página /home...");
    await browser.get(url);
    // console.log("...Done\n");
    // (clica no login de cliente)
    // console.log(`\nClicando no botão de loging (user)...`);
    await $(`a[name='${type}']`).click();
    // console.log("...Done\n");


}

const login = async (id) => {
    // realiza o login 
    // (preenche o id)
    // console.log("\nPreenchendo o input login...");
    await $("input[id='id']").sendKeys(<string>id); // preenche o input login
    // console.log("...Done\n")
    // (clica no botão de login)
    // console.log("\nClicando no botão login...")
    await $("a[class='pink-link']").click(); // clica no botão login
    // console.log("...Done\n")
}

const fillOrder = async () => {
    // preenche a quantidade de cada tipo de produto
    // (pega o id do elemento html de classe 'product-list'...)
    // console.log("\nPreenchendo pedido...")
    let productList_id = null
    await $("div[class=product-list]").getId().then((promise) => productList_id = promise)
    // (...itera sobre o children, adicionando um valor para cada, produto)
    var all_items: ElementArrayFinder = element.all(by.name('product-input'));
    await all_items.each((item) => {
        item.sendKeys(protractor.Key.BACK_SPACE, <string>"1")
    })


    // seleciona o método pagamento
    // console.log("\nSelecionando método de pagamento...")
    // (clica no dropdown de seleção de método de pagamento)
    await $("select[class='options ng-untouched ng-pristine ng-valid']").click();
    // (seleciona um método de pagamento)
    var all_items: ElementArrayFinder = element.all(by.tagName('option'));
    await all_items.get(0).click()


    // TODO: aplica cupom
}

const goToFinishedOrderScreen = async (user_id) => {
    // seleciona o tipo de login
    await selectLoginType(homeURL, "user")

    // realiza login
    await login(user_id)

    // vai para a tela de fazer pedido 
    // console.log("\nClicando no botão de fazer pedido...");
    await $("a[name='make order']").click()
    // console.log("...Done\n");

    // preenche o pedido
    await fillOrder()
}

const fromOrderPage_finishOrder = async () => {
    // clica em finalizar pedido, indo para a tela de pedido finalizado
    // console.log("\nClicando em finalizar pedido...")
    await $("a[name='finish_order_button").click()
    // console.log("..Done\n")
}

const fromFinishedOrder_goToHome = async () => {
    // clica em voltar para o perfil (after waiting for finished order page to load)
    await browser.wait(EC.presenceOf($("a[name='voltar_para_o_perfil_button")), 5000, "Finished button not found after 20 seconds!")
    // console.log("\nClicando em voltar para o perfil...")
    await $("a[name='voltar_para_o_perfil_button").click()
    // console.log("..Done\n")
}

// Scenario 1
defineSupportCode(function ({ Given, When, Then, setDefaultTimeout }) {
    setDefaultTimeout(60 * 1000)

    Given(/^o usuário mileto está na página de confirmação do pedido 578dbdea$/, async () => {
        await goToFinishedOrderScreen(user_id)
    });

    When(/^mileto finaliza o pedido 578dbdea$/, async () => {
        await fromOrderPage_finishOrder()
    })

    When(/^mileto clica no botão de voltar ao perfil$/, async () => {
        await fromFinishedOrder_goToHome()
    })

    Then(/^o sistema vai para a página de perfil do usuário mileto$/, async () => {
        await expect(await browser.getCurrentUrl()).to.equal(`${baseURL}user/${user_id}/profile`)
    })

})


const selectEmailNotRecieved = async () => {
    // seleciona o link relatando que não recebeu nenhum e-mail
    await browser.wait(EC.presenceOf($("div[class='link']")), 20000, "'não recebi nenhum e-ail' button not found after 20 seconds!")
    await $("div[class='link']").click()
}

const fromEmailNotRecievedNotSubimitted_goProfile = async () => {
    // seleciona o link relatando que não recebeu nenhum e-mail
    await $("div[class='link'").click()
}
// Scenario 2
defineSupportCode(function ({ Given, When, Then, setDefaultTimeout }) {
    setDefaultTimeout(60 * 1000)

    // Given(/^o usuário mileto está na página de confirmação do pedido 578dbdea$/, async () => {
    //     await goToFinishedOrderScreen(user_id)
    // });

    // When(/^mileto finaliza o pedido$/, async () => {
    //     await fromOrderPage_finishOrder()
    // })

    When(/^mileto clica no botão relatando que não recebeu nenhum e-mail$/, async () => {
        await selectEmailNotRecieved()
    })

    When(/^mileto muda de idiea e clica no botão de voltar ao perfil$/, async () => {
        await fromEmailNotRecievedNotSubimitted_goProfile()
    })

    // Then(/^o sistema vai para a página de perfil do usuário mileto$/, async () => {
    //     await expect(await browser.getCurrentUrl()).to.equal(`${baseURL}user/${user_id}/profile`)
    // })

})

const selectResendEmail = async () => {
    // seleciona o botão para re-enviar e-mail
    await $("a[class='btn pink-link']").click()
}

// Scenario 3
defineSupportCode(function ({ Given, When, Then, setDefaultTimeout }) {
    setDefaultTimeout(60 * 1000)

    // Given(/^o usuário mileto está na página de confirmação do pedido 578dbdea$/, async () => {
    //     await goToFinishedOrderScreen(user_id)
    // });

    // When(/^mileto finaliza o pedido$/, async () => {
    //     await fromOrderPage_finishOrder()
    // })

    // When(/^mileto clica no botão relatando que não recebeu nenhum e-mail$/, async () => {
    //     await selectEmailNotRecieved()
    // })

    When(/^mileto clica no botão de re-enviar e-mail com comprovante de pedido$/, async () => {
        await selectResendEmail()
    })

    // When(/^mileto clica no botão de voltar ao perfil$/, async () => {
    //     await fromFinishedOrder_goToHome()
    // })

    // Then(/^o sistema vai para a página de perfil do usuário mileto$/, async () => {
    //     await expect(await browser.getCurrentUrl()).to.equal(`${baseURL}user/${user_id}/profile`)
    // })

})

const goToProfile = async (user_id) => {
    await selectLoginType(homeURL, "user")
    await login(user_id)
}


// Scenario 4
defineSupportCode(function ({ Given, When, Then, setDefaultTimeout }) {
    setDefaultTimeout(60 * 1000)

    Given(/^o usuário mileto está na página de perfil$/, async () => {
        await goToProfile(user_id)
    });

    When(/^o usuario mileto entra na página de pedidos passados$/, async () => {
        await $("a[class='btn leaked-link']").click()
    })

    When(/^o usuario mileto clica no ícone de reenviar comprovante de pedido por e-mail$/, async () => {
        var all_items: ElementArrayFinder = element.all(by.name('resend-email-link'));
        await all_items.get(0).click()
    })

    // When(/^o usuário é informado de se foi um suceso ou não o envio do e-mail$/, async () => {
    //     await alert.accept()
    // })
})

// Scenario 5
defineSupportCode(function ({ Given, When, Then, setDefaultTimeout }) {
    setDefaultTimeout(60 * 1000)

    // Given(/^o usuário mileto está na página de perfil$/, async () => {
    //     await goToProfile(user_id)
    // });

    // When(/^o usuario mileto entra na página de pedidos passados$/, async () => {
    //     await $("a[class='btn leaked-link']").click()
    // })

    When(/^o usuario mileto clica no ícone de fazer download do comprovante de pedido$/, async () => {
        var all_items: ElementArrayFinder = element.all(by.name('resend-email-link'));
        await all_items.get(0).click()
    })

    // When(/^o sistema realiza o download do comprovante de pedido/, async () => {
    //     await alert.accept()
    // })
})



