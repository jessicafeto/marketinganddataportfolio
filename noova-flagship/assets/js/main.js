(function () {
  "use strict";

  // ?capture=1 flattens the page for full-page screenshots:
  // no animations, nothing hidden, hero capped to one viewport.
  if (new URLSearchParams(window.location.search).has("capture")) {
    document.documentElement.classList.remove("js");
    document.documentElement.classList.add("capture");
    return;
  }

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var nav = document.getElementById("site-nav");
  var hero = document.getElementById("hero");

  function setNav(solid) {
    nav.classList.toggle("nav-solid", solid);
    nav.classList.toggle("nav-over-hero", !solid);
  }

  // ---- Contact form: submit to Formspree ----
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var note = document.getElementById("form-note");
      var btn = form.querySelector('button[type="submit"]');
      var say = function (msg) {
        if (note) {
          note.hidden = false;
          note.textContent = msg;
        }
      };
      say("Sending…");
      if (btn) btn.disabled = true;
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            say("Thank you. We'll be in touch within 48 hours.");
          } else {
            say("Something went wrong. Please email hello@noovadata.com instead.");
          }
        })
        .catch(function () {
          say("Something went wrong. Please email hello@noovadata.com instead.");
        })
        .finally(function () {
          if (btn) btn.disabled = false;
        });
    });
  }

  // Without GSAP (offline / blocked CDN) nothing may stay hidden.
  if (!window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.remove("js");
    var onScroll = function () { setNav(window.scrollY > hero.offsetHeight - 80); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ---- Smooth scroll ----
  var lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (ev) {
        var id = a.getAttribute("href");
        var target = id === "#" ? document.body : document.querySelector(id);
        if (!target) return;
        ev.preventDefault();
        lenis.scrollTo(target, { duration: 1.3 });
      });
    });
  }

  // ---- Navigation state ----
  ScrollTrigger.create({
    trigger: hero,
    start: "bottom 96px",
    onEnter: function () { setNav(true); },
    onLeaveBack: function () { setNav(false); },
  });

  // ---- Custom cursor ----
  var cursor = document.getElementById("cursor");
  var cursorLabel = document.getElementById("cursor-label");
  if (finePointer && !reduced && cursor) {
    var cx = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    var cy = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
    window.addEventListener("mousemove", function (e) {
      cx(e.clientX);
      cy(e.clientY);
    }, { passive: true });
    document.querySelectorAll("[data-cursor]").forEach(function (el) {
      var mode = el.getAttribute("data-cursor");
      el.addEventListener("mouseenter", function () {
        cursor.classList.add(mode === "view" ? "is-view" : "is-grow");
        if (mode === "view") cursorLabel.textContent = "View";
      });
      el.addEventListener("mouseleave", function () {
        cursor.classList.remove("is-view", "is-grow");
        cursorLabel.textContent = "";
      });
    });
  } else if (cursor) {
    cursor.style.display = "none";
  }

  // ---- Reduced motion: show everything, skip choreography ----
  if (reduced) {
    gsap.set("[data-reveal]", { opacity: 1, y: 0 });
    gsap.set("[data-clipreveal]", { clipPath: "none" });
    gsap.set(".mask .mask-inner", { yPercent: 0 });
    return;
  }

  var soft = "power3.out";

  // ---- Hero: masked entrance, cinematic zoom on scroll ----
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .to("#hero-copy .mask-inner", { yPercent: -110, duration: 1.4, stagger: 0.14 }, 0.2)
    .from("#hero-media img", { scale: 1.06, duration: 2.2, ease: "power2.out" }, 0)
    .from("#scroll-cue", { opacity: 0, duration: 1.2 }, 1.2);

  gsap.to("#hero-media img", {
    scale: 1.1,
    ease: "none",
    scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to("#hero-copy", {
    opacity: 0,
    y: -60,
    ease: "none",
    scrollTrigger: { trigger: hero, start: "top top", end: "62% top", scrub: true },
  });
  gsap.to("#scroll-cue", {
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: hero, start: "top top", end: "30% top", scrub: true },
  });

  // ---- Manifesto: word-by-word reveal on scroll ----
  var manifesto = document.getElementById("manifesto");
  if (manifesto) {
    var words = manifesto.textContent.trim().split(/\s+/);
    manifesto.innerHTML = words
      .map(function (w) { return '<span class="w">' + w + "</span>"; })
      .join(" ");
    gsap.to("#manifesto .w", {
      opacity: 1,
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: "#studio",
        start: "top 80%",
        end: "center 45%",
        scrub: 0.4,
      },
    });
  }

  // ---- Process: hairline draws itself as you scroll ----
  var processLine = document.getElementById("process-line");
  if (processLine) {
    gsap.fromTo(processLine, { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#process",
        start: "top 72%",
        end: "bottom 55%",
        scrub: 0.4,
      },
    });
  }

  // ---- Masked line reveals (titles, quotes) outside the hero ----
  gsap.utils.toArray("main .mask .mask-inner").forEach(function (el) {
    if (el.closest("#hero")) return;
    gsap.to(el, {
      yPercent: -110,
      duration: 1.3,
      ease: "power4.out",
      scrollTrigger: { trigger: el.closest(".mask"), start: "top 88%", once: true },
    });
  });

  // ---- Image clip reveals ----
  gsap.utils.toArray("[data-clipreveal]").forEach(function (el) {
    gsap.to(el, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.35,
      ease: "power4.inOut",
      scrollTrigger: { trigger: el, start: "top 86%", once: true },
    });
  });

  // ---- Gentle parallax inside frames ----
  gsap.utils.toArray(".plx").forEach(function (frame) {
    var img = frame.querySelector(".plx-img");
    if (!img) return;
    gsap.fromTo(img, { yPercent: -7 }, {
      yPercent: 0,
      ease: "none",
      scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  // ---- Layered drift for the About images ----
  gsap.to(".float-a", {
    yPercent: -4,
    ease: "none",
    scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true },
  });
  gsap.to(".float-b", {
    yPercent: 7,
    ease: "none",
    scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true },
  });

  // ---- Generic reveals ----
  gsap.utils.toArray("[data-reveal]").forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.95,
      ease: soft,
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });
})();
