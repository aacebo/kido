import { StreamType } from '../../resources/stream';

export const STREAM_TYPE_ABBR = {
  [StreamType.WebSocket]: 'WS',
  [StreamType.SignalR]: 'SR',
  [StreamType.SocketIO]: 'IO',
};
