'use strict';

var game = {};
window.addEventListener('load', function() {
    yepnope({
        load: [
            'scripts/websocket.js',
            'scripts/rectangle.js',
            'scripts/camera.js',
            'scripts/map.js',
            'scripts/player.js',
            'scripts/game.js'
            //'scripts/test_game.js'
        ],
        complete: function() {
            console.log('Załadowano wszystkie pliki! ');
            //game.game.drawCanvas();
            game.game.play();
        }
    });
}, false);