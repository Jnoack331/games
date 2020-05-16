const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

const clients = {};
const speed = 0.5;
const maxVel = 20;     
const acceleration = 2;
const deceleration = 10;
const tempo = 10;
const maxSpeed = 200;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getPlayers() {
  const players = {};
  Object.entries(clients).forEach((player) => {
    players[player[0]] = {
      posX: player[1].posX,
      posY: player[1].posY,
      color: player[1].color,
    };
  });
  return players;
}

function emitAll(event, data) {
  Object.values(clients).forEach((player) => {
    player.emit(event, data);
  })
}

io.on('connection', client => {
  console.log('connection has been made!');

  client.posX = 0;
  client.posY = 0;
  client.velX = 0;
  client.velY = 0;
  client.up = false;
  client.left = false;
  client.down = false;
  client.right = false;
  client.lastTime = Date.now();
  client.color = getRandomColor();
  client.playerId = client.conn.id;

  clients[client.playerId] = client;

  emitAll('hello', {
    player: client.playerId,
    players: getPlayers(),
  });

  emitAll('colorChanged', {
    player: client.playerId,
    color: client.color,
  });

  client.on('move', data => {
    switch (data) {
      case 'up':
        client.up = true;
        break;
      case 'left':
        client.left = true;
        break;
      case 'down':
        client.down = true;
        break;
      case 'right':
        client.right = true;
        break;
      default:
        break;
    }
  });

  client.on('disconnect', () => {
    delete clients[client.playerId];
    emitAll('hello', {
      player: client.playerId,
      players: getPlayers(),
    });
  })
});

setInterval(() => {
  for (let [clientId, client] of Object.entries(clients)) {
    const offset = Date.now() - client.lastTime;

    if(client.up === true) {
      client.velY += (tempo + (acceleration*acceleration))*-1;
      if(client.velY < 0) {client.posY += client.velY/10;}
    } else if((client.up === false) && (client.velY < 0)){
      if(client.velY < 0) {
        client.posY += client.velY/10;
        if(client.velY > deceleration*-1){
          client.velY -= client.velY;
        } else if(client.velY < 0){
          client.velY += deceleration;
        }
      }
    }
  
    if(client.left === true) {
      client.velX += (tempo + (acceleration*acceleration))*-1;
      if(client.velX < 0) {client.posX += client.velX/10;}
    } else if((client.left === false) && (client.velX < 0)){
      if(client.velX < 0) {
        client.posX += client.velX/10;
        if(client.velX > deceleration*-1){
          client.velX -= client.velX;
        } else if(client.velX < 0){
          client.velX += deceleration;
        }
      }
    } 
  
    if(client.down === true) {
      client.velY += (tempo + (acceleration*acceleration));
      if(client.velY > 0) {client.posY += client.velY/10;}
    } else if((client.down === false) && (client.velY > 0)){
      if(client.velY > 0) {
        client.posY += client.velY/10;
        if(client.velY < deceleration){
          client.velY -= client.velY;
        } else if(client.velY > 0){
          client.velY -= deceleration;
        }
      }
    }
  
    if(client.right === true) {
      client.velX += (tempo + (acceleration*acceleration));
      if(client.velX > 0) {client.posX += client.velX/10;}
    } else if((client.right === false) && (client.velX > 0)){
      if(client.velX > 0) {
        client.posX += client.velX/10;
        if(client.velX < deceleration){
          client.velX -= client.velX;
        } else if(client.velX > 0){
          client.velX -= deceleration;
        }
      }
    } 
  
      //cap at max Speed
      if(client.velY < -maxSpeed){
        client.velY -= (client.velY + maxSpeed);
      }
      if(client.velY > maxSpeed){
        client.velY -= (client.velY - maxSpeed)
      }
      if(client.velX < -maxSpeed){
        client.velX -= (client.velX + maxSpeed)
      }
      if(client.velX > maxSpeed){
        client.velX -= (client.velX - maxSpeed)
      }

      client.up = false;
      client.left = false;
      client.down = false;
      client.right = false;

    client.lastTime = Date.now();
    emitAll('positionChanged', {
      player: clientId,
      posX: client.posX,
      posY: client.posY,
    });
    //console.log(client.posX, client.posY, client.color);
  }

}, 10)

server.listen(3000);