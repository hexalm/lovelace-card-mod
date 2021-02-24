import { fireEvent } from "card-tools/src/event.js";
import { selectTree } from "card-tools/src/helpers";
import { applyToElement } from "../helpers";

customElements.whenDefined("hui-root").then(() => {
  const huiRoot = customElements.get("hui-root");
  if (huiRoot.prototype.cardmod_patched) return;
  huiRoot.prototype.cardmod_patched = true;

  const oldFirstUpdated = huiRoot.prototype.firstUpdated;
  huiRoot.prototype.firstUpdated = async function (changedProperties) {
    if (oldFirstUpdated) oldFirstUpdated.bind(this)(changedProperties);
    applyToElement(this, "root");
  };

  fireEvent("ll-rebuild", {});

  selectTree(
    document,
    "home-assistant$home-assistant-main$app-drawer-layout partial-panel-resolver ha-panel-lovelace$hui-root",
    false
  ).then((root: any) => {
    root?.firstUpdated();
  });
});
