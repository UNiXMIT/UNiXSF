function addCopyPageLinkAction(container) {
  if (container.querySelector(".copy-page-link-btn")) return;

  const h1 = document.querySelector(".zDocsTopicPageHead h1");
  if (!h1) return;

  const btn = document.createElement("span");
  btn.className = "copy-page-link-btn d-none d-lg-flex";
  btn.setAttribute("role", "button");
  btn.setAttribute("tabindex", "0");
  btn.setAttribute("aria-label", "Copy Link");
  btn.setAttribute("data-tooltip-id", "zDocsTopicActionsTooltip");
  btn.setAttribute("data-tooltip-content", "Copy Link");

  btn.style.cssText = `
    cursor: pointer;
    display: flex;
    align-items: center;
  `;

  btn.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      style="width: 22px; height: 22px; margin: 0 8px; fill: currentColor"
      aria-hidden="true"
    >
      <path d="M6.16934 6.30897C8.24667 4.23034 11.6145 4.23034 13.6918 6.30897C15.7694 8.38785 15.7694 11.7586 13.6918 13.8375L12.2612 15.2689C11.9684 15.5619 11.9686 16.0368 12.2616 16.3296C12.5545 16.6224 13.0294 16.6222 13.3222 16.3292L14.7528 14.8978C17.4157 12.2332 17.4157 7.91323 14.7528 5.24864C12.0896 2.58379 7.77154 2.58379 5.10835 5.24864L2.2472 8.11157C-0.415733 10.7762 -0.415733 15.0961 2.2472 17.7607C3.48184 18.9961 5.07401 19.6593 6.69015 19.7488C7.10372 19.7718 7.45758 19.4551 7.48051 19.0415C7.50343 18.6279 7.18674 18.2741 6.77316 18.2512C5.51156 18.1812 4.27192 17.6647 3.30819 16.7004C1.2306 14.6215 1.2306 11.2508 3.30819 9.1719L6.16934 6.30897Z"></path>
      <path d="M17.3099 4.25115C16.8963 4.22822 16.5424 4.54491 16.5195 4.95849C16.4966 5.37207 16.8133 5.72593 17.2268 5.74885C18.4884 5.81878 19.7281 6.33528 20.6918 7.29961C22.7694 9.37849 22.7694 12.7492 20.6918 14.8281L17.8307 17.691C15.7533 19.7697 12.3855 19.7697 10.3082 17.691C8.2306 15.6122 8.2306 12.2414 10.3082 10.1626L11.7388 8.73108C12.0316 8.4381 12.0314 7.96322 11.7384 7.67042C11.4454 7.37762 10.9706 7.37777 10.6778 7.67075L9.2472 9.10222C6.58427 11.7668 6.58427 16.0868 9.2472 18.7514C11.9104 21.4162 16.2285 21.4162 18.8916 18.7514L21.7528 15.8884C24.4157 13.2238 24.4157 8.90387 21.7528 6.23928C20.5182 5.00387 18.926 4.34073 17.3099 4.25115Z"></path>
    </svg>
  `;

  btn.onmouseover = () => {
    btn.style.backgroundColor = "#f4f4f4";
    btn.querySelector("svg").style.fill = "#909";
  };
  btn.onmouseout = () => {
    btn.style.backgroundColor = "transparent";
    btn.querySelector("svg").style.fill = "#000";
  };

  const copy = async () => {
    const title = h1.textContent.replace(/\s+/g, " ").trim();
    const url = window.location.href;

    try {
      if ("ClipboardItem" in window) {
        const item = new ClipboardItem({
          "text/plain": new Blob(
            [`${title} – ${url}`],
            { type: "text/plain" }
          ),
          "text/html": new Blob(
            [`<a href="${url}">${title}</a>`],
            { type: "text/html" }
          ),
        });

        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(`${title} – ${url}`);
      }

      btn.setAttribute("data-tooltip-content", "Copied!");
      setTimeout(
        () => btn.setAttribute("data-tooltip-content", "Copy Link"),
        1200
      );
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  btn.onclick = copy;
  btn.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copy();
    }
  };

  const share = container.querySelector(".zDocsTopicShare");
  share ? share.before(btn) : container.appendChild(btn);
}

function addCopyBreadcrumbsButtonInMenu(container) {
  if (container.querySelector(".copy-breadcrumbs-btn")) return;

  const btn = document.createElement("span");
  btn.className = "copy-breadcrumbs-btn d-none d-lg-flex";
  btn.setAttribute("role", "button");
  btn.setAttribute("tabindex", "0");
  btn.setAttribute("aria-label", "Copy Breadcrumbs");
  btn.setAttribute("data-tooltip-id", "zDocsTopicActionsTooltip");
  btn.setAttribute("data-tooltip-content", "Copy Breadcrumbs");

  btn.style.cssText = `
    cursor: pointer;
    display: flex;
    align-items: center;
  `;

  btn.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      width="22"
      height="22"
      style="width: 22px; height: 22px; margin: 0 8px; fill: currentColor;"
      aria-hidden="true"
    >
      <path d="M8.4,42c-0.6,0-1-0.4-1-1V10.9c0-0.6,0.4-1,1-1h8.1c0.4,0,0.9,0.2,1.2,0.5L29.3,25c0.4,0.5,0.4,1.3,0,1.9 L17.6,41.5c-0.3,0.4-0.8,0.6-1.3,0.6L8.4,42z"></path>
      <path d="M44.3,25L32.6,10.5c-0.5-0.6-1.4-0.8-2.1-0.2l-2.3,1.9c-0.7,0.5-0.8,1.5-0.2,2.1L37.5,26L28,37.8 c-0.5,0.6-0.4,1.6,0.2,2.1l2.3,1.9c0.7,0.5,1.5,0.4,2.1-0.2L44.3,27C44.7,26.2,44.7,25.5,44.3,25z"></path>
    </svg>
  `;

  btn.onmouseover = () => {
    btn.style.backgroundColor = "#f4f4f4";
    btn.querySelector("svg").style.fill = "#909";
  };
  btn.onmouseout = () => {
    btn.style.backgroundColor = "transparent";
    btn.querySelector("svg").style.fill = "#000";
  };

  const copyCrumbs = () => {
    const crumbs = [];

    document.querySelectorAll('[aria-label="Breadcrumbs"] a').forEach(a => {
      if (a.classList.contains("zDocsBreadcrumbsExpandToggle")) return;
      const text = a.textContent.replace(/\s+/g, " ").trim();
      if (text && text !== "...") crumbs.push(text);
    });

    const last = document.querySelector(".zDocsBreadcrumbsLastItemNotSubHeader");
    if (last) {
      const clone = last.cloneNode(true);
      clone.querySelectorAll(".sr-only").forEach(e => e.remove());
      crumbs.push(clone.textContent.trim());
    }

    navigator.clipboard.writeText(crumbs.join(" > "));
    btn.setAttribute("data-tooltip-content", "Copied!");
    setTimeout(() => btn.setAttribute("data-tooltip-content", "Copy Breadcrumbs"), 1200);
  };

  btn.onclick = copyCrumbs;
  btn.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copyCrumbs();
    }
  };

  const share = container.querySelector(".zDocsTopicShare");
  share ? share.before(btn) : container.appendChild(btn);
}

function addButtonsToAllActionMenus() {
  document.querySelectorAll(".zDocsTopicActions").forEach(actionsMenu => {
    addCopyPageLinkAction(actionsMenu);
    addCopyBreadcrumbsButtonInMenu(actionsMenu);
  });
}

addButtonsToAllActionMenus();

const observer = new MutationObserver(() => {
  addButtonsToAllActionMenus();
});

observer.observe(document.body, { childList: true, subtree: true });