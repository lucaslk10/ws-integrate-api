import { Injectable } from '@nestjs/common';
import { SocketMessage } from 'src/models/Message';
import { HelpersService } from '../helpers.service';
import { socket } from '../../main';

@Injectable()
export class WebsocketRequistionService {
  constructor(private readonly helperService: HelpersService) {}

  /*
    
  */
  async send(message: SocketMessage) {
    return new Promise((resolve, reject) => {
      try {
        message.time = new Date().toISOString();
        message.isBroadcast = true;

        const uId = message.uId;

        /* 
          Send the Data for the Integration
        */
        socket.send(JSON.stringify(message));

        /*
          Then expects a return message from the Microservice that 
          call the data, probably this MS will be in a private network. 
          Here we will simulate a database integration.
        */
        socket.onmessage = (dataOracle) => {
          if (this.helperService.isJson(dataOracle.data)) {
            const data: SocketMessage = JSON.parse(dataOracle.data.toString());

            if (data.uId == uId && data.return) {
              /* 
                gets the returned message from our MS that send the data to our
                WS Server and resolves promise
              */
              this.helperService.isJson(data.content)
                ? (data.content = JSON.parse(data.content))
                : null;

              resolve(data);
            }
          }
        };
      } catch (error) {
        reject(error.message);
      }
    });
  }
}
