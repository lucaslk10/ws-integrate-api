import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { WebsocketRequistionService } from 'src/service/websocket-requisition/websocket-requisition.service';
import { SocketMessage } from 'src/models/Message';
import * as uuid from 'uuidv4';

@Controller('ws-requisition')
export class WsRequisitionController {
  constructor(private readonly websocketRequistionService: WebsocketRequistionService) {}

  /**
   * Here we send the SQL Query
   *
   * Calls path:
   *
   * This MS Send to WebSocket > Data MS Receive the message and gets the data >
   * Data MS send data to WS > This MS Listen WS and return data on this Endpoint.
   *
   * @param {SocketMessage} body
   * @returns {Promise<any>}
   * @memberof WsRequisitionController
   */
  @Post('send')
  async send(@Res() res, @Body() body: SocketMessage) {
    body.uId = uuid.uuid();
    let response;

    /**
     * Send the information from req body to our WS Server
     * You can find Data MS example here in @github: lucaslk10 > repo: ws-client-send-data
     */
    await this.websocketRequistionService.send(body).then(
      (res) => (response = res),
      (rej) => (response = { error: rej }),
    );

    return res.status(HttpStatus.OK).json(response);
  }

  /**
   * Check if MS Is Alive
   */
  @Get('isAlive')
  async isAlive() {
    return { isAlive: true };
  }
}
