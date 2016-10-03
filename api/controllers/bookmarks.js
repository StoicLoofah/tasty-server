'use strict';

var util = require('util');

module.exports = {
    bookmarks: bookmarks
}

function bookmarks(req, res) {
    res.json([
        {
            notes: '',
            tags: ['Tech', 'News'],
            timeAdded: new Date(),
            title: 'The Verge',
            url: 'http://theverge.com',
        },
        {
            notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            tags: ['Entertainment'],
            timeAdded: new Date(),
            title: 'Geek & Sundry',
            url: 'http://geekandsundry.com',
        }
    ]);
}
