export default class SingleTouchMovementTracker {
  lastPosition: { x: number; y: number } | undefined;

  constructor(public readonly onMove: (dx: number, dy: number) => void) {}

  public register = (elem: HTMLElement) => {
    elem.addEventListener("touchstart", this.initPosition);
    elem.addEventListener("touchend", this.initPosition);
    elem.addEventListener("touchmove", this.handleTouchMove);
  };

  public unregister = (elem: HTMLElement) => {
    elem.removeEventListener("touchmove", this.handleTouchMove);
    elem.removeEventListener("touchend", this.initPosition);
    elem.removeEventListener("touchstart", this.initPosition);
  };

  initPosition = (ev: TouchEvent) => {
    // Assign the position if there is any or reset it if there's none.
    this.lastPosition = singlePositionFromEvent(ev);
  };

  handleTouchMove = (ev: TouchEvent) => {
    const newPosition = singlePositionFromEvent(ev);

    // If there's no new position or no last position the dalta is undefined,
    // so we don't generate the move event.
    if (!newPosition || !this.lastPosition) {
      return;
    }

    // Compute deltas.
    const dx = newPosition.x - this.lastPosition.x;
    const dy = newPosition.y - this.lastPosition.y;

    // Preserve the position for subsequent move events.
    this.lastPosition = newPosition;

    // Trigger move event.
    this.onMove(dx, dy);
  };
}

const singlePositionFromEvent = (ev: TouchEvent) => {
  // If there's more than one touch the position is undefined.
  if (ev.touches.length !== 1) {
    return;
  }

  const touch = ev.touches.item(0);
  if (touch === null) {
    throw new Error("Unexpected null touch");
  }

  // Use clientX and clientY values as the position.
  return { x: touch.clientX, y: touch.clientY };
};
