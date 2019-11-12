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
  @property()
  name = "world";

  render(): TemplateResult {
    return html`
      <p>hello ${this.name}</p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [tag]: OverlayImageInput;
  }
}

export default OverlayImageInput;
