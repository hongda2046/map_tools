contents=
/*
layout-toggle.js
Adds collapse/expand (tab) behavior for the left (.controls) and middle (.layer-panel) columns
without editing the large existing index.html. This script injects the necessary CSS and
wraps each panel's existing children into a .panel-inner so we can hide/show content when collapsed.

Usage:
1. Place this file in the same folder as index.html.
2. Add the following line near the end of index.html (after other scripts such as map-resources.js
   and after the main script that builds the page UI), for example right before </body>:

   <script src="layout-toggle.js"></script>

This script keeps the default state expanded. Clicking the collapse button in each panel will
collapse it into a slim tab attached to the left side of the viewport. Clicking the tab expands it back.
*/

(function () {
  // inject CSS
  const css = `
  :root {
    --collapsed-width: 40px;
  }

  /* container states */
  .container.left-collapsed {
    grid-template-columns: var(--collapsed-width) var(--new-control-width) 1fr !important;
  }
  .container.middle-collapsed {
    grid-template-columns: var(--new-control-width) var(--collapsed-width) 1fr !important;
  }
  .container.left-collapsed.middle-collapsed,
  .container.middle-collapsed.left-collapsed {
    grid-template-columns: var(--collapsed-width) var(--collapsed-width) 1fr !important;
  }

  /* panel inner wrap to hide/show contents */
  .controls .panel-inner,
  .layer-panel .panel-inner {
    display: block;
  }
  .controls.collapsed .panel-inner,
  .layer-panel.collapsed .panel-inner {
    display: none;
  }

  /* keep panel container visual but small when collapsed */
  .controls.collapsed,
  .layer-panel.collapsed {
    padding: 6px;
    min-width: var(--collapsed-width);
    max-width: var(--collapsed-width);
    overflow: visible;
    position: relative;
  }

  /* collapse button inside panel (visible when expanded) */
  .controls .collapse-btn,
  .layer-panel .collapse-btn {
    position: absolute;
    right: 8px;
    top: 8px;
    background: #f1f1f1;
    color: #333;
    border: 1px solid rgba(0,0,0,0.08);
    padding: 4px 6px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    z-index: 20;
  }

  .controls .collapse-btn:hover,
  .layer-panel .collapse-btn:hover {
    background: #e8e8e8;
  }

  /* visible tab when collapsed - positioned fixed so it stays attached to left edge */
  .panel-tab {
    display: none;
    position: fixed;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    transform-origin: center;
    background: #007bff;
    color: #fff;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-size: 13px;
    white-space: nowrap;
  }

  /* left tab (for the leftmost panel) */
  .panel-tab.left {
    left: 6px;
  }

  /* middle tab sits to the right of the left tab */
  .panel-tab.middle {
    left: calc(var(--collapsed-width) + 12px);
  }

  /* show tab when panel has collapsed class */
  .controls.collapsed + .panel-tab.left,
  .layer-panel.collapsed + .panel-tab.middle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* improved small-screen behavior: tabs keep inside viewport */
  @media (max-width: 600px) {
    .panel-tab.left {
      left: 4px;
      padding: 5px 8px;
      font-size: 12px;
    }
    .panel-tab.middle {
      left: calc(var(--collapsed-width) + 8px);
    }
  }
  `;

  const style = document.createElement('style');
  style.setAttribute('data-generated-by', 'layout-toggle.js');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  // helper to wrap panel children into .panel-inner
  function wrapPanelInner(panel) {
    if (!panel) return null;
    // don't double-wrap
    if (panel.querySelector(':scope > .panel-inner')) return panel.querySelector(':scope > .panel-inner');

    const inner = document.createElement('div');
    inner.className = 'panel-inner';
    // move all children into inner
    while (panel.firstChild) {
      inner.appendChild(panel.firstChild);
    }
    panel.appendChild(inner);
    return inner;
  }

  // create collapse button and a floating tab for a panel
  function createCollapseUI(panel, options) {
    // options: { name: 'left'|'middle', label: '文字', tabLabel: '展开', containerClass: 'left-collapsed' }
    const inner = wrapPanelInner(panel);

    // create collapse button (visible in expanded state)
    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'collapse-btn';
    collapseBtn.type = 'button';
    collapseBtn.title = options.title || '收起';
    collapseBtn.innerHTML = options.btnHTML || '收起';
    panel.appendChild(collapseBtn);

    // create floating tab (fixed to left) that appears when collapsed
    const tab = document.createElement('button');
    tab.className = `panel-tab ${options.name}`;
    tab.type = 'button';
    tab.innerText = options.tabLabel || '展开';
    // place the tab immediately after the panel node in DOM so CSS sibling selector works
    panel.parentNode.insertBefore(tab, panel.nextSibling);

    // toggle collapse
    function setCollapsed(collapsed) {
      if (collapsed) {
        panel.classList.add('collapsed');
        document.querySelector('.container').classList.add(options.containerClass);
      } else {
        panel.classList.remove('collapsed');
        document.querySelector('.container').classList.remove(options.containerClass);
      }
    }

    collapseBtn.addEventListener('click', () => {
      const isCollapsed = panel.classList.contains('collapsed');
      setCollapsed(!isCollapsed);
    });

    tab.addEventListener('click', () => {
      setCollapsed(false);
      // focus first focusable element inside panel when expanded
      setTimeout(() => {
        const firstFocusable = panel.querySelector('input, button, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
        // after expanding, ensure the canvas is updated if MapTools uses size calculations on resize
        // dispatch resize event for consumers to adjust
        window.dispatchEvent(new Event('resize'));
      }, 50);
    });

    return { collapseBtn, tab, setCollapsed };
  }

  // find panels
  const leftPanel = document.querySelector('.controls');
  const middlePanel = document.querySelector('.layer-panel');
  const container = document.querySelector('.container');

  if (!container || !leftPanel || !middlePanel) {
    // nothing to do if structure differs
    console.warn('layout-toggle.js: expected .container, .controls and .layer-panel elements not found.');
    return;
  }

  // Create UI for left and middle panels
  createCollapseUI(leftPanel, {
    name: 'left',
    btnHTML: '收起',
    tabLabel: '左侧面板',
    containerClass: 'left-collapsed',
    title: '收起左侧面板'
  });

  createCollapseUI(middlePanel, {
    name: 'middle',
    btnHTML: '收起',
    tabLabel: '圈层/资源',
    containerClass: 'middle-collapsed',
    title: '收起中间面板'
  });

  // Accessibility: allow toggling with keyboard when focusing the collapse buttons or tabs
  // (handled by native button behavior)
})();