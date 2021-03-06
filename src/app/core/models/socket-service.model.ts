import { Observable } from 'rxjs';

export interface ISocketService {
  readonly disconnected: boolean;
  readonly connected$: Observable<void>;
  readonly disconnected$: Observable<void>;
  readonly error$: Observable<any>;
  readonly event$: Observable<{ e: string; v: any }>;

  connect: (events?: string[]) => void;
  disconnect: () => void;
  send: (args: any[], e?: string) => void;
}
