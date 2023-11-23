'use strict';

// #############################################################################

const path = require('path');
const { readDirectories } = require('js-automation-tools');

const spacesToIndent = 4;

const isCalledExternally = __dirname.includes('node_modules');

const pageObjectsFolderPathes = 'PO_FOLDER_PATH' in process.env ?
    process.env.PO_FOLDER_PATH.replace(/\s+/g, '').split(',') :
    [path.join('tests', 'page-model')];

const fullPageObjectsFolderPathes = isCalledExternally ?
    pageObjectsFolderPathes.map((pageObjectsFolderPath) => {
        return path.join(__dirname, '..', '..', '..', pageObjectsFolderPath)
    }) :
    pageObjectsFolderPathes.map((pageObjectsFolderPath) => {
        return path.join(__dirname, '..', pageObjectsFolderPath)
    });

// Require all Page Object files in directory
let pageObjects = {};

/**
 * Requires Page Object files
 * @returns {Array} allRequiredPageObjects
 */
async function requirePageObjects () {
    const allPageObjectFiles = await readDirectories(
        fullPageObjectsFolderPathes);
    const allRequiredPageObjects = allPageObjectFiles.filter(
        (value) => {
            return value.includes('.js');
        }
    ).map((file) => {
        const fileName = path.basename(file, '.js');

        pageObjects[fileName] = require(file);

        return file;
    });

    console.log(
        '\nPage Objects from PO_FOLDER_PATH:',
        `\n${JSON.stringify(pageObjects, null, spacesToIndent)}\n\n`
    );

    return allRequiredPageObjects;
}

module.exports = requirePageObjects;
