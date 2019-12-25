export interface IHotkey {
  readonly keys: string;
  readonly description: string;
  readonly cb: () => void;
}
