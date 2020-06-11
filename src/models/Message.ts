export interface SocketMessage {
  content: any;
  isBroadcast?: boolean;
  microservice?: string;
  sender?: string;
  time?: string;
  return?: boolean;
  uId?: string;
}
