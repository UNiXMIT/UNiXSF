function ansibleSemaphore() {
    let observer = new MutationObserver(mutations => {
        for (const elem of document.querySelectorAll("label")) {
          if (elem.textContent.includes("SSO Email")) {
            elem.nextSibling.type = 'email';
          }
        }
        for (const elem of document.querySelectorAll("label")) {
          if (elem.textContent.includes("SSO Password")) {
            elem.nextSibling.type = 'password';
          }
        }
    });
    observer.observe(document, {childList: true, subtree: true});
}

window.onload = function() {
    ansibleSemaphore();
};