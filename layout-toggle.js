(function () {
  // Initialize after DOM is ready to avoid missing elements if the script is loaded early
  function init() {
    // inject CSS
    const css = `
    :root {
      --collapsed-width: 40px;
    }

    /* ensure panels can position absolute children */
    .controls, .layer-panel {
      position: relative;
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

    const existing = document.querySelector('style[data-generated-by="layout-toggle.js"]');
    if (!existing) {
      const style = document.createElement('style');
      style.setAttribute('data-generated-by', 'layout-toggle.js');
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }

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
      // options: { name: 'left'|'middle', tabLabel: '文字', containerClass: 'left-collapsed' }
      if (!panel) return null;
      const inner = wrapPanelInner(panel);

      // create collapse button (visible in expanded state)
      const collapseBtn = document.createElement('button');
      collapseBtn.className = 'collapse-btn';
      collapseBtn.type = 'button';
      collapseBtn.title = options.title || '收起';
      collapseBtn.innerHTML = options.btnHTML || '收起';
      panel.appendChild(collapseBtn);

      // create floating tab appended to body so it's always positioned correctly
      const tab = document.createElement('button');
      tab.className = `panel-tab ${options.name}`;
      tab.type = 'button';
      tab.innerText = options.tabLabel || '展开';
      tab.setAttribute('aria-hidden', 'true'); // hidden by default
      document.body.appendChild(tab);

      // toggle collapse
      function setCollapsed(collapsed) {
        if (collapsed) {
          panel.classList.add('collapsed');
          container.classList.add(options.containerClass);
          tab.style.display = 'inline-flex';
          tab.setAttribute('aria-hidden', 'false');
        } else {
          panel.classList.remove('collapsed');
          container.classList.remove(options.containerClass);
          tab.style.display = 'none';
          tab.setAttribute('aria-hidden', 'true');
        }
      }

      // initialize tab visibility based on current panel state
      setCollapsed(panel.classList.contains('collapsed'));

      collapseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isCollapsed = panel.classList.contains('collapsed');
        setCollapsed(!isCollapsed);
        // dispatch resize so consumers can recalc sizes (e.g. canvas)
        window.dispatchEvent(new Event('resize'));
      });

      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        setCollapsed(false);
        // focus first focusable element inside panel when expanded
        setTimeout(() => {
          const firstFocusable = panel.querySelector('input, button, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (firstFocusable) firstFocusable.focus();
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();