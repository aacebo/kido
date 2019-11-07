import { StreamType } from '../../../resources/stream';

export const STREAM_TYPE_LABELS = {
  [StreamType.SignalR]: 'SignalR',
  [StreamType.SocketIO]: 'Socket.IO',
  [StreamType.WebSocket]: 'Websocket',
};
