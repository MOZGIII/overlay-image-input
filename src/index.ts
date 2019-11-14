import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult
} from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import Engine from "./engine";

const tag = "overlay-image-input";

@customElement(tag)
class OverlayImageInput extends LitElement {
  @property({ type: Number })
  width: number | null | undefined;

  @property({ type: Number })
  height: number | null | undefined;

  @property({ attribute: false })
  backgroundImage: CanvasImageSource | undefined;

  @property({ type: Number, attribute: "bgx" })
  backgroundX = 0;

  @property({ type: Number, attribute: "bgy" })
  backgroundY = 0;

  @property({ attribute: false })
  image: CanvasImageSource | undefined;

  @property({ type: Number, reflect: true })
  x = 0;

  @property({ type: Number, reflect: true })
  y = 0;

  render(): TemplateResult {
    return html`
      <canvas
        id="canvas"
        width=${ifDefined(nullAsUndefined(this.width))}
        height=${ifDefined(nullAsUndefined(this.height))}
        style="touch-action: none;"
      ></canvas>
    `;
  }

  buildEngine = () => {
    const root = this.shadowRoot;
    if (!root) {
      return;
    }
    const canvas = root.getElementById("canvas") as HTMLCanvasElement | null;
    if (!canvas) {
      return;
    }

    if (!this.backgroundImage || !this.image) {
      return;
    }

    return new Engine(
      canvas,
      {
        image: this.backgroundImage,
        dx: this.backgroundX,
        dy: this.backgroundY
      },
      {
        image: this.image,
        dx: this.x,
        dy: this.y
      },
      { x: 0, y: 0 },
      ({ x, y }) => {
        this.x = x;
        this.y = y;
      }
    );
  };

  engine: Engine | undefined;

  updated() {
    if (!this.engine) {
      this.engine = this.buildEngine();

      if (!this.engine) {
        return;
      }
    }

    this.engine.redraw();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: OverlayImageInput;
  }
}

export default OverlayImageInput;

const nullAsUndefined = <T>(value: T): T extends null ? undefined : T =>
  value === null ? undefined : (value as any);
