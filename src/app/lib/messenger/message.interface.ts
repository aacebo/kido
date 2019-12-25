import { MessageType } from './message-type.enum';

export interface IMessage {
  readonly _id: string;
  readonly _rev?: string;
  readonly type: MessageType;
  readonly content: string;
  readonly event?: string;
  readonly json?: boolean;
  readonly size?: number;
  readonly createdAt: number;
}
