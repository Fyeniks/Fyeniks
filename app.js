(function () {
  "use strict";

  const S = window.SITE;
  if (!S) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const escapeHtml = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const isExternal = (href) => /^https?:\/\//i.test(href);
  const linkAttrs = (href) => (isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : "");

  const icon = (name) => {
    const paths = {
      twitch: '<path d="M7 4h12v9.2l-4.2 4.2h-3.1L9.5 19v-1.6H7V4Z"/><path d="M11 7.2v5M15 7.2v5"/>',
      discord:
        '<path d="M8.2 7.2A12 12 0 0 1 12 6.6c1.3 0 2.6.2 3.8.6 1.1 1.5 1.9 3.4 2.2 5.4a9 9 0 0 1-2.6 1.4l-.7-1a6.6 6.6 0 0 0 1.1-.6c-2.4 1.1-5.2 1.1-7.6 0 .4.3.7.4 1.1.6l-.7 1A9 9 0 0 1 6 12.6c.3-2 .9-3.9 2.2-5.4Z"/><circle cx="9.7" cy="11.1" r=".8"/><circle cx="14.3" cy="11.1" r=".8"/>',
      youtube:
        '<rect x="3.5" y="6.5" width="17" height="11" rx="3"/><path d="m10.2 9.5 4.7 2.5-4.7 2.5v-5Z"/>',
      x: '<path class="x-logo" d="M4.8 4.5h4.25l3.62 4.84 4.08-4.84h2.05l-5.18 6.08 5.58 8.92h-4.24l-3.95-5.3-4.5 5.3H4.45l5.6-6.57L4.8 4.5Zm3.2 1.6 7.78 11.8h1.42L9.42 6.1H8Z"/>',
      tiktok:
        '<path d="M14.2 4.5c.6 2.5 2.1 4 4.5 4.2v3.1c-1.7 0-3.2-.5-4.5-1.4v4.8a5.3 5.3 0 1 1-4.6-5.2v3.2a2.2 2.2 0 1 0 1.5 2.1V4.5h3.1Z"/>',
      instagram:
        '<rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.2"/><circle cx="12" cy="12" r="3.4"/><circle cx="17.2" cy="6.8" r=".75"/>',
      mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.8 7 7.2 5.5L19.2 7"/>',
      briefcase:
        '<rect x="3.5" y="7" width="17" height="12" rx="2"/><path d="M9 7V5.5h6V7M3.5 12h17M10 12v2h4v-2"/>',
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] || paths.briefcase}</svg>`;
  };

  const analyticsId = String(S.analytics?.measurementId || "").trim();
  if (/^G-[A-Z0-9]+$/i.test(analyticsId)) {
    const consentKey = "fyeniks_analytics_consent";
    const getConsent = () => {
      try {
        return window.localStorage.getItem(consentKey) || "";
      } catch (_) {
        return "";
      }
    };
    const saveConsent = (value) => {
      try {
        window.localStorage.setItem(consentKey, value);
      } catch (_) {}
    };
    const clearAnalyticsCookies = () => {
      document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0].trim();
        if (name === "_ga" || name.startsWith("_ga_")) {
          document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}; SameSite=Lax`;
        }
      });
    };
    const loadAnalytics = () => {
      if (document.querySelector("script[data-fyeniks-ga4]")) return;
      window.dataLayer = window.dataLayer || [];
      window.gtag =
        window.gtag ||
        function () {
          window.dataLayer.push(arguments);
        };
      window.gtag("js", new Date());
      window.gtag("config", analyticsId, { anonymize_ip: true });
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
      gaScript.dataset.fyeniksGa4 = "true";
      document.head.appendChild(gaScript);
    };
    const removeConsentBanner = () => document.querySelector(".analytics-consent")?.remove();
    const showConsentBanner = () => {
      if (document.querySelector(".analytics-consent")) return;
      const banner = document.createElement("aside");
      banner.className = "analytics-consent";
      banner.setAttribute("role", "dialog");
      banner.setAttribute("aria-label", "Analytics cookie preferences");
      banner.innerHTML = `
        <div class="analytics-consent-copy">
          <strong>Cookies</strong>
        </div>
        <div class="analytics-consent-actions">
          <button type="button" data-consent-reject>ESSENTIAL ONLY</button>
          <button type="button" class="is-primary" data-consent-accept>ALLOW ANALYTICS</button>
        </div>`;
      document.body.appendChild(banner);
      $("[data-consent-accept]", banner)?.addEventListener("click", () => {
        saveConsent("granted");
        removeConsentBanner();
        loadAnalytics();
      });
      $("[data-consent-reject]", banner)?.addEventListener("click", () => {
        const analyticsWasLoaded = Boolean(document.querySelector("script[data-fyeniks-ga4]"));
        saveConsent("denied");
        clearAnalyticsCookies();
        removeConsentBanner();
        if (analyticsWasLoaded) window.location.reload();
      });
    };

    const installConsentSettingsLink = () => {
      const footer = document.querySelector("footer");
      if (!footer || footer.querySelector("[data-cookie-settings]")) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cookie-settings-link";
      button.dataset.cookieSettings = "true";
      button.textContent = "COOKIE SETTINGS";
      button.addEventListener("click", () => showConsentBanner());
      footer.appendChild(document.createTextNode(" "));
      footer.appendChild(button);
    };

    const analyticsConsent = getConsent();
    if (analyticsConsent === "granted") loadAnalytics();
    else if (analyticsConsent === "denied") clearAnalyticsCookies();
    else {
      if (document.readyState === "loading")
        document.addEventListener("DOMContentLoaded", showConsentBanner, { once: true });
      else showConsentBanner();
    }
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", installConsentSettingsLink, { once: true });
    else installConsentSettingsLink();
  }

  const setText = (selector, value) =>
    $$(selector).forEach((el) => {
      el.textContent = value ?? "";
    });

  const normalizeStatus = (status) => {
    const value = String(status || "open")
      .trim()
      .toLowerCase();
    return ["open", "selective", "closed"].includes(value) ? value : "open";
  };

  const statusLabel = (status) => normalizeStatus(status).toUpperCase();

  const statusMarkup = (status) => {
    const normalized = normalizeStatus(status);
    return `<strong class="service-status status-${normalized}"><i class="status-dot" aria-hidden="true"></i>${statusLabel(normalized)}</strong>`;
  };

  setText("[data-brand]", S.brand.name);
  setText("[data-role]", S.brand.role);
  setText("[data-profile-kicker]", S.brand.profileKicker);
  setText("[data-role-line]", S.brand.roleLine);
  setText("[data-eyebrow]", S.brand.eyebrow);
  setText("[data-about-index]", S.brand.aboutIndex);
  setText("[data-about]", S.brand.about || S.brand.tagline);
  const aboutLead = $("[data-about]");
  if (aboutLead && Array.isArray(S.brand.aboutLines) && S.brand.aboutLines.length) {
    aboutLead.innerHTML = S.brand.aboutLines
      .map(
        (line, index) =>
          `<span class="about-authored-line${index < S.brand.aboutLines.length - 1 ? " about-authored-line-justify" : " about-authored-line-last"}">${escapeHtml(line)}</span>`,
      )
      .join("");
  }
  setText("[data-tagline]", S.brand.tagline);

  $$("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  $$(".launch-promo").forEach((promo) => {
    const config = S.promo || {};
    if (config.enabled === false) {
      promo.remove();
      return;
    }
    const text = config.text || "LAUNCH PRICES ARE LOWER";
    const href = config.href || "commission.html";
    promo.setAttribute("href", href);
    const groupMarkup = Array.from({ length: 5 }, () => `<span>${escapeHtml(text)}</span>`).join("");
    promo.innerHTML = `<span class="launch-promo-track"><span class="launch-promo-group">${groupMarkup}</span><span class="launch-promo-group" aria-hidden="true">${groupMarkup}</span></span>`;
  });

  const hubLocalTime = $("#hubLocalTime");
  if (hubLocalTime) {
    const polishClock = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Warsaw",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const updatePolishClock = () => {
      hubLocalTime.textContent = polishClock.format(new Date());
    };
    updatePolishClock();
    window.setInterval(updatePolishClock, 1000);
  }

  const hubTwitchStatus = $("#hubTwitchStatus");
  if (hubTwitchStatus && S.twitchStatus?.enabled !== false) {
    const channel = String(S.twitchStatus?.channel || "fyeniks").trim();
    const displayChannel = channel ? channel.charAt(0).toUpperCase() + channel.slice(1) : "Fyeniks";
    const endpointTemplate = String(
      S.twitchStatus?.endpoint || "https://decapi.me/twitch/uptime?channel={channel}",
    );
    const endpoint = endpointTemplate.replace("{channel}", encodeURIComponent(channel));
    const copy = $("[data-twitch-text]", hubTwitchStatus);

    hubTwitchStatus.href = S.links?.twitch || `https://twitch.tv/${encodeURIComponent(channel)}`;

    const setStatus = (status) => {
      hubTwitchStatus.classList.remove("is-loading", "is-error", "is-live", "is-offline");
      hubTwitchStatus.classList.add(`is-${status}`);
      if (!copy) return;
      if (status === "live") copy.textContent = `Live ✦ Twitch.tv/${displayChannel}`;
      else if (status === "offline") copy.textContent = `Offline ✦ Twitch.tv/${displayChannel}`;
      else if (status === "error") copy.textContent = `Twitch ✦ Twitch.tv/${displayChannel}`;
      else copy.textContent = `Checking ✦ Twitch.tv/${displayChannel}`;
    };

    const refreshTwitchStatus = () => {
      fetch(endpoint, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) throw new Error(`Twitch status HTTP ${response.status}`);
          return response.text();
        })
        .then((raw) => {
          const value = String(raw || "").trim();
          const offline = !value || /offline|not live/i.test(value);
          setStatus(offline ? "offline" : "live");
        })
        .catch(() => setStatus("error"));
    };

    setStatus("loading");
    refreshTwitchStatus();
    window.setInterval(refreshTwitchStatus, 60000);
  } else if (hubTwitchStatus) {
    hubTwitchStatus.hidden = true;
  }

  const navMarkup = S.nav
    .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
    .join("");

  const navRoot = $("#site-nav");
  if (navRoot) navRoot.innerHTML = navMarkup;

  const aboutTitle = $("[data-about-title]");
  if (aboutTitle) {
    aboutTitle.innerHTML = `${escapeHtml(S.brand.aboutTitle)}<br><em>${escapeHtml(S.brand.aboutAccent)}</em>`;
  }

  const services = $("#service-list");
  if (services) {
    const hubServices = (S.services || []).filter((service) => service.showOnHub !== false);
    services.style.setProperty("--service-count", String(Math.max(hubServices.length, 1)));
    services.dataset.count = String(hubServices.length);
    services.innerHTML = hubServices
      .map(
        (service) =>
          `<div class="service-row"><span class="service-name">${escapeHtml(service.name)}</span>${statusMarkup(service.status)}</div>`,
      )
      .join("");
  }

  const homeSocials = $("#about-socials");
  if (homeSocials) {
    homeSocials.innerHTML = S.socials
      .filter((item) => item.showOnHome !== false)
      .map((item) => {
        const href = S.links[item.key];
        const accessibleLabel = `${item.label} — ${item.handle}`;
        return `<a class="about-social about-social-${escapeHtml(item.key)}" data-social-key="${escapeHtml(item.key)}" href="${escapeHtml(href)}"${linkAttrs(href)} aria-label="${escapeHtml(accessibleLabel)}" data-tooltip="${escapeHtml(item.label)}">
          <span class="social-icon">${icon(item.icon)}</span>
        </a>`;
      })
      .join("");
  }

  const pageKey = document.body.dataset.page;
  const page = pageKey && S.pages[pageKey];
  if (page) {
    setText("[data-page-kicker]", page.kicker);
    setText("[data-page-title]", page.title);
    setText("[data-page-intro]", page.intro);
    document.title = `${page.title} — ${S.brand.name}`;
  }

  const linksGrid = $("#links-grid");
  if (linksGrid) {
    linksGrid.innerHTML = S.socials
      .filter((item) => item.showOnLinks !== false)
      .map((item) => {
        const href = S.links[item.key];
        const featuredClass = item.featured ? ` link-card-featured link-card-${item.featured}` : "";
        return `<a class="link-card${featuredClass}" data-link-key="${escapeHtml(item.key)}" href="${escapeHtml(href)}"${linkAttrs(href)}>
          <span class="link-card-icon">${icon(item.icon)}</span>
          <span><small>${escapeHtml(item.label)}</small><strong>${escapeHtml(item.handle)}</strong></span>
          <b aria-hidden="true">↗</b>
        </a>`;
      })
      .join("");
  }

  const portfolioNav = $("#portfolio-section-nav");
  const portfolioSectionsRoot = $("#portfolio-sections");

  if (portfolioNav && portfolioSectionsRoot && S.portfolio) {
    const sections = (Array.isArray(S.portfolio.sections) ? S.portfolio.sections : []).filter(
      (section) => section.showOnPortfolio !== false,
    );
    const items = (Array.isArray(S.portfolio.items) ? S.portfolio.items : []).filter(
      (item) => item.showOnPortfolio !== false,
    );

    const creatorTwitchUrl = (item) => {
      if (item.creatorUrl) return item.creatorUrl;
      if (item.creatorTwitch) return item.creatorTwitch;
      const handle = String(item.creator || "")
        .trim()
        .replace(/^@/, "")
        .replace(/\s+/g, "");
      return handle ? `https://twitch.tv/${encodeURIComponent(handle)}` : "#";
    };

    const youtubeHref = (item) => {
      if (!item.youtubeId) return item.url || "#";
      return item.youtubeFormat === "short"
        ? `https://youtube.com/shorts/${encodeURIComponent(item.youtubeId)}`
        : `https://youtube.com/watch?v=${encodeURIComponent(item.youtubeId)}`;
    };

    const mediaMarkup = (item) => {
      const type = item.mediaType || "youtube";
      const href = type.startsWith("youtube") ? youtubeHref(item) : item.url || "#";
      const imageSrc =
        item.image ||
        (item.youtubeId ? `https://img.youtube.com/vi/${escapeHtml(item.youtubeId)}/hqdefault.jpg` : "");
      const play =
        type === "youtube"
          ? '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M8 5.5v13l10-6.5z" fill="currentColor"/></svg></span>'
          : "";
      const mediaInner = `${imageSrc ? `<img src="${escapeHtml(imageSrc)}" alt="Preview: ${escapeHtml(item.title)}" loading="lazy">` : '<span class="portfolio-media-placeholder">NO PREVIEW</span>'}${play}`;

      if (type === "youtube" && item.youtubeId) {
        return `<button class="portfolio-media portfolio-media-youtube-button" type="button" data-youtube-play="${escapeHtml(item.youtubeId)}" aria-label="${escapeHtml("Play on this page: " + item.title)}">${mediaInner}</button>`;
      }

      const label = type === "youtube-thumbnail" ? "Open source video" : "Open project";
      if (!href || href === "#")
        return `<div class="portfolio-media portfolio-media-static" aria-label="${escapeHtml(item.title)}">${mediaInner}</div>`;
      return `<a class="portfolio-media" href="${escapeHtml(href)}"${linkAttrs(href)} aria-label="${escapeHtml(label + ": " + item.title)}">${mediaInner}</a>`;
    };

    const projectBadge = (item) => {
      const badges = [];
      const type = String(item.projectType || "")
        .trim()
        .toLowerCase();
      if (type === "reference")
        badges.push('<span class="project-badge project-badge-reference">REFERENCE</span>');
      else if (type === "concept")
        badges.push('<span class="project-badge project-badge-concept">CONCEPT EDIT</span>');
      else if (type === "fan") badges.push('<span class="project-badge project-badge-fan">FAN EDIT</span>');
      else if (type === "demo") badges.push('<span class="project-badge project-badge-demo">DEMO</span>');
      else {
        if (item.demo) badges.push('<span class="project-badge project-badge-demo">DEMO</span>');
        if (item.commissioned === true)
          badges.push('<span class="project-badge project-badge-commission"><b>✓</b> COMMISSION</span>');
        if (item.commissioned === false)
          badges.push('<span class="project-badge project-badge-fan">FAN EDIT</span>');
      }
      return badges.join("");
    };

    const projectStatsMarkup = () => "";

    portfolioNav.innerHTML = sections
      .map(
        (section, index) =>
          `<a href="#portfolio-${escapeHtml(section.id)}" data-portfolio-jump="${escapeHtml(section.id)}">
        <span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(section.label || section.title)}
      </a>`,
      )
      .join("");

    portfolioSectionsRoot.innerHTML = sections
      .map((section, sectionIndex) => {
        const sectionItems = items.filter((item) => item.section === section.id);
        const ytJobsHref = S.links.ytjobs;
        const demoPill = section.demo ? '<span class="portfolio-demo-pill">DEMO DATA</span>' : "";
        const cards = sectionItems.length
          ? sectionItems
              .map((item) => {
                const projectHref = (item.mediaType || "youtube").startsWith("youtube")
                  ? youtubeHref(item)
                  : item.url || "#";
                const style = section.mediaStyle || "wide";
                const isThumbnail = style === "thumbnail";
                const isWebsite = style === "website";
                const isOther = style === "other";
                const creatorHref = isOther ? item.creatorUrl || item.url || "#" : creatorTwitchUrl(item);
                const tags =
                  isOther && Array.isArray(item.tags) && item.tags.length
                    ? `<div class="portfolio-website-tags">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`
                    : "";
                const stats = projectStatsMarkup(item);
                return `<article class="portfolio-card${isThumbnail ? " portfolio-card-thumbnail" : ""}${isWebsite ? " portfolio-card-website" : ""}${isOther ? " portfolio-card-other" : ""}${item.demo ? " portfolio-card-demo" : ""}" data-media-style="${escapeHtml(style)}" data-demo="${item.demo ? "true" : "false"}">
          <div class="portfolio-card-media-wrap">
            ${isWebsite ? '<div class="portfolio-browser-bar" aria-hidden="true"><i></i><i></i><i></i></div>' : ""}
            ${mediaMarkup(item)}
            <div class="portfolio-badge-wrap">${projectBadge(item)}</div>
            ${
              isThumbnail
                ? `<div class="portfolio-thumbnail-overlay">
              <a class="portfolio-creator" href="${escapeHtml(creatorHref)}"${linkAttrs(creatorHref)}>${escapeHtml(item.creator || "Creator")} <span>↗</span></a>
              <h3>${escapeHtml(item.title)}</h3>
            </div>`
                : ""
            }
          </div>
          ${
            isThumbnail
              ? ""
              : `<div class="portfolio-card-info">
            <a class="portfolio-creator" href="${escapeHtml(creatorHref)}"${linkAttrs(creatorHref)}>${escapeHtml(item.creator || (isOther ? "Personal Project" : isWebsite ? "Website" : "Creator"))} <span>↗</span></a>
            <h3>${escapeHtml(item.title)}</h3>
            ${isOther ? tags : ""}
            ${stats}
            ${
              isWebsite || (projectHref && projectHref !== "#") || item.downloadUrl
                ? `<div class="portfolio-card-actions">
              ${
                isWebsite
                  ? projectHref && projectHref !== "#"
                    ? `<a class="portfolio-view" href="${escapeHtml(projectHref)}"${linkAttrs(projectHref)}>VIEW WEBSITE <span>↗</span></a>`
                    : `<span class="portfolio-view portfolio-view-disabled" aria-disabled="true">VIEW WEBSITE <span>↗</span></span>`
                  : projectHref && projectHref !== "#"
                    ? `<a class="portfolio-view" href="${escapeHtml(projectHref)}"${linkAttrs(projectHref)}>${(item.mediaType || "youtube").startsWith("youtube") ? "VIEW ON YT" : "VIEW PROJECT"} <span>↗</span></a>`
                    : ""
              }
              ${item.downloadUrl ? `<a class="portfolio-download" href="${escapeHtml(item.downloadUrl)}"${linkAttrs(item.downloadUrl)}>${escapeHtml(item.downloadLabel || "DOWNLOAD")} <span>↓</span></a>` : ""}
            </div>`
                : ""
            }
          </div>`
          }
        </article>`;
              })
              .join("")
          : `<div class="portfolio-empty">${escapeHtml(section.emptyText || "No projects in this section yet.")}</div>`;

        const service = (S.commission?.sections || []).find(
          (entry) => entry.id === section.commissionService,
        );
        const serviceSettings =
          service && (S.services || []).find((entry) => entry.name === service.serviceName);
        const canOrder = service && serviceSettings?.showOnCommission !== false;
        const jobsLink =
          section.showYtJobs && ytJobsHref
            ? `<a href="${escapeHtml(ytJobsHref)}" target="_blank" rel="noopener noreferrer"><span class="portfolio-cta-action">VIEW ON YT JOBS ↗</span></a>`
            : "";
        const orderLink = canOrder
          ? `<a class="portfolio-order" href="contact.html?service=${encodeURIComponent(service.id)}"><span class="portfolio-cta-action">COMMISSION ↗</span></a>`
          : "";
        const cta =
          jobsLink || orderLink ? `<div class="portfolio-section-cta">${jobsLink}${orderLink}</div>` : "";

        return `<section class="portfolio-section" id="portfolio-${escapeHtml(section.id)}" data-section-index="${sectionIndex + 1}">
        <header class="portfolio-section-head">
          <div><span class="portfolio-section-kicker">${escapeHtml(section.kicker || section.label || "PORTFOLIO")}</span>${demoPill}<h2>${escapeHtml(section.title || section.label)}</h2></div>
          <p>${escapeHtml(section.intro || "")}</p>
        </header>
        <div class="portfolio-grid portfolio-grid-${escapeHtml(section.mediaStyle || "wide")}">${cards}</div>
        ${cta}
      </section>`;
      })
      .join("");

    portfolioSectionsRoot.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-youtube-play]");
      if (!trigger) return;

      const videoId = String(trigger.dataset.youtubePlay || "").trim();
      if (!/^[A-Za-z0-9_-]{6,20}$/.test(videoId)) return;

      const title = trigger.querySelector("img")?.alt?.replace(/^Preview:\s*/i, "") || "YouTube video";
      const iframe = document.createElement("iframe");
      iframe.className = "portfolio-youtube-frame";
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
      iframe.title = title;
      iframe.loading = "lazy";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;

      const wrap = trigger.closest(".portfolio-card-media-wrap");
      if (wrap) wrap.classList.add("is-playing");
      trigger.replaceWith(iframe);
    });

    portfolioNav.addEventListener("click", (event) => {
      const link = event.target.closest("[data-portfolio-jump]");
      if (!link) return;
      const target = document.getElementById(`portfolio-${link.dataset.portfolioJump}`);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#portfolio-${link.dataset.portfolioJump}`);
    });

    const navLinks = [...portfolioNav.querySelectorAll("[data-portfolio-jump]")];
    const renderedSections = sections
      .map((section) => document.getElementById(`portfolio-${section.id}`))
      .filter(Boolean);

    const setActivePortfolioSection = (id) => {
      navLinks.forEach((link) => {
        const active = link.dataset.portfolioJump === id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };

    if (navLinks[0]) setActivePortfolioSection(navLinks[0].dataset.portfolioJump);

    if ("IntersectionObserver" in window && renderedSections.length) {
      const visible = new Map();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => visible.set(entry.target.id, entry.intersectionRatio));
          const best = [...visible.entries()].filter(([, ratio]) => ratio > 0).sort((a, b) => b[1] - a[1])[0];
          if (best) setActivePortfolioSection(best[0].replace("portfolio-", ""));
        },
        { rootMargin: "-18% 0px -58% 0px", threshold: [0, 0.15, 0.35, 0.6] },
      );
      renderedSections.forEach((section) => observer.observe(section));
    }
  }

  const commissionNav = $('#commission-section-nav');
  const commissionSectionsRoot = $('#commission-sections');

  if (commissionNav && commissionSectionsRoot && S.commission) {
    const sections = (Array.isArray(S.commission.sections) ? S.commission.sections : []).filter(section => {
      const service = (S.services || []).find(item => item.name === section.serviceName);
      return service?.showOnCommission !== false;
    });
    const fees = Array.isArray(S.commission.fees) ? S.commission.fees : [];

    const findServiceStatus = serviceName => {
      const service = (S.services || []).find(item => item.name === serviceName);
      return service ? statusMarkup(service.status) : '';
    };

    const listMarkup = items => `<ul>${(items || []).map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;

    // SVG glyph keeps every help icon optically/geometrically centered.
    const helpGlyphMarkup = `<svg class="commission-help-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-2.9 2.5-2.9 4"/><path d="M12 18h.01"/></svg>`;

    const approxFx = S.commission.approxCurrency || {};
    const formatApproxMoney = value => {
      const rounded = Math.round(Number(value) * 100) / 100;
      if (!Number.isFinite(rounded)) return '';
      return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
    };
    const approxCurrencyText = amount => {
      const pln = Number(amount);
      if (!Number.isFinite(pln) || pln <= 0) return '';
      const eur = Number(approxFx.eurPerPln);
      const usd = Number(approxFx.usdPerPln);
      const parts = [];
      if (Number.isFinite(eur) && eur > 0) parts.push(`€${formatApproxMoney(pln * eur)}`);
      if (Number.isFinite(usd) && usd > 0) parts.push(`$${formatApproxMoney(pln * usd)}`);
      return parts.length ? `≈ ${parts.join(' · ')}` : '';
    };
    const tierNumericPrice = tier => {
      const price = String(tier.price || '');
      if (!/PLN/i.test(price)) return null;
      const match = price.replace(',', '.').match(/([0-9]+(?:\.[0-9]+)?)/);
      return match ? Number(match[1]) : null;
    };

    const tierMarkup = (tier, section) => {
      const tierGets = Array.isArray(tier.features) && tier.features.length ? tier.features : (section.youGet || []);
      const tierNeeds = Array.isArray(tier.sendMe) && tier.sendMe.length ? tier.sendMe : (section.sendMe || []);
      const numericPrice = tierNumericPrice(tier);
      const approx = numericPrice != null ? approxCurrencyText(numericPrice) : '';
      const accent = String(tier.accent || '').toLowerCase().replace(/[^a-z0-9_-]/g, '');
      const isDisabled = tier.enabled === false;
      const turnaroundNote = tier.turnaround ? (S.commission.turnaroundNote || '') : '';
      return `<details class="pricing-tier${accent ? ` pricing-tier-accent-${accent}` : ''}${isDisabled ? ' pricing-tier-disabled' : ''}"${isDisabled ? ' data-tier-disabled="true"' : ''}>
        <summary${isDisabled ? ' aria-disabled="true"' : ''}>
          <span class="pricing-tier-main">
            <span class="pricing-tier-name">${escapeHtml(tier.name)}${isDisabled ? '<span class="pricing-tier-unavailable">UNAVAILABLE</span>' : ''}</span>
            ${tier.summary ? `<span class="pricing-tier-summary">${escapeHtml(tier.summary)}</span>` : ''}
          </span>
          <span class="pricing-tier-price"><small>PRICE</small><strong>${escapeHtml(tier.price || 'Custom quote')}</strong>${approx ? `<span class="pricing-tier-fx">${escapeHtml(approx)}</span>` : ''}</span>
          <span class="pricing-tier-time">
            <small class="pricing-turnaround-label">TURNAROUND</small>
            <strong class="pricing-turnaround-value">${escapeHtml(tier.turnaround || '')}${turnaroundNote ? `<span class="pricing-turnaround-help" tabindex="0" aria-label="Turnaround information">${helpGlyphMarkup}<span class="pricing-turnaround-tooltip" role="tooltip">${escapeHtml(turnaroundNote)}</span></span>` : ''}</strong>
          </span>
          <span class="pricing-tier-toggle" aria-hidden="true"><span class="pricing-chevron"></span></span>
        </summary>
        <div class="pricing-tier-body">
          <div class="pricing-tier-details-grid">
            <div class="pricing-tier-detail">
              <span>WHAT YOU CAN GET</span>
              ${listMarkup(tierGets)}
            </div>
            <div class="pricing-tier-detail">
              <span>WHAT I NEED FROM YOU</span>
              ${listMarkup(tierNeeds)}
            </div>
          </div>
        </div>
      </details>`;
    };

    const formatPln = amount => {
      const value = Number(amount);
      if (!Number.isFinite(value)) return '';
      const rounded = Math.round(value * 100) / 100;
      const decimals = Number.isInteger(rounded) ? 0 : 2;
      return `${rounded.toFixed(decimals).replace('.', ',')} PLN`;
    };

    const packsMarkup = section => {
      const packs = Array.isArray(section.packs) ? section.packs : [];
      if (!packs.length) return '';

      const pricedTiers = (section.tiers || [])
        .filter(tier => tier.enabled !== false)
        .map(tier => {
          const basePrice = tierNumericPrice(tier);
          return basePrice != null ? { name: tier.name, basePrice, accent: tier.accent || '' } : null;
        })
        .filter(Boolean);

      const safeAccent = value => String(value || '').toLowerCase().replace(/[^a-z0-9_-]/g, '');

      return `<div class="pricing-packs pricing-packs-discount-only">
        <div class="pricing-packs-heading">
          <div><h4>PACKS</h4></div>
        </div>
        <div class="pricing-pack-grid">
          ${packs.map(pack => {
            const discount = Math.max(0, Math.min(1, Number(pack.discount || 0)));
            const discountLabel = pack.discountLabel || (discount ? `−${Math.round(discount * 100)}%` : '');
            const bundleItems = Array.isArray(pack.bundleItems) ? pack.bundleItems.filter(item => Number(item.price) > 0) : [];
            const isBundle = bundleItems.length > 0;
            const isFlatRate = Boolean(pack.flatRate);

            let priceRows = '';
            if (isBundle) {
              const bundleBase = bundleItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
              const bundleDiscounted = bundleBase * (1 - discount);
              const serviceItems = bundleItems.filter(item => item.type === 'service' || !item.type);
              const addOnItems = bundleItems.filter(item => item.type === 'addon' || item.type === 'fee');
              const serviceRows = serviceItems.map(item => {
                const accent = safeAccent(item.accent);
                return `<div class="pricing-pack-tier-price-row${accent ? ` pricing-pack-tier-price-row-${accent}` : ''}">
                  <span class="pricing-pack-tier-name">${escapeHtml(item.label)}</span>
                  <span class="pricing-pack-tier-values"><strong class="pricing-pack-bundle-item-price">${escapeHtml(formatPln(item.price))}</strong></span>
                </div>`;
              }).join('');
              const addOnRows = addOnItems.length ? `<div class="pricing-pack-fees-block pricing-pack-addons-block">
                <div class="pricing-pack-fees-head"><span>INCLUDED ADD-ONS</span><small>included in bundle</small></div>
                ${addOnItems.map(item => `<div class="pricing-pack-fee-row pricing-pack-addon-row">
                  <span class="pricing-pack-fee-name"><small>ADD-ON</small>${escapeHtml(item.label)}</span>
                  <strong>${escapeHtml(formatPln(item.price))}</strong>
                </div>`).join('')}
              </div>` : '';

              priceRows = `<div class="pricing-pack-unit-prices pricing-pack-bundle-prices">
                <div class="pricing-pack-unit-head"><span>SERVICE</span><small>bundle price</small></div>
                ${serviceRows}
                ${addOnRows}
                <div class="pricing-pack-bundle-total">
                  <span>TOTAL</span>
                  <span class="pricing-pack-tier-values">
                    <del>${escapeHtml(formatPln(bundleBase))}</del>
                    <span class="pricing-pack-tier-current">
                      <strong>${escapeHtml(formatPln(bundleDiscounted))}</strong>
                      ${approxCurrencyText(bundleDiscounted) ? `<small class="pricing-pack-tier-fx">${escapeHtml(approxCurrencyText(bundleDiscounted))}</small>` : ''}
                    </span>
                  </span>
                </div>
              </div>`;
            } else if (isFlatRate) {
              priceRows = `<div class="pricing-pack-unit-prices pricing-pack-flat-rate-prices">
                <div class="pricing-pack-unit-head"><span>RATE</span><small>with editing service</small></div>
                <div class="pricing-pack-flat-rate-row">
                  <span>${escapeHtml(pack.flatRateLabel || section.serviceName || section.title || 'Service')}</span>
                  <strong>${escapeHtml(pack.flatRate)}</strong>
                </div>
              </div>`;
            } else {
              priceRows = `<div class="pricing-pack-unit-prices">
                <div class="pricing-pack-unit-head"><span>TIER</span><small>after pack discount</small></div>
                ${pricedTiers.map(tier => {
                  const discountedPrice = tier.basePrice * (1 - discount);
                  const discountedApprox = approxCurrencyText(discountedPrice);
                  const accent = safeAccent(tier.accent);
                  return `<div class="pricing-pack-tier-price-row${accent ? ` pricing-pack-tier-price-row-${accent}` : ''}">
                    <span class="pricing-pack-tier-name">${escapeHtml(tier.name)}</span>
                    <span class="pricing-pack-tier-values">
                      <del>${escapeHtml(formatPln(tier.basePrice))}</del>
                      <span class="pricing-pack-tier-current">
                        <strong>${escapeHtml(formatPln(discountedPrice))}</strong>
                        ${discountedApprox ? `<small class="pricing-pack-tier-fx">${escapeHtml(discountedApprox)}</small>` : ''}
                      </span>
                    </span>
                  </div>`;
                }).join('')}
              </div>`;
            }

            return `<article class="pricing-pack pricing-pack-discount${pack.featured ? ' pricing-pack-featured' : ''}${isBundle ? ' pricing-pack-bundle' : ''}${isFlatRate ? ' pricing-pack-flat-rate' : ''}">
              <div class="pricing-pack-top pricing-pack-top-v56">
                <div class="pricing-pack-title"><span>${escapeHtml(pack.count || '')}</span><h5>${escapeHtml(pack.name || '')}</h5></div>
                <div class="pricing-pack-badges pricing-pack-badges-v56">
                  ${discountLabel ? `<strong>${escapeHtml(discountLabel)} OFF</strong>` : ''}
                  ${pack.badge ? `<strong class="pricing-pack-custom-badge">${escapeHtml(pack.badge)}</strong>` : ''}
                  ${pack.featured ? '<b>BEST VALUE</b>' : ''}
                </div>
              </div>
              ${priceRows}
              ${pack.note ? `<p class="pricing-pack-note">${escapeHtml(pack.note)}</p>` : ''}
            </article>`;
          }).join('')}
        </div>
      </div>`;
    };

    const addOnsMarkup = section => {
      const addOns = Array.isArray(section.addOns) ? section.addOns : [];
      if (!addOns.length) return '';
      const safeAccent = value => String(value || '').toLowerCase().replace(/[^a-z0-9_-]/g, '');
      return `<div class="commission-addons">
        <div class="commission-addons-head"><span>ADD-ONS</span><strong>Optional extras</strong></div>
        <div class="commission-addon-grid">
          ${addOns.map(addOn => {
            const note = addOn.note || '';
            const accent = safeAccent(addOn.accent);
            return `<article class="commission-addon-card${accent ? ` commission-addon-accent-${accent}` : ''}">
              <div class="commission-addon-copy">
                <span class="commission-addon-label">${escapeHtml(addOn.label)}${note ? `<span class="commission-fee-help commission-addon-help" tabindex="0" aria-label="${escapeHtml(addOn.label)} information">${helpGlyphMarkup}<span class="commission-fee-tooltip commission-addon-tooltip" role="tooltip">${escapeHtml(note)}</span></span>` : ''}</span>
                ${addOn.description ? `<p>${escapeHtml(addOn.description)}</p>` : ''}
              </div>
              <strong class="commission-addon-value">${escapeHtml(addOn.value || '')}</strong>
            </article>`;
          }).join('')}
        </div>
      </div>`;
    };

    const feesMarkup = section => {
      const sectionFees = Array.isArray(section.fees) ? section.fees : fees;
      const feeNotes = S.commission.feeNotes || {};
      const processingFee = S.commission.processingFee || '';
      const processingNote = S.commission.processingFeeNote || '';
      if (!sectionFees.length && !processingFee) return '';
      return `<div class="commission-fees">
        <div class="commission-fees-head"><span>FEES</span><strong>Only when relevant</strong></div>
        ${sectionFees.length ? `<div class="commission-fee-table">
          ${sectionFees.map(fee => {
            const note = fee.note || feeNotes[fee.label] || '';
            return `<div class="commission-fee-row">
              <span class="commission-fee-label">${escapeHtml(fee.label)}${note ? `<span class="commission-fee-help" tabindex="0" aria-label="${escapeHtml(fee.label)} information">${helpGlyphMarkup}<span class="commission-fee-tooltip" role="tooltip">${escapeHtml(note)}</span></span>` : ''}</span>
              <strong>${escapeHtml(fee.value)}</strong>
            </div>`;
          }).join('')}
        </div>` : ''}
        ${processingFee ? `<div class="commission-processing-row">
          <span>INVOICE</span>
          <strong>${escapeHtml(processingFee)}</strong>
          ${processingNote ? `<span class="commission-processing-help" tabindex="0" aria-label="Processing fee information">${helpGlyphMarkup}<span class="commission-processing-tooltip" role="tooltip">${escapeHtml(processingNote)}</span></span>` : ''}
        </div>` : ''}
      </div>`;
    };

    const secondaryGroupMarkup = (label, subtitle, content, kind) => {
      if (!content) return '';
      return `<details class="commission-secondary-group commission-secondary-${escapeHtml(kind)}">
        <summary>
          <span class="commission-secondary-summary-copy">
            <small>${escapeHtml(label)}</small>
            <strong>${escapeHtml(subtitle)}</strong>
          </span>
          <span class="commission-secondary-chevron" aria-hidden="true"></span>
        </summary>
        <div class="commission-secondary-body">${content}</div>
      </details>`;
    };

    commissionNav.innerHTML = sections.map((section, index) =>
      `<a href="#commission-${escapeHtml(section.id)}" data-commission-jump="${escapeHtml(section.id)}">
        <span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(section.label || section.title)}
      </a>`
    ).join('') + `<a href="#commission-custom-inquiry" data-commission-jump="custom-inquiry" class="commission-custom-inquiry-tab">
      <span>${String(sections.length + 1).padStart(2, '0')}</span>Custom Inquiry
    </a>`;

    commissionSectionsRoot.innerHTML = sections.map(section => {
      const tiers = Array.isArray(section.tiers) ? section.tiers : [];
      return `<section class="commission-service-section" id="commission-${escapeHtml(section.id)}" data-commission-section="${escapeHtml(section.id)}">
        <div class="commission-service-head">
          <div>
            <div class="commission-service-kicker">${escapeHtml(section.kicker || section.label || '')}</div>
            <div class="commission-title-row">
              <h2>${escapeHtml(section.title || section.label || '')}</h2>
              ${findServiceStatus(section.serviceName)}
            </div>
          </div>
        </div>

        <div class="commission-product-description">
          <span>SERVICE OVERVIEW</span>
          <p>${escapeHtml(section.intro || '')}</p>
        </div>

        <div class="commission-pricing-column">
          <div class="commission-pricing-heading commission-pricing-heading-v74">
            <div>
              <span>PRICING · START HERE</span>
              <h3>Choose a tier</h3>
              <p class="commission-pricing-helper">Pick the option that matches your project. Packs, add-ons and possible fees are grouped below.</p>
            </div>
          </div>
          <div class="pricing-tier-list">${tiers.map(tier => tierMarkup(tier, section)).join('')}</div>
          <div class="commission-secondary-stack">
            ${secondaryGroupMarkup('PACKS', 'Save when ordering multiple', packsMarkup(section), 'packs')}
            ${secondaryGroupMarkup('ADD-ONS', 'Optional extras', addOnsMarkup(section), 'addons')}
            ${secondaryGroupMarkup('FEES', 'Only when relevant', feesMarkup(section), 'fees')}
          </div>
          <div class="portfolio-section-cta commission-section-cta"><a class="portfolio-order" href="contact.html?service=${encodeURIComponent(section.id)}"><span class="portfolio-cta-action">COMMISSION ↗</span></a></div>
        </div>
      </section>`;
    }).join('');

    // Keep commission pricing stable: only one tier can be open inside a service.
    // Native <details> handles the actual layout; avoiding height hacks prevents overlap/jumps.
    commissionSectionsRoot.addEventListener('toggle', event => {
      const opened = event.target.closest && event.target.closest('.pricing-tier');
      if (!opened || !opened.open) return;
      const section = opened.closest('.commission-service-section');
      if (!section) return;
      section.querySelectorAll('.pricing-tier[open]').forEach(tier => {
        if (tier !== opened) tier.open = false;
      });
    }, true);

    commissionSectionsRoot.addEventListener('click', event => {
      const disabledSummary = event.target.closest && event.target.closest('.pricing-tier-disabled > summary');
      if (disabledSummary) {
        event.preventDefault();
        return;
      }

      const turnaroundHelp = event.target.closest && event.target.closest('.pricing-turnaround-help');
      if (!turnaroundHelp) return;
      event.preventDefault();
      event.stopPropagation();
    });

    commissionNav.addEventListener('click', event => {
      const link = event.target.closest('[data-commission-jump]');
      if (!link) return;
      const id = link.dataset.commissionJump;
      const target = document.getElementById(`commission-${id}`);
      if (!target) return;
      event.preventDefault();
      setActiveCommissionSection(id);
      target.scrollIntoView({ behavior: 'smooth', block: id === 'custom-inquiry' ? 'center' : 'start' });
      history.replaceState(null, '', `#commission-${id}`);
    });

    const navLinks = [...commissionNav.querySelectorAll('[data-commission-jump]')];
    const renderedSections = sections.map(section => document.getElementById(`commission-${section.id}`)).filter(Boolean);
    const customInquiryTarget = document.getElementById('commission-custom-inquiry');
    if (customInquiryTarget) renderedSections.push(customInquiryTarget);
    const setActiveCommissionSection = id => {
      navLinks.forEach(link => {
        const active = link.dataset.commissionJump === id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };
    if (navLinks[0]) setActiveCommissionSection(navLinks[0].dataset.commissionJump);

    const isAtCommissionBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 28;

    if ('IntersectionObserver' in window && renderedSections.length) {
      const visible = new Map();
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => visible.set(entry.target.id, entry.intersectionRatio));
        const customRatio = visible.get('commission-custom-inquiry') || 0;
        if (isAtCommissionBottom() || customRatio >= 0.2) {
          setActiveCommissionSection('custom-inquiry');
          return;
        }
        const best = [...visible.entries()]
          .filter(([id, ratio]) => id !== 'commission-custom-inquiry' && ratio > 0)
          .sort((a, b) => b[1] - a[1])[0];
        if (best) setActiveCommissionSection(best[0].replace('commission-', ''));
      }, { rootMargin: '-18% 0px -42% 0px', threshold: [0, .1, .2, .35, .6] });
      renderedSections.forEach(section => observer.observe(section));
    }

    window.addEventListener('scroll', () => {
      if (isAtCommissionBottom()) setActiveCommissionSection('custom-inquiry');
    }, { passive: true });
  }

  /* ---------- FAQ ---------- */
  const faq = $("#faq-list");
  if (faq) {
    faq.innerHTML = S.faq
      .map(
        (item, index) =>
          `<article class="faq-item">
        <button type="button" aria-expanded="${index === 0 ? "true" : "false"}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <b>${escapeHtml(item.q)}</b>
          <em aria-hidden="true">+</em>
        </button>
        <div class="faq-answer" ${index === 0 ? "" : "hidden"}>${escapeHtml(item.a)}</div>
      </article>`,
      )
      .join("");

    faq.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      const answer = button.parentElement.querySelector(".faq-answer");
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      answer.hidden = isOpen;
    });
  }

  const tos = $("#tos-list");
  if (tos) {
    tos.innerHTML = S.tos
      .map(
        (item, index) =>
          `<article class="tos-card"><span>${String(index + 1).padStart(2, "0")}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.text)}</p></article>`,
      )
      .join("");
  }

  const inquiryForm = $("#commission-form");
  if (inquiryForm) {
    const serviceSelect = $("#inquiry-service");
    const platformSelect = $("#inquiry-platform");
    const handleInput = $("#inquiry-handle");
    const detailsInput = $("#inquiry-details");
    const status = $("#inquiry-status");
    const fallback = $("#inquiry-copy-fallback");
    const availableServices = (S.commission?.sections || []).filter((service) => {
      const settings = (S.services || []).find((item) => item.name === service.serviceName);
      return settings?.showOnCommission !== false;
    });
    serviceSelect.innerHTML =
      '<option value="">Choose a service</option>' +
      availableServices
        .map(
          (service) =>
            `<option value="${escapeHtml(service.id)}">${escapeHtml(service.serviceName || service.title)}</option>`,
        )
        .join("") +
      '<option value="custom">Other / Custom inquiry</option>';
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (availableServices.some((service) => service.id === requestedService))
      serviceSelect.value = requestedService;
    const tierSelect = $("#inquiry-tier");
    const packSelect = $("#inquiry-pack");
    const currencySelect = $("#inquiry-currency");
    let currentPacks = [];
    const setOptions = (select, field, options, emptyLabel) => {
      select.innerHTML =
        `<option value="">${escapeHtml(emptyLabel)}</option>` +
        options
          .map((option) => `<option value="${escapeHtml(option.name)}">${escapeHtml(option.name)}</option>`)
          .join("");
      select.disabled = options.length === 0;
      field.hidden = options.length === 0;
    };
    const packMatchesTier = (pack, tierName) => {
      if (!tierName) return true;
      if (Array.isArray(pack.eligibleTiers) && pack.eligibleTiers.length) {
        return pack.eligibleTiers.includes(tierName);
      }
      const bundledServices = (pack.bundleItems || [])
        .filter((item) => item.type === "service")
        .map((item) => item.label);
      return bundledServices.length === 0 || bundledServices.includes(tierName);
    };
    const updatePackAvailability = () => {
      if (!packSelect || packSelect.disabled) return;
      const tierName = tierSelect.value;
      Array.from(packSelect.options).forEach((option) => {
        if (!option.value) {
          option.disabled = false;
          return;
        }
        const pack = currentPacks.find((item) => item.name === option.value);
        option.disabled = pack ? !packMatchesTier(pack, tierName) : false;
      });
      if (packSelect.selectedOptions[0]?.disabled) packSelect.value = "";
    };
    const updateBrief = () => {
      const service = availableServices.find((item) => item.id === serviceSelect.value);
      setOptions(
        tierSelect,
        $("#inquiry-tier-field"),
        (service?.tiers || []).filter((tier) => tier.enabled !== false),
        "Not sure yet / No preference",
      );
      currentPacks = (service?.packs || []).filter((pack) => pack.enabled !== false);
      setOptions(
        packSelect,
        $("#inquiry-pack-field"),
        currentPacks,
        "No pack / Decide later",
      );
      updatePackAvailability();
      const guidance =
        S.contactForm?.briefs?.[serviceSelect.value] ||
        S.contactForm?.briefs?.custom ||
        "Describe your project and include reference links.";
      $("#inquiry-guidance").textContent = guidance;
      detailsInput.placeholder = guidance;
    };
    serviceSelect.addEventListener("change", updateBrief);
    tierSelect.addEventListener("change", updatePackAvailability);
    updateBrief();
    platformSelect.addEventListener("change", () => {
      const discord = platformSelect.value === "Discord";
      $("#inquiry-handle-label").textContent = discord ? "Discord username *" : "X / Twitter handle *";
      handleInput.placeholder = discord ? "Your Discord username" : "@yourhandle";
    });
    const buildInquiry = () => {
      for (const name of ["name", "handle", "details"]) {
        const field = inquiryForm.elements.namedItem(name);
        field.setCustomValidity(field.value.trim() ? "" : "Please fill out this field.");
      }
      if (!inquiryForm.reportValidity()) return null;
      const data = new FormData(inquiryForm);
      const serviceName = serviceSelect.selectedOptions[0].textContent;
      const subject = `Commission inquiry — ${serviceName}`;
      const choices = [
        tierSelect.value && !tierSelect.disabled ? `Tier: ${tierSelect.value}` : "",
        packSelect.value && !packSelect.disabled ? `Pack: ${packSelect.value}` : "",
      ].filter(Boolean);
      const orderDetails = choices.length ? `\n${choices.join("\n")}` : "";
      const rawBudgetValue = String(data.get("budget") || "").trim();
      const budgetValue = rawBudgetValue.replace(/\s*(PLN|EUR|USD|€|\$)\s*$/i, "").trim();
      const budget = budgetValue ? `${budgetValue} ${currencySelect?.value || "PLN"}` : "Not specified";
      const body = `Service: ${serviceName}${orderDetails}\nName: ${data.get("name").trim()}\nEmail: ${data.get("email") || "Not provided"}\n${data.get("platform")}: ${data.get("handle").trim()}\nDeadline: ${data.get("deadline") || "Not specified"}\nBudget: ${budget}\n\nProject details:\n${data.get("details").trim()}`;
      return { subject, body };
    };
    inquiryForm.addEventListener("input", (event) => {
      if (typeof event.target.setCustomValidity === "function") event.target.setCustomValidity("");
      status.textContent = "";
      fallback.hidden = true;
    });
    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const inquiry = buildInquiry();
      if (!inquiry) return;
      const recipient = String(S.links.email || "").split("?")[0];
      const mailto = `${recipient}?subject=${encodeURIComponent(inquiry.subject)}&body=${encodeURIComponent(inquiry.body)}`;
      status.textContent =
        "Your message is prepared. Send it from your email app. Nothing has been sent by this page.";
      window.location.href = mailto;
    });
    $("#copy-inquiry").addEventListener("click", async () => {
      const inquiry = buildInquiry();
      if (!inquiry) return;
      const message = `${inquiry.subject}\n\n${inquiry.body}`;
      try {
        await navigator.clipboard.writeText(message);
        status.textContent = "Message copied!";
      } catch {
        fallback.value = message;
        fallback.hidden = false;
        fallback.focus();
        fallback.select();
        status.textContent = "Select and copy the prepared message below.";
      }
    });
  }

  const contactLinks = $("#contact-links");
  if (contactLinks) {
    const contactOrder = ["discord", "x", "email"];
    contactLinks.innerHTML = S.socials
      .filter((item) => contactOrder.includes(item.key))
      .sort((a, b) => contactOrder.indexOf(a.key) - contactOrder.indexOf(b.key))
      .map((item) => {
        const href = S.links[item.key];
        const note = item.contactNote ? `<em class="contact-note">${escapeHtml(item.contactNote)}</em>` : "";
        const featured = item.contactNote ? " contact-link-featured" : "";
        return `<a class="contact-link${featured}" data-link-key="${escapeHtml(item.key)}" href="${escapeHtml(href)}"${linkAttrs(href)}>
          <span class="contact-icon">${icon(item.icon)}</span>
          <span class="contact-link-copy">
            <span class="contact-link-label-row"><small>${escapeHtml(item.label)}</small>${note}</span>
            <strong>${escapeHtml(item.handle)}</strong>
          </span>
          <b aria-hidden="true">↗</b>
        </a>`;
      })
      .join("");
  }

  const emailButton = $("[data-email-button]");
  if (emailButton) emailButton.href = S.links.email;

  const card = $("#hubCard");
  const stage = card && card.closest(".hub-stage");
  if (card && stage) {
    let tiltFrame = 0;
    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.5;

    const cancelPendingTilt = () => {
      if (tiltFrame) {
        cancelAnimationFrame(tiltFrame);
        tiltFrame = 0;
      }
    };

    const drawTilt = () => {
      tiltFrame = 0;
      if (window.innerWidth < 900) return;

      const nx = Math.max(-1, Math.min(1, (pointerX / window.innerWidth - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, (pointerY / window.innerHeight - 0.5) * 2));

      const rotateY = nx * 2.1;
      const rotateX = -ny * 1.6;
      card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
    };

    const requestTilt = () => {
      cancelPendingTilt();
      tiltFrame = requestAnimationFrame(drawTilt);
    };

    document.addEventListener(
      "pointermove",
      (event) => {
        if (window.innerWidth < 900) return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        requestTilt();
      },
      { passive: true },
    );

    window.addEventListener("resize", requestTilt, { passive: true });
  }

  const cursorGlow = $("#cursorGlow");
  const glowHost = $("#hubCard");
  if (cursorGlow && glowHost && window.matchMedia("(pointer:fine)").matches) {
    const glowRadius = 180;
    glowHost.appendChild(cursorGlow);
    let targetX = glowHost.clientWidth * 0.5;
    let targetY = glowHost.clientHeight * 0.5;
    let currentX = targetX;
    let currentY = targetY;
    let inside = false;

    const drawGlow = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      cursorGlow.style.transform = `translate3d(${(currentX - glowRadius).toFixed(1)}px, ${(currentY - glowRadius).toFixed(1)}px, 0)`;
      cursorGlow.classList.toggle("is-visible", inside);
      requestAnimationFrame(drawGlow);
    };

    glowHost.addEventListener(
      "pointerenter",
      (event) => {
        inside = true;
        const rect = glowHost.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) * glowHost.clientWidth) / rect.width;
        targetY = ((event.clientY - rect.top) * glowHost.clientHeight) / rect.height;
      },
      { passive: true },
    );

    glowHost.addEventListener(
      "pointermove",
      (event) => {
        const rect = glowHost.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) * glowHost.clientWidth) / rect.width;
        targetY = ((event.clientY - rect.top) * glowHost.clientHeight) / rect.height;
      },
      { passive: true },
    );

    glowHost.addEventListener(
      "pointerleave",
      () => {
        inside = false;
      },
      { passive: true },
    );

    requestAnimationFrame(drawGlow);
  }
})();
