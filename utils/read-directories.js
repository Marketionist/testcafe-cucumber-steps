'use strict';

// #############################################################################

const { join } = require('path');
const { readdir, stat } = require('fs');
const { promisify } = require('util');

const readdirP = promisify(readdir);
const statP = promisify(stat);

/**
 * Asynchronously reads directory and returns the array of its files
 * @param {string} directory
 * @param {array} allFiles
 * @returns {array} allFiles
 */
async function readDirectory (directory, allFiles = []) {
    const files = (await readdirP(directory)).map((file) => {
        return join(directory, file);
    });

    allFiles.push(...files);
    await Promise.all(
        files.map(async (f) => {
            return (await statP(f)).isDirectory() && readDirectory(f, allFiles);
        })
    );

    return allFiles;
}

/**
 * Asynchronously reads directories and returns the array of their files
 * @param {array} directories
 * @returns {array} allFilesFinal
 */
async function readDirectories (directories) {
    const allFilesFinal = [];

    (await Promise.all(
        directories.map(async (dir) => {
            let files = await readDirectory(dir);

            return files;
        })
    )).map((value) => {
        allFilesFinal.push(...value);
    });

    return allFilesFinal;
}

module.exports = readDirectories;
