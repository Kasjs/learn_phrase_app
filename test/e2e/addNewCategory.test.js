module.exports = {
    'Add new category' : function (browser) {
        let createNewCategory = function() {
            let itemNumber = Math.floor(Math.random() * 15000);
            let category = {
                name : "New" + Math.floor(Math.random() * 15000),
                side_a: `слово${itemNumber}`,
                side_b: `word${itemNumber}`
            }
            return category;
        }
        let newCategory = createNewCategory();
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
            .click('.btn-sunc')
            .waitForElementVisible('.category-form', 1000)
            .setValue('.new-category', newCategory.name)
            .pause(200)
            .setValue('.side_a', newCategory.side_a)
            .pause(200)
            .setValue('.side_b', newCategory.side_b)
            .pause(600)
            .click('.submit-btn')
            .pause(3000)
            .click('.btn-link')
            .waitForElementVisible('body', 1000)
            .setValue('select', newCategory.name)
            .pause(1000)
            .assert.containsText('strong', newCategory.name)
            .pause(1000)
            .click('.btn-sunc')
            .pause(1000)
            .setValue('select', newCategory.name)
            .pause(500)
            .clearValue('.new-category')
            .setValue('.new-category', '')
            .pause(500)
            .clearValue('.side_a')
            .pause(500)
            .setValue('.side_a', 'another')
            .pause(600)
            .clearValue('.side_b')
            .pause(600)
            .setValue('.side_b', 'another')
            .pause(600)
            .click('.submit-btn')
            .pause(2000)
            .click('.btn-link')
            .setValue('select', newCategory.name)
            .pause(1000)
            .click('.btn-next')
            .click('.btn-next')
            .assert.containsText('.phrase', 'another')
            .pause(3000)
            .end()
    }
};
