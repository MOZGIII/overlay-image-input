import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult
} from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";

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
      ></canvas>
    `;
  }

  firstUpdated() {
    const root = this.shadowRoot;
    if (!root) {
      return;
    }
    const canvas = root.getElementById("canvas") as HTMLCanvasElement | null;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    if (this.backgroundImage) {
      ctx.drawImage(this.backgroundImage, this.backgroundX, this.backgroundY);
    }
    if (this.image) {
      ctx.drawImage(this.image, this.x, this.y);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: OverlayImageInput;
  }
}

export default OverlayImageInput;

const nullAsUndefined = (value: any) => {
  if (value === null) return undefined;
  return value;
};
