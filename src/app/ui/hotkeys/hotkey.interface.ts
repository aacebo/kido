export interface IHotkey {
  readonly keys: string;
  readonly cb: () => void;
}
