module.exports = {
    'Switch category, get next category and translate it' : function (browser) {
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
            .setValue('select', 'Sport')
            .pause(1000)
            .click('.btn-next')
            .pause(500)
            .click('.btn-next')
            .pause(500)
            .click('.btn-translate')
            .assert.containsText('.phrase', 'bow')
            .pause(500)
            .click('.btn-random')
            .pause(500)
            .click('.btn-random')
            .end()
    }
};
