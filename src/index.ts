import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult
} from "lit-element";

@customElement("overlay-image-input")
class OverlayImageInput extends LitElement {
  @property()
  name = "world";

  render(): TemplateResult {
    return html`
      <p>hello ${this.name}</p>
    `;
  }
}

export default OverlayImageInput;
