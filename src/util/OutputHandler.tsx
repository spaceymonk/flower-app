import { toast } from 'react-toastify';
import { OutputEntry } from '../types';

export class OutputHandler {
  private _outputs: OutputEntry[];

  constructor() {
    this._outputs = [];
  }

  public clear(): void {
    this._outputs = [];
  }

  public add(text: string): void {
    this._outputs.push({
      text,
      timestamp: new Date(),
    });
    toast.info(text);
  }
  
  public isEmpty(): boolean {
    return this._outputs.length === 0;
  }

  /* --------------------------------- Getters -------------------------------- */

  public get outputs(): OutputEntry[] {
    return this._outputs;
  }
}
