function addCopyButton(container) {
  if (container.querySelector(".copy-breadcrumbs-btn")) return;

  const btn = document.createElement("button");
  btn.textContent = "Copy Breadcrumbs";
  btn.className = "copy-breadcrumbs-btn";
  btn.style.marginLeft = "8px";
  btn.style.transition = "color 0.3s, background 0.3s";
  btn.style.cssText = `
  margin-left: 8px;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #0d0d0d;
  border: 1px solid #0d0d0d;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  font: 500 14px/17px Noto Sans,serif;
  padding: 5px 5px;
`;

  btn.onmouseover = () => {
    btn.style.background = "#fff";
    btn.style.color = "#0d0d0d";
  };
  btn.onmouseout = () => {
    btn.style.background = "#0d0d0d";
    btn.style.color = "#fff";
  };

  btn.onclick = () => {
    const crumbs = [];

    container.querySelectorAll("a").forEach((a) => {
      if (a.classList.contains("zDocsBreadcrumbsExpandToggle")) return;
      const text = a.textContent.replace(/\s+/g, " ").trim();
      if (text && text !== "...") crumbs.push(text);
    });

    const last = container.querySelector(
      ".zDocsBreadcrumbsLastItemNotSubHeader",
    );
    if (last) {
      const clone = last.cloneNode(true);
      clone.querySelectorAll(".sr-only").forEach((e) => e.remove());
      crumbs.push(clone.textContent.trim());
    }

    navigator.clipboard.writeText(crumbs.join(" > "));
    btn.innerHTML = "✅ Copied!";
    setTimeout(() => (btn.innerHTML = "Copy Breadcrumbs"), 1200);
  };

  container.appendChild(btn);
}

let observer = new MutationObserver((mutations) => {
  let breadcrumbs = document.querySelector('[aria-label="Breadcrumbs"]');
  if (breadcrumbs) {
    addCopyButton(breadcrumbs);
  }
});
observer.observe(document.body, { childList: true, subtree: true });