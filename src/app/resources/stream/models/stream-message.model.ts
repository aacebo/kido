import { StreamMessageType } from '../enums';

export interface IStreamMessage {
  readonly _id: string;
  readonly _rev?: string;
  readonly streamId: string;
  readonly type: StreamMessageType;
  readonly content: string;
  readonly event?: string;
  readonly json?: boolean;
  readonly createdAt: number;
}
