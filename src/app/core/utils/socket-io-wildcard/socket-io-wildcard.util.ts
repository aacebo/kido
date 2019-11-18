import { ISocketPacket } from '../../models';

export function socketIOWildcard(socket$: SocketIOClient.ManagerStatic) {
  const emit = socket$.prototype.emit;

  function onEvent(packet: ISocketPacket) {
    const data = packet.data || [];

    if (packet.id !== null) {
      data.push(this.ack(packet.id));
    }

    emit.call(this, '*', {
      event: packet.data[0],
      value: packet.data[1],
    });

    return emit.apply(this, data);
  }

  return (socket: any, next?: () => void) => {
    if (socket.onevent !== onEvent) {
      socket.onevent = onEvent;
    }

    return next ? next() : null;
  };
}
