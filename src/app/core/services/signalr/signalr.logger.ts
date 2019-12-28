import * as signalr from '@aspnet/signalr';
import { Subject } from 'rxjs';

export class SignalrLogger implements signalr.ILogger {
  readonly connected$ = new Subject<void>();
  readonly disconnected$ = new Subject<void>();
  readonly error$ = new Subject<string>();

  log(level: signalr.LogLevel, message: string) {
    if (level === signalr.LogLevel.Information) {
      if (message.indexOf('WebSocket connected') > -1) {
        this.connected$.next();
      } else if (message === 'Connection disconnected.') {
        this.disconnected$.next();
      }
    } else if (level === signalr.LogLevel.Error) {
      this.error$.next(message);
    }
  }
}
