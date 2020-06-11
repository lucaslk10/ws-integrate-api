import { Module } from '@nestjs/common';

import { WebsocketRequistionService } from './service/websocket-requisition/websocket-requisition.service';
import { WsRequisitionController } from './controller/ws-requisition/ws-requisition.controller';
import { HelpersService } from './service/helpers.service';

@Module({
  controllers: [WsRequisitionController],
  providers: [WebsocketRequistionService, HelpersService],
})
export class AppModule {}
