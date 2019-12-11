import { LogType } from '../enums';

export interface ILog {
  readonly _id: string;
  readonly _rev?: string;
  readonly type: LogType;
  readonly message: string;
  readonly createdAt: number;
}
