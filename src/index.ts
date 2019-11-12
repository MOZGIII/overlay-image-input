import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult
} from "lit-element";

const tag = "overlay-image-input";

@customElement(tag)
class OverlayImageInput extends LitElement {
  @property({ attribute: false })
  backgroundImage?: CanvasImageSource = undefined;

  @property({ type: Number, attribute: "bgx" })
  backgroundX = 0;

  @property({ type: Number, attribute: "bgy" })
  backgroundY = 0;

  @property({ attribute: false })
  image?: CanvasImageSource = undefined;

  @property({ type: Number })
  x = 0;

  @property({ type: Number })
  y = 0;

  render(): TemplateResult {
    return html`
      <canvas id="canvas"></canvas>
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
