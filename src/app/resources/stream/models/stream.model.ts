import { StreamType } from '../enums';

export interface IStream {
  readonly _id: string;
  readonly _rev?: string;
  readonly url?: string;
  readonly type: StreamType;
  readonly createdAt: number;
}
