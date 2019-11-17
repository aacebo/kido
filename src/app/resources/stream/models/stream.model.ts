import { StreamType } from '../enums';

export interface IStream {
  readonly _id: string;
  readonly _rev?: string;
  readonly url?: string;
  readonly name: string;
  readonly description?: string;
  readonly type: StreamType;
  readonly event?: string;
  readonly message?: string;
  readonly json?: boolean;
  readonly createdAt: number;
}
