'use strict';

// #############################################################################

let test2Page = {

    protocol: 'http://',
    textGold: 'Gold',
    textIndigo: 'Indigo',
    dropdownColors: '#dropdown-colors',
    blockDropdownColor: '#block-dropdown-color',
    inputColors: '#input-colors',
    blockInputColor: '#block-input-color',
    test1Url: 'http://localhost:8001/test1.html',
    test1Path: '/test1.html',
    loginTest2: 'testUser',
    passwordTest2: '1111',
    inputUsername: '#input-username',
    inputPassword: '//*[@id="input-password"]',
    buttonLogin: '#login',
    blockCredentials: '#block-credentials',
    input: 'input',
    updateText: function () {
        document.getElementById('text-test').innerHTML = 'Text to test ' +
            'script execution';
    }

};

test2Page.pageTest2 = `${test2Page.protocol}localhost:8001/test2.html`;

module.exports = test2Page;
