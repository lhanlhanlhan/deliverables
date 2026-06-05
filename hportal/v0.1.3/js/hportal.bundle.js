/* HPortal JS Bundle — v0.1.3 — 2026-03-22 */

/* ============================================================
 * HPortal Component: Tabs (JS)
 *
 * Progressive enhancement for tabbed content.
 * Works with .hp-tabs markup. Without JS, all panels remain
 * visible as stacked content.
 *
 * No dependencies (vanilla JS).
 * ============================================================ */

(function () {
  "use strict";

  /**
   * Initialise a single Tabs component.
   * @param {HTMLElement} tabsEl - The .hp-tabs root element.
   */
  function initTabs(tabsEl) {
    var tabLinks = tabsEl.querySelectorAll(".hp-tabs__tab");
    var panels = tabsEl.querySelectorAll(".hp-tabs__panel");

    if (!tabLinks.length || !panels.length) return;

    // Add ARIA attributes
    var tabList = tabsEl.querySelector(".hp-tabs__list");
    if (tabList) tabList.setAttribute("role", "tablist");

    // Set up each tab
    for (var i = 0; i < tabLinks.length; i++) {
      var tab = tabLinks[i];
      var panelId = tab.getAttribute("href");
      if (!panelId || panelId.charAt(0) !== "#") continue;

      var panel = tabsEl.querySelector(panelId);
      if (!panel) continue;

      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", panelId.substring(1));
      tab.parentNode.setAttribute("role", "presentation");
      panel.setAttribute("role", "tabpanel");

      // Hide all panels except the first
      if (i === 0) {
        selectTab(tab, panel, tabLinks, panels);
      } else {
        tab.setAttribute("aria-selected", "false");
        tab.setAttribute("tabindex", "-1");
        panel.classList.add("hp-tabs__panel--hidden");
      }

      // Click handler
      tab.addEventListener("click", createClickHandler(tab, tabLinks, panels, tabsEl));

      // Keyboard navigation
      tab.addEventListener("keydown", createKeyHandler(tabLinks, panels, tabsEl));
    }
  }

  function createClickHandler(tab, tabLinks, panels, tabsEl) {
    return function (e) {
      e.preventDefault();
      var panelId = tab.getAttribute("href");
      if (!panelId) return;
      var panel = tabsEl.querySelector(panelId);
      if (panel) selectTab(tab, panel, tabLinks, panels);
    };
  }

  function createKeyHandler(tabLinks, panels, tabsEl) {
    return function (e) {
      var key = e.keyCode;
      var LEFT = 37, RIGHT = 39;
      if (key !== LEFT && key !== RIGHT) return;

      var currentIndex = -1;
      for (var i = 0; i < tabLinks.length; i++) {
        if (tabLinks[i] === e.target) { currentIndex = i; break; }
      }
      if (currentIndex === -1) return;

      var nextIndex;
      if (key === RIGHT) {
        nextIndex = (currentIndex + 1) % tabLinks.length;
      } else {
        nextIndex = (currentIndex - 1 + tabLinks.length) % tabLinks.length;
      }

      tabLinks[nextIndex].focus();
      tabLinks[nextIndex].click();
    };
  }

  function selectTab(tab, panel, allTabs, allPanels) {
    // Deselect all
    for (var i = 0; i < allTabs.length; i++) {
      allTabs[i].setAttribute("aria-selected", "false");
      allTabs[i].setAttribute("tabindex", "-1");
      allTabs[i].parentNode.classList.remove("hp-tabs__item--selected");
    }
    for (var j = 0; j < allPanels.length; j++) {
      allPanels[j].classList.add("hp-tabs__panel--hidden");
    }

    // Select the target
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    tab.parentNode.classList.add("hp-tabs__item--selected");
    panel.classList.remove("hp-tabs__panel--hidden");
  }

  // Auto-init on DOM ready
  function init() {
    var tabsEls = document.querySelectorAll(".hp-tabs");
    for (var i = 0; i < tabsEls.length; i++) {
      initTabs(tabsEls[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


/* ============================================================
 * HPortal Component: Details Polyfill (JS)
 *
 * Polyfill for the <details> element in browsers that do
 * not support it natively (e.g., IE11).
 *
 * No dependencies (vanilla JS).
 * ============================================================ */

(function () {
  "use strict";

  // Check native support
  var testEl = document.createElement("details");
  if (typeof testEl.open === "boolean") return; // Natively supported

  function initDetails(el) {
    var summary = el.querySelector(".hp-details__summary");
    if (!summary) return;

    summary.setAttribute("role", "button");
    summary.setAttribute("tabindex", "0");
    summary.setAttribute("aria-expanded", el.hasAttribute("open") ? "true" : "false");

    var textEl = el.querySelector(".hp-details__text");
    if (textEl && !el.hasAttribute("open")) {
      textEl.style.display = "none";
    }

    summary.addEventListener("click", function (e) {
      e.preventDefault();
      toggle(el, summary, textEl);
    });

    summary.addEventListener("keydown", function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        toggle(el, summary, textEl);
      }
    });
  }

  function toggle(el, summary, textEl) {
    var isOpen = el.hasAttribute("open");
    if (isOpen) {
      el.removeAttribute("open");
      if (textEl) textEl.style.display = "none";
      summary.setAttribute("aria-expanded", "false");
    } else {
      el.setAttribute("open", "");
      if (textEl) textEl.style.display = "";
      summary.setAttribute("aria-expanded", "true");
    }
  }

  function init() {
    var elements = document.querySelectorAll(".hp-details");
    for (var i = 0; i < elements.length; i++) {
      initDetails(elements[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


/* ============================================================
 * HPortal Component: Header Mobile Menu (JS)
 *
 * Toggle mobile navigation in the header.
 * No dependencies (vanilla JS).
 * ============================================================ */

(function () {
  "use strict";

  function init() {
    var toggleBtns = document.querySelectorAll(".hp-hdr__menu-btn");
    for (var i = 0; i < toggleBtns.length; i++) {
      toggleBtns[i].addEventListener("click", function () {
        var header = this.closest(".hp-hdr");
        if (!header) return;
        var nav = header.querySelector(".hp-hdr__nav");
        if (!nav) return;
        var isOpen = nav.classList.contains("hp-hdr__nav--open");
        nav.classList.toggle("hp-hdr__nav--open");
        this.setAttribute("aria-expanded", isOpen ? "false" : "true");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


