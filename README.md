<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="Nest Logo" /></a>
  <a href="https://www.websocket.org/" target="blank"><img src="https://opensource.com/sites/default/files/images/life-uploads/websocket.png" width="60" alt="WebSocket Logo" /></a>
  <a href="#" target="blank"><img src="https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png" width="60" alt="TypeScript Logo" /></a>
</p>

## Description

The purpose of this applications is to perform an integration through services/app using WebSocket.

It will handle all requisition, send it to WebSocket then I'll wait for the data return. That data will come from 'ws-client-send-data' that also has an repo with example.

## Techs

NestJS - Great framework to abstract APIs construction.

WebSocket - Creates an bidirectional communication. You connect only once and can transfer data how much times you want and fast :)

TypeScript - You guys can know what type of data any methods expects to receive/return.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start:dev

# production mode
$ yarn build && yarn start:prod
```

## To Do

WSS Auth

Automated Tests

## Stay in touch

- Author - [Lucas Santana]
- Linkedin - [@lucasgustavosantana](https://www.linkedin.com/in/lucasgustavosantana/)

## License

[MIT licensed](LICENSE).
