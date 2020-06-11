import { SocketMessage } from './models/Message';
import { HelpersService } from './service/helpers.service';
const Helper = new HelpersService();
import * as WebSocket from 'ws';

/*
  This function Set Up our WS Server
*/
function runWebSocket(httpServer: any) {
  const wss = new WebSocket.Server({ server: httpServer });
  const createMessage = (message: SocketMessage): string => JSON.stringify(message);

  /* Null call to our ping pong implemenation */
  function noop() {}

  /* For our Ping Pong handle it sets client as isAlive = true */
  function heartbeat() {
    this.isAlive = true;
  }

  /* On new connection */
  wss.on('connection', (ws: WebSocket | any) => {
    console.log('New Connection');
    ws.isAlive = true;

    /* If received a pong then sets the client to alive */
    ws.on('pong', heartbeat);

    /* Send immediatly a feedback to the incoming connection */
    ws.send(createMessage({ content: 'Connected Sucessfully to WebSocket Server' }));

    /* Method call on client close connection */
    ws.on('close', (code, message) => {
      console.log('Disconnection: ' + code + ' - ' + message);
    });

    /* For any error that occours with our client we will know */
    ws.on('error', (err) => {
      console.log(`Client disconnected - reason: ${err}`);
    });

    /* Listen every message received */
    ws.on('message', (msg: string) => {
      const message = Helper.isJson(msg) ? (JSON.parse(msg) as SocketMessage) : msg;

      /**
       * Timeout is important to create a little delay in the messages
       * so we will have no problem to handle them and do requests.
       */

      setTimeout(() => {
        if (typeof message === 'object' && message.isBroadcast) {
          /*
            Broadcast implementation 
          */
          wss.clients.forEach((client) => {
            if (client != ws) {
              client.send(createMessage(message));
            }
          });
        }
      }, 50);
    });
  });

  /**
   * Handle broken connections
   */
  const interval = setInterval(() => {
    wss.clients.forEach(function each(ws: any) {
      if (ws.isAlive === false) return closeConnTimedOut(ws);
      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 30000);

  const closeConnTimedOut = (ws) => {
    console.log('Connection Terminated');
    console.log(new Date());
    console.log(ws);
    ws.terminate();
  };

  wss.on('close', () => {
    clearInterval(interval);
  });
}

/**
 * Now our client set up to listen server we created before
 * So he can listen to integration data and return to the api.
 */

let pingTimeout: any;

/**
 * Our heartbeat for ping pong implementation
 * @param {WebSocket} ws Client Connection
 */
function heartbeatListener(ws: any) {
  clearTimeout(pingTimeout);

  /**
   * Use `WebSocket#terminate()`, which immediately destroys the connection,
   * instead of `WebSocket#close()`, which waits for the close timer.
   * Delay should be equal to the interval at which your server
   * sends out pings plus a conservative assumption of the latency.
   */

  pingTimeout = setTimeout(() => {
    console.log(`terminate`);
    ws.terminate();
  }, 30000 + 1000);
}

/**
 * Method to Set up our client and connect it
 */
const setupListenWebSocket = () => {
  const socket = new WebSocket(process.env.WS_SERVER);

  /**
   * Handle opened connection
   */
  socket.onopen = function () {
    console.log('Connected to WS');
    /* starts heartbeat when connection is open */
    heartbeatListener(socket);
  };

  /* log some error */
  socket.onerror = function (err) {
    console.log(err);
    clearTimeout(pingTimeout);
  };

  /**
   * If by some reason we get connection closed
   * it will start trying to reconnect to WS Server.
   */
  socket.onclose = function () {
    console.log('Connection Closed');
    console.log(new Date());
    setupListenWebSocket();
    clearTimeout(pingTimeout);
  };

  /**
   * Do a heartbeat when receives ping
   */
  socket.on('ping', (data) => {
    heartbeatListener(socket);
  });

  return socket;
};

export { setupListenWebSocket, runWebSocket };
