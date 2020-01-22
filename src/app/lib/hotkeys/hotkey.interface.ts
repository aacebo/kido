export interface IHotkey {
  readonly comb: string;
  readonly keys: string[];
  readonly description: string;
  readonly ctx: string;
  readonly cb: () => void;
  disabled?: boolean;
}
