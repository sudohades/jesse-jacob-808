// Central app bootstrap to coordinate all UI modules
import { initHeaderShrink } from './js/modules/headerShrink.js';
import { initHamburger } from './js/modules/navHamburger.js';
import { initThemeSelector } from './js/modules/theme.js';
import { initScrollIndicator } from './js/modules/scrollIndicator.js';
import { initCircuitCanvas } from './js/modules/circuit.js';
import { highlightCurrentPageLink } from './js/modules/router.js';
import { animateLogo } from './js/modules/logoAnim.js';
import { initializeSkillBars } from './js/modules/skills.js';

function safeInit(fn, name) {
  try {
    if (typeof fn === 'function') fn();
  } catch (err) {
    console.error(`[main] Failed to init ${name}:`, err);
  }
}

function boot() {
  safeInit(initHeaderShrink, 'headerShrink');
  safeInit(initHamburger, 'hamburger');
  safeInit(initThemeSelector, 'themeSelector');
  safeInit(initScrollIndicator, 'scrollIndicator');
  safeInit(initCircuitCanvas, 'circuitCanvas');
  safeInit(highlightCurrentPageLink, 'routerHighlight');
  safeInit(animateLogo, 'logoAnim');
  if (document.querySelector('.skill-bar-container')) {
    safeInit(initializeSkillBars, 'skills');
  }
}

document.addEventListener('DOMContentLoaded', boot);
