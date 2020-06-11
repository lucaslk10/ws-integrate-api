/* Define Env */
import './defineEnv';

/* libs */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as WebSocket from 'ws';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/* app */
import { AppModule } from './app.module';
/* Auth Guard Service if Pre Set up.
import { AuthGuardService } from './guard/auth.guard';
*/

/* Init scripts for WebSocket Connection and Handle */
import { runWebSocket, setupListenWebSocket } from './setupWebSocket';
import { HelpersService } from './service/helpers.service';
const helper = new HelpersService();

async function bootstrap() {
  /* 
    Server Params containing cert for Https
    Cross-origin resource sharing
  */
  const serverParams = {
    // httpsOptions: defineCert(process.env.NODE_ENV), -- Pre Set Up Ssl
    cors: true,
  };

  /* 
    Our app `.create` with NestExpressApplication, passing AppModule and Server Params. 
  */
  const app = await NestFactory.create<NestExpressApplication>(AppModule, serverParams);

  /*
    Http Server
  */
  const httpServer = app.getHttpServer();

  /*
    Runs Web Socket Server for that http server
  */
  runWebSocket(httpServer);

  /* 
    This Methods Below are Only Possible Because We Create an App Express Based
    Since we declared type `NestExpressApplication` when call method `.create`
    
    useStaticAssets : Public asset directory for documentation
    useGlobalGuards : Guard for Requests Authentication
  */
  app.useStaticAssets(join(__dirname, '..', 'documentation'));
  // app.useGlobalGuards(new AuthGuardService()); -- Pre Set Up Auth

  /* 
    Create a Swagger Document for Endpoints Documentation
  */
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Integration Microservice')
      .setDescription('Integration Microservice')
      .setVersion('1.0')
      .addBearerAuth()
      .build(),
  );

  /* 
    Set up Swagger Module passing `Path` app and document created previously
    When your applications runs up, you can see the doc at localhost:port/api-docs/swagger
  */
  SwaggerModule.setup('api-docs/swagger', app, document);

  /* 
   App Listen Port
  */
  await app.listen(process.env.PORT);
}

/*
  Socket for a client connection to the WS server that we started before
*/
let socket: WebSocket;
/* 
  Start server calling `bootstrap` method that we Set Up
*/

bootstrap().then(() => {
  console.log(`Server started at port ${process.env.PORT}`);
  socket = setupListenWebSocket();
});
/*
  Exports WS Client so the entire application can use the same connection
  And don't need to create another one for each call. 

  Doing that we gain some miliseconds in the requisition
*/
export { socket };
