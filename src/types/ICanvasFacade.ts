import { Point2D } from '.';

export interface ICanvasFacade {
  fitView(): void;
  setCenter(position: Point2D, zoom: number): void;
  getViewport(): { x: number; y: number; zoom: number };
}
