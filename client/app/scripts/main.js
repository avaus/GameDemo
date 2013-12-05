'use strict';

var game = {};
window.addEventListener('load', function() {
    yepnope({
        load: [
            'scripts/websocket.js',
            'scripts/game.js'
        ],
        complete: function() {
            console.log('Załadowano wszystkie pliki! ');
            game.game.drawCanvas();
        }
    });
}, false);