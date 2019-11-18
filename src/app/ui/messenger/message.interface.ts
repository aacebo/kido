import { MessageType } from './message-type.enum';

export interface IMessage {
  readonly _id: string;
  readonly type: MessageType;
  readonly content: string;
  readonly event?: string;
  readonly createdAt: number;
}
