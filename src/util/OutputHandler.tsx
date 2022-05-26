import { toast } from 'react-toastify';

export type OutputEntry = {
  text: string;
  timestamp: Date;
};

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

  public toString(): string {
    return this._outputs.map((entry) => `${entry.timestamp.toLocaleTimeString()} - ${entry.text}`).join('\n');
  }

  public get outputs(): OutputEntry[] {
    return this._outputs;
  }

  public isEmpty(): boolean {
    return this._outputs.length === 0;
  }
}
