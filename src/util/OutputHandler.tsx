import { OutputEntry } from '../types';

export class OutputHandler {
  private _outputs: OutputEntry[];
  private _handle: (value: any, variable: string) => OutputEntry;

  constructor(handle: (value: any, variable: string) => OutputEntry) {
    this._handle = handle;
    this._outputs = [];
  }

  public clear(): void {
    this._outputs = [];
  }

  public add(value: any, variable: string): void {
    const entry = this._handle(value, variable);
    this.outputs.push(entry);
  }

  public isEmpty(): boolean {
    return this._outputs.length === 0;
  }

  /* --------------------------------- Getters -------------------------------- */

  public get outputs(): OutputEntry[] {
    return this._outputs;
  }

  public set handle(handle: (value: any, variable: string) => OutputEntry) {
    this._handle = handle;
  }
}
