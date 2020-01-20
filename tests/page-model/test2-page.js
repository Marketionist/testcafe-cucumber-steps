'use strict';

module.exports = (function () {

    let test2Page = {

        pageTest2: 'http://localhost:8001/test2.html',
        textGold: 'Gold',
        textIndigo: 'Indigo',
        dropdownColors: '#dropdown-colors',
        blockDropdownColor: '#block-dropdown-color',
        inputColors: '#input-colors',
        blockInputColor: '#block-input-color',
        updateText: function () {
            document.getElementById('text-test').innerHTML = 'Text to test ' +
                'script execution';
        }

    };

    return test2Page;

})();
