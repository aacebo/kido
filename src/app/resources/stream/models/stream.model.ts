import { StreamType } from '../enums';

export interface IStream {
  readonly id: string;
  readonly collectionId: string;
  readonly url: string;
  readonly type: StreamType;
  readonly createdAt: number;
}
