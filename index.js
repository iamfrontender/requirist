var path = require('path');
var glob = require('glob');
var camelize = require('camelize');

/**
 * Adds given definition to bundle (performs actual require call)
 * Simply adds a require result to an object.
 *
 * @param {Object} bundle
 * @param {Object} definition
 *   @param {String} name
 *   @param {String} requires
 */
var _addToBundle = function _addToBundle(bundle, definition) {
    bundle[definition.name] = require(definition.requires);
};

/**
 * Converts path to a valid bundle name.
 *
 * @param {string} file Path to file
 * @returns {string}
 */
var _getFilename = function _getFilename(file) {
    return camelize(path.parse(file).name);
};

/**
 * Checks whether string is a path.
 * Uses the same logic as Module._resolveLookupPaths
 *
 * @param {string} string
 * @returns {boolean}
 */
var _isPath = function _isPath(string) {
    var start = string.substring(0, 2);
    return start === './' || start === '..';
};

/**
 * Checks if given string is representing globstar pattern
 *
 * @param {string} string
 */
var _isGlobstar = function _isGlobstar(string) {
    return string.indexOf('*') !== -1;
};

/**
 * Parses given definition.
 *
 * @param {string} definition ex. 'module-name as myModule' or just 'module-name'
 * @returns {
 *      {
 *          requires: {string},
 *          name: {string}
 *      }|{
 *          requires: {string},
 *          name: {string}
 *      }[]
 *  }
 */
var _parseDefinition = function(definition) {
    definition = definition.split(' as ');

    var target = definition[0];
    var name = definition[1];

    if (_isPath(target)) {
        if (_isGlobstar(target)) {
            return getGlob(target, name);
        } else {
            return getPath(target, name);
        }
    } else {
        return getPlain(target, name);
    }
};

/**
 * Glob getter, returns an array of found files independent of their extensions.
 *
 * @param {string} target
 * @param {string} name
 * @returns {Array}
 */
var getGlob = function getGlob(target, name) {
    return glob.sync(target).map(function(file) {
        return getPath(file, (name || '') + _getFilename(file));
    });
};

/**
 * Returns definition to require given file target.
 *
 * @param {string} target
 * @param {string} name
 * @returns {{requires: {string}, name: (string)}}
 */
var getPath = function getPath(target, name) {
    return {
        requires: path.resolve(target),
        name: name || _getFilename(target)
    };
};

/**
 * Returns definition of given plain (native or nested module) target.
 *
 * @param {string} target
 * @param {string} name
 * @returns {{requires: {string}, name: {string}}}
 */
var getPlain = function getPlain(target, name) {
    return {
        requires: target,
        name: name || target
    };
};

/**
 * Requires the modules from definitions and returns them all bundled in object.
 *
 * @arguments {String} modules definitions
 * @returns {Object} bundle of all required modules
 */
var requirist = function() {
    var bundle = {};
    var modules = Array.prototype.slice.call(arguments);

    modules.forEach(function(definition) {
        definition = _parseDefinition(definition);

        if (definition instanceof Array) {
            definition.forEach(function(item) {
                _addToBundle(bundle, item)
            });
        } else {
            _addToBundle(bundle, definition);
        }

    });

    return bundle;
};

module.exports = requirist;