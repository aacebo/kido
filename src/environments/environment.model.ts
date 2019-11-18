export interface IEnvironment {
  readonly production: boolean;
  readonly maxMessages: number;
  readonly maxDbSizeMb: number;
}
