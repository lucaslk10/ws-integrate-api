import { Test, TestingModule } from '@nestjs/testing';
import { WsRequisitionController } from './ws-requisition.controller';

describe('WsRequisition Controller', () => {
  let controller: WsRequisitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WsRequisitionController],
    }).compile();

    controller = module.get<WsRequisitionController>(WsRequisitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
