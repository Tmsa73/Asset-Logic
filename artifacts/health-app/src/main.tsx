import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root")!;
createRoot(rootEl).render(<App />);

const hideSplash = () => {
  const splash = document.getElementById("app-splash");
  if (!splash) return;
  splash.classList.add("hide");
  splash.addEventListener("transitionend", () => splash.remove(), { once: true });
  setTimeout(() => splash.remove(), 600);
};

if (rootEl.childElementCount > 0) {
  requestAnimationFrame(hideSplash);
} else {
  const observer = new MutationObserver(() => {
    if (rootEl.childElementCount > 0) {
      observer.disconnect();
      requestAnimationFrame(hideSplash);
    }
  });
  observer.observe(rootEl, { childList: true });
  setTimeout(() => { observer.disconnect(); hideSplash(); }, 2500);
}
