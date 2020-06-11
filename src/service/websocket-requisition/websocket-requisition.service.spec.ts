import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketRequistionService } from './websocket-requisition.service';

describe('WebsocketRequistionService', () => {
  let service: WebsocketRequistionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketRequistionService],
    }).compile();

    service = module.get<WebsocketRequistionService>(WebsocketRequistionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
