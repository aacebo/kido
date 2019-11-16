export interface ISocketService {
  readonly closed: boolean;

  connect: () => void;
  disconnect: () => void;
  send: (v: any) => void;
}
