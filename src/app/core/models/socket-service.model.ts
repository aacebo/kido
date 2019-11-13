export interface ISocketService {
  readonly closed: boolean;

  connect: () => void;
  disconnect: () => void;
  destroy: () => void;
  send: (v: any) => void;
}
