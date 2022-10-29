export interface Char {
  name: string;
  hp: number;
  maxHp: number;
  resistance: boolean;
  /** cons = constitution, >0, integer */
  consSave: number;
}
