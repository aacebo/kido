import { StreamType } from '../enums';
import { IStreamArg } from './stream-arg.model';
import { IStreamListener } from './stream-listener.model';

export interface IStream {
  readonly _id: string;
  readonly _rev?: string;
  readonly url?: string;
  readonly name: string;
  readonly description?: string;
  readonly type: StreamType;
  readonly event?: string;
  readonly args: IStreamArg[];
  readonly listeners: IStreamListener[];
  readonly createdAt: number;
}
