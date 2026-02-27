/**
 * EwkaSQL — Main JavaScript
 * Features: theme toggle, sticky header, reveal animations,
 * counters, smooth scroll, mobile navigation.
 */

(function () {
  "use strict";

  function getPreferredTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    var normalized = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", normalized);

    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      var isDark = normalized === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("title", isDark ? "Włącz tryb jasny" : "Włącz tryb ciemny");
    }
  }

  function initThemeToggle() {
    var toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    var hasManualOverride = false;

    toggle.addEventListener("click", function () {
      var currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      hasManualOverride = true;
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });

    var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", function (event) {
        if (!hasManualOverride) {
          applyTheme(event.matches ? "dark" : "light");
        }
      });
    }
  }

  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var ticking = false;

    function updateHeader() {
      header.classList.toggle("scrolled", window.scrollY > 20);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateHeader();
  }

  function initRevealAnimations() {
    var reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (element) {
        element.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    reveals.forEach(function (element) {
      observer.observe(element);
    });
  }

  function animateCounter(element) {
    var target = parseInt(element.getAttribute("data-count"), 10);
    if (Number.isNaN(target)) return;

    var duration = 1800;
    var startTime = performance.now();

    function updateCounter(now) {
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);

      element.textContent = current.toLocaleString("pl-PL");

      if (progress < 1) {
        window.requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString("pl-PL");
      }
    }

    window.requestAnimationFrame(updateCounter);
  }

  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function initMobileMenu() {
    var menuButton = document.querySelector(".mobile-menu-btn");
    var navLinks = document.querySelector(".nav-links");
    if (!menuButton || !navLinks) return;

    function closeMenu() {
      menuButton.classList.remove("active");
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }

    menuButton.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      menuButton.classList.toggle("active", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", function (event) {
      var clickedInside = navLinks.contains(event.target) || menuButton.contains(event.target);
      if (!clickedInside) {
        closeMenu();
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;

        var target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initCurrentYear() {
    var yearElement = document.getElementById("current-year");
    if (!yearElement) return;
    yearElement.textContent = String(new Date().getFullYear());
  }

  function init() {
    applyTheme(getPreferredTheme());
    initThemeToggle();
    initHeaderScroll();
    initRevealAnimations();
    initCounters();
    initMobileMenu();
    initSmoothScroll();
    initCurrentYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
