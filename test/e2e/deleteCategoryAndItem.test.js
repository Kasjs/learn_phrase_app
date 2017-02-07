module.exports = {
    'Delete category and items' : function (browser) {
        browser
            .url('localhost:3000')
            .waitForElementVisible('body', 1000)
            .click('.login-btn')
            .waitForElementVisible('.row', 1000)
            .setValue('.form-control', 'test@test.com')
            .pause(500)
            .setValue('input[type=password]', '12345678')
            .pause(500)
            .click('.submit-btn')
            .pause(1000)
            .click('.btn-configure')
            .pause(500)
            .setValue('select', 'Food')
            .pause(500)
            .click('.input-item')
            .pause(2000)
            .end()
    }
};
