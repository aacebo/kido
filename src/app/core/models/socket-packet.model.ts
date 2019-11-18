export interface ISocketPacket {
  readonly id?: any;
  readonly type: number;
  readonly nsp: string;
  readonly data: any[];
}
