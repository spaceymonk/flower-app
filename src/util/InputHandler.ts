import { throwErrorIfNull } from '.';

export class InputHandler {
  private _index: number;
  private _inputParams: string[];
  private _fetcher: ((name: string) => Promise<string | null>) | undefined;

  constructor(inputParams?: string, fetcher?: () => Promise<string | null>) {
    this._index = 0;
    this._inputParams = inputParams ? inputParams.split('\n') : [];
    this._fetcher = fetcher;
  }

  public hasNext(): boolean {
    return this._index < this._inputParams.length;
  }

  public async next(name: string): Promise<string> {
    if (!this.hasNext()) {
      if (this._fetcher === undefined) {
        throw new Error(`No input on line ${this._index + 1}!`);
      }
      const newParam = throwErrorIfNull(await this._fetcher(name), 'No input parameter supplied!');
      this._inputParams.push(newParam);
    }
    const result = this._inputParams[this._index];
    this._index++;
    return result;
  }

  public reset(inputParam?: string): void {
    this._index = 0;
    if (inputParam) {
      this._inputParams = inputParam.split('\n');
    }
  }

  /* --------------------------------- Getters -------------------------------- */

  public get inputParams(): string {
    return this._inputParams.join('\n');
  }

  public get index(): number {
    return this._index;
  }

  public set fetcher(fetcher: (name: string) => Promise<string | null>) {
    this._fetcher = fetcher;
  }
}
