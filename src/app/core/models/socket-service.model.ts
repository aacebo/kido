import { Observable } from 'rxjs';

export interface ISocketService {
  readonly disconnected: boolean;
  readonly connected$: Observable<void>;
  readonly disconnected$: Observable<void>;
  readonly error$: Observable<any>;
  readonly event$: Observable<any>;

  connect: () => void;
  disconnect: () => void;
  send: (v: any, e?: string) => void;
}
