import { ReactFlowInstance } from 'react-flow-renderer';
import { Point2D } from '../types';
import { ICanvas } from '../types/ICanvas';

class CanvasAdapter implements ICanvas {
  private _logic: ReactFlowInstance;
  constructor(logic: ReactFlowInstance) {
    this._logic = logic;
  }
  getViewport(): { x: number; y: number; zoom: number } {
    return this._logic.getViewport();
  }
  fitView(): void {
    this._logic.fitView();
  }
  setCenter(position: Point2D, zoom: number): void {
    this._logic.setCenter(position.x, position.y, { zoom });
  }
}

export default CanvasAdapter;
