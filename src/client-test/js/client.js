
server = {
    init: function() {
        this.socket = io('http://localhost:3000', {
            path: '/'
        });

        this.players = [];

        this.socket.on('hello', (playerData) => {
            console.log(playerData);
            this.playerId = playerData.player;
            this.players = playerData.players;
        }),

        this.socket.on('positionChanged', (playerPosition) => {
            this.players[playerPosition.player].posX = playerPosition.posX;
            this.players[playerPosition.player].posY = playerPosition.posY;
        }),

        this.socket.on('colorChanged', (playerColor) => {
            this.players[playerColor.player].color = playerColor.color;
        })
    },

    move: function(direction) {
        this.socket.emit('move', direction);
    },

    getPlayers: function() {
        return Object.values(this.players);
    },
    
    getPlayer: function() {
        return this.players[this.playerId];
    }
    
}

server.init();