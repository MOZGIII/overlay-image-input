import SingleTouchMovementTracker from "./touch";

interface ImageSpec {
  image: CanvasImageSource;
  dx: number;
  dy: number;
}

interface Shift {
  x: number;
  y: number;
}

export default class Engine {
  render: CanvasRenderingContext2D;
  touchMovementTracker: SingleTouchMovementTracker;

  constructor(
    public readonly canvas: HTMLCanvasElement,
    public readonly background: ImageSpec,
    public readonly overlay: ImageSpec,
    public shift: Shift,
    public onChange?: (shift: Shift) => void
  ) {
    this.render = mustGetContext(canvas);

    this.touchMovementTracker = new SingleTouchMovementTracker(
      this.updateShift
    );

    this.registerListeners();
  }

  public drop = () => {
    this.unregisterListeners();
  };

  public update = () => {
    // TODO: redraw only if needed
    this.redraw();
  };

  redraw = () => {
    // TODO: optimize redrawing via off-screen canvas or layered canvases.

    this.render.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.render.drawImage(
      this.background.image,
      this.background.dx,
      this.background.dy
    );

    this.render.drawImage(
      this.overlay.image,
      this.overlay.dx + this.shift.x,
      this.overlay.dy + this.shift.y
    );
  };

  updateShift = (dx: number, dy: number) => {
    const { x, y } = this.shift;
    this.shift = { x: x + dx, y: y + dy };

    this.redraw();

    if (this.onChange) {
      this.onChange(this.shift);
    }
  };

  handleMouseMove = (ev: MouseEvent) => {
    ev.preventDefault();

    if (ev.movementX === 0 && ev.movementY === 0) {
      // No movement occured, noop.
      return;
    }

    if ((ev.buttons & 1) !== 1) {
      // Mouse is not pressed, skip.
      return;
    }

    this.updateShift(ev.movementX, ev.movementY);
  };

  registerListeners = () => {
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.touchMovementTracker.register(this.canvas);
  };

  unregisterListeners = () => {
    this.touchMovementTracker.unregister(this.canvas);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
  };
}

const mustGetContext = (canvas: HTMLCanvasElement) => {
  const render = canvas.getContext("2d");
  if (!render) {
    throw new Error("Unable to obtain 2d context for canvas");
  }
  return render;
};
