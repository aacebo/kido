import { StreamMessageType } from '../enums';

export interface IStreamMessage {
  readonly id: string;
  readonly streamId: string;
  readonly type: StreamMessageType;
  readonly content: any;
  readonly createdAt: number;
}
