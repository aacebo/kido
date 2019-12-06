export interface IEnvironment {
  readonly production: boolean;
  readonly maxMessages: number;
  readonly maxLogs: number;
  readonly maxDbSizeMb: number;
  readonly activeStreamKey: string;
}
