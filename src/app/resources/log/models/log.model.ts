import { LogType } from '../enums';

export interface ILog {
  readonly type: LogType;
  readonly message: any;
  readonly createdAt: number;
}
