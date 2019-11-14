export interface IEnvironment {
  readonly production: boolean;
  readonly queueSize: number;
  readonly maxDbSizeMb: number;
}
