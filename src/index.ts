import { LitElement, html, customElement, property } from "lit-element";

@customElement("overlay-image-input")
export class OverlayImageInput extends LitElement {
  @property()
  name = "world";

  render() {
    return html`
      <p>hello ${this.name}</p>
    `;
  }
}
