var path = require('path');

/**
 * Checks whether string is a path.
 * Uses the same logic as Module._resolveLookupPaths
 *
 * @param {string} string
 * @returns {boolean}
 */
var _isPath = function(string) {
    var start = string.substring(0, 2);
    return start === './' || start === '..';
};

/**
 * Parses given definition.
 *
 * @param {string} definition ex. 'module-name as myModule' or just 'module-name'
 * @returns {{requires: {string}, name: {string}}}
 */
var _parseDefinition = function(definition) {
    var splitter = definition.split(' as ');

    if (_isPath(splitter[0])) {
        splitter[0] = path.resolve(splitter[0]);
    }

    return {
        requires: splitter[0],
        name: splitter[1] || splitter[0]
    }
};

/**
 * Requires the modules from definitions and returns them all bundled in object.
 *
 * @param {String[]} modules
 * @returns {Object} bundle of all required modules
 */
var requirist = function(modules) {
    var bundle = {};

    var path = require('path');

    modules.forEach(function(definition) {
        definition = _parseDefinition(definition);
        bundle[definition.name] = require(definition.requires);
    });

    return bundle;
};

module.exports = requirist;