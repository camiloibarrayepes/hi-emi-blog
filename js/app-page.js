import React, { useEffect, useMemo, useState } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);
const SUPPORT_EMAIL = "camilo.ibarray@gmail.com";
const BLOG_URL = "./index.html";
const MARKETING_URL = "./app.html";
const SUPPORT_URL = "./support.html";

const COPY = {
  es: {
    common: {
      brandSubtitle: "Recuerdos y palabras de tu bebé",
      languageLabel: "Idioma",
      support: "Soporte",
      marketing: "Marketing",
      blog: "Blog",
      contact: "Escribir soporte",
      openBlog: "Ver blog",
      openSupport: "Ir a soporte",
      openMarketing: "Ver página principal",
      copyright: "Copyright © {year} Hi Emi. Todos los derechos reservados.",
      builtBy: "Creado por Camilo Ibarra.",
      supportEmailLabel: "Email de soporte",
      marketingUrlLabel: "URL de marketing",
      supportUrlLabel: "URL de soporte"
    },
    marketing: {
      pageTitle: "Hi Emi | Guarda sus palabras para siempre",
      eyebrow: "App para recuerdos del lenguaje temprano",
      title: "Cada palabra pequeña puede convertirse en un recuerdo enorme.",
      subtitle:
        "Hi Emi te ayuda a guardar palabras, audios, fotos y momentos especiales de tu bebé en un espacio bonito, privado y fácil de volver a visitar.",
      primaryCta: "Pedir ayuda",
      secondaryCta: "Leer el blog",
      highlightTitle: "Diseñada para capturar momentos reales",
      highlightBody:
        "Desde el primer intento hasta esas palabras que toda la familia repite, Hi Emi convierte recuerdos espontáneos en un archivo emocional que puedes volver a escuchar y compartir con cariño.",
      stack: [
        ["Palabras y audios", "Guarda lo que dijo y cómo sonó."],
        ["Fotos del momento", "Añade contexto visual a cada recuerdo."],
        ["Historial especial", "Vuelve atrás y revive su evolución."]
      ],
      metrics: [
        ["Privada", "Tus recuerdos son tuyos."],
        ["Bilingüe", "Interfaz en español e inglés."]
      ],
      featuresTitle: "Lo más importante de la experiencia",
      featuresBody:
        "Pensada para familias que quieren recordar y también para una App Store que necesita una presencia clara, confiable y simple.",
      features: [
        ["🎙️", "Grabaciones por palabra", "Asocia varios audios a una misma palabra y conserva cómo fue cambiando con el tiempo."],
        ["☁️", "Sincronización", "Conecta tu cuenta para mantener tus recuerdos disponibles cuando los necesites."],
        ["💜", "Diseño emocional", "Una experiencia suave, íntima y enfocada en esos instantes que suelen perderse." ]
      ],
      finalTitle: "Una página útil para App Store y para las familias",
      finalBody:
        "Esta URL funciona como tu página de marketing oficial: explica qué es Hi Emi, transmite confianza y enlaza rápido al soporte y al contenido del blog."
    },
    support: {
      pageTitle: "Hi Emi | Soporte",
      eyebrow: "Centro de ayuda oficial",
      title: "Estamos aquí para ayudarte con Hi Emi.",
      subtitle:
        "Si tienes dudas sobre la app, sincronización en la nube, acceso premium, cuenta o cualquier error, puedes escribirnos y te ayudaremos lo antes posible.",
      primaryCta: "Enviar email",
      secondaryCta: "Ver página principal",
      cards: [
        {
          icon: "📩",
          title: "Contáctanos",
          body: "Escríbenos si algo no funciona como esperas o si necesitas ayuda antes de publicar o distribuir la app.",
          items: [
            "Describe lo que pasó y cuándo ocurrió.",
            "Si puedes, adjunta capturas de pantalla.",
            "Indica tu dispositivo y versión de iOS."
          ]
        },
        {
          icon: "🧾",
          title: "Temas frecuentes",
          body: "Podemos ayudarte con restauración de acceso, sincronización, cuentas premium, Friends & Family y dudas generales de uso.",
          items: [
            "Problemas al iniciar sesión.",
            "Permisos de nube o sincronización.",
            "Acceso premium o pagos únicos."
          ]
        }
      ],
      faqTitle: "Preguntas frecuentes",
      faqBody: "Puedes usar esta misma página como Support URL en App Store Connect.",
      faqs: [
        ["No puedo entrar a mi cuenta", "Escríbenos con el email que usaste al registrarte y cuéntanos qué mensaje te aparece."],
        ["No se sincronizan mis recuerdos", "Revisa tu conexión y luego contáctanos si ves errores de nube, permisos o importación."],
        ["Tengo acceso Premium o Friends & Family y no aparece", "Envíanos el correo de tu cuenta para validar el acceso configurado."],
        ["Quiero reportar un bug", "Mándanos una descripción breve, pasos para reproducirlo y una captura si la tienes."]
      ]
    }
  },
  en: {
    common: {
      brandSubtitle: "Baby words and memory keeper",
      languageLabel: "Language",
      support: "Support",
      marketing: "Marketing",
      blog: "Blog",
      contact: "Email support",
      openBlog: "Open blog",
      openSupport: "Go to support",
      openMarketing: "Open main page",
      copyright: "Copyright © {year} Hi Emi. All rights reserved.",
      builtBy: "Built by Camilo Ibarra.",
      supportEmailLabel: "Support email",
      marketingUrlLabel: "Marketing URL",
      supportUrlLabel: "Support URL"
    },
    marketing: {
      pageTitle: "Hi Emi | Save their words forever",
      eyebrow: "App for early language memories",
      title: "Every little word can become a memory that lasts.",
      subtitle:
        "Hi Emi helps you save your baby's words, audio clips, photos, and special moments in a beautiful, private space you can revisit anytime.",
      primaryCta: "Get support",
      secondaryCta: "Read the blog",
      highlightTitle: "Built to capture real moments",
      highlightBody:
        "From first attempts to family-favorite words, Hi Emi turns spontaneous memories into an emotional archive you can revisit, hear again, and keep close.",
      stack: [
        ["Words and audio", "Save what they said and how it sounded."],
        ["Moment photos", "Add visual context to each memory."],
        ["Special timeline", "Go back and relive their progress."]
      ],
      metrics: [
        ["Private", "Your memories stay yours."],
        ["Bilingual", "Interface in Spanish and English."]
      ],
      featuresTitle: "What matters most in the experience",
      featuresBody:
        "Made for families who want to remember, and also for an App Store presence that feels clear, trustworthy, and polished.",
      features: [
        ["🎙️", "Multiple recordings", "Attach more than one audio clip to the same word and keep the full story of how it changed."],
        ["☁️", "Cloud sync", "Connect your account to keep memories available whenever you need them."],
        ["💜", "Emotional design", "A soft, intimate experience centered on moments that are easy to lose."]
      ],
      finalTitle: "Useful for the App Store and for families",
      finalBody:
        "This page works as your official marketing URL: it explains Hi Emi clearly, builds trust, and links quickly to support and the blog."
    },
    support: {
      pageTitle: "Hi Emi | Support",
      eyebrow: "Official help center",
      title: "We're here to help you with Hi Emi.",
      subtitle:
        "If you have questions about the app, cloud sync, premium access, your account, or any bug, reach out and we'll help as soon as we can.",
      primaryCta: "Send email",
      secondaryCta: "Open main page",
      cards: [
        {
          icon: "📩",
          title: "Contact us",
          body: "Write to us if something isn't working as expected or if you need help before publishing and distributing the app.",
          items: [
            "Describe what happened and when it happened.",
            "If possible, include screenshots.",
            "Tell us your device and iOS version."
          ]
        },
        {
          icon: "🧾",
          title: "Common topics",
          body: "We can help with access restoration, sync issues, premium accounts, Friends & Family access, and general usage questions.",
          items: [
            "Sign-in problems.",
            "Cloud permissions or sync issues.",
            "Premium access or one-time purchases."
          ]
        }
      ],
      faqTitle: "Frequently asked questions",
      faqBody: "You can use this page directly as your Support URL in App Store Connect.",
      faqs: [
        ["I can't access my account", "Email us with the address you used to sign up and tell us what message you're seeing."],
        ["My memories are not syncing", "Check your connection first, then contact us if you're seeing cloud, permission, or import errors."],
        ["I have Premium or Friends & Family access and it isn't showing", "Send us the email tied to your account so we can verify the configured access."],
        ["I want to report a bug", "Send a short description, steps to reproduce it, and a screenshot if you have one."]
      ]
    }
  }
};

function resolveLanguage() {
  const params = new URLSearchParams(window.location.search);
  const value = params.get("lang");
  if (value === "es" || value === "en") return value;

  const browserLanguage = (navigator.language || navigator.languages?.[0] || "en").toLowerCase();
  return browserLanguage.startsWith("es") ? "es" : "en";
}

function pageMode() {
  return document.body.dataset.page === "support" ? "support" : "marketing";
}

function marketingHref(language) {
  return `${MARKETING_URL}?lang=${language}`;
}

function supportHref(language) {
  return `${SUPPORT_URL}?lang=${language}`;
}

function blogHref(language) {
  return `${BLOG_URL}?lang=${language}`;
}

function emailHref(language) {
  const subject = language === "es" ? "Soporte Hi Emi" : "Hi Emi Support";
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

function updateQueryLanguage(language) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState({}, "", url);
}

function App() {
  const [language, setLanguage] = useState(resolveLanguage);
  const mode = pageMode();
  const copy = useMemo(() => COPY[language][mode], [language, mode]);
  const common = useMemo(() => COPY[language].common, [language]);
  const year = new Date().getFullYear();

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = copy.pageTitle;
    updateQueryLanguage(language);
  }, [copy.pageTitle, language]);

  const setLang = (nextLanguage) => setLanguage(nextLanguage);

  const footerLinks = [
    [common.marketing, marketingHref(language)],
    [common.support, supportHref(language)],
    [common.blog, blogHref(language)]
  ];

  return html`
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-badge">💜</div>
          <div className="brand-copy">
            <strong>Hi Emi</strong>
            <span>${common.brandSubtitle}</span>
          </div>
        </div>

        <div className="topbar-actions">
          <a className="ghost-link" href=${mode === "support" ? marketingHref(language) : supportHref(language)}>
            ${mode === "support" ? common.openMarketing : common.openSupport}
          </a>
          <div className="lang-switch" aria-label=${common.languageLabel}>
            <button
              className=${`lang-button ${language === "es" ? "active" : ""}`}
              type="button"
              onClick=${() => setLang("es")}
            >
              ES
            </button>
            <button
              className=${`lang-button ${language === "en" ? "active" : ""}`}
              type="button"
              onClick=${() => setLang("en")}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <article className="hero-card hero-copy">
          <div className="eyebrow">${copy.eyebrow}</div>
          <h1>${copy.title}</h1>
          <p>${copy.subtitle}</p>

          <div className="hero-cta">
            <a className="button-link primary" href=${emailHref(language)}>${copy.primaryCta}</a>
            <a
              className="button-link secondary"
              href=${mode === "support" ? marketingHref(language) : blogHref(language)}
            >
              ${copy.secondaryCta}
            </a>
          </div>
        </article>

        ${
          mode === "marketing"
            ? html`
                <div className="hero-side">
                  <article className="glass-card highlight-card">
                    <h2>${copy.highlightTitle}</h2>
                    <p>${copy.highlightBody}</p>
                    <div className="memory-stack">
                      ${copy.stack.map(
                        ([title, body]) => html`
                          <div className="memory-item" key=${title}>
                            <div className="memory-icon">✨</div>
                            <div>
                              <strong>${title}</strong>
                              <span>${body}</span>
                            </div>
                          </div>
                        `
                      )}
                    </div>
                  </article>

                  <div className="metric-grid">
                    ${copy.metrics.map(
                      ([title, body]) => html`
                        <article className="glass-card metric-card" key=${title}>
                          <h3>${title}</h3>
                          <strong>Hi Emi</strong>
                          <p>${body}</p>
                        </article>
                      `
                    )}
                  </div>
                </div>
              `
            : html`
                <div className="hero-side support-grid">
                  ${copy.cards.map(
                    (card) => html`
                      <article className="support-card" key=${card.title}>
                        <div className="support-icon">${card.icon}</div>
                        <h3>${card.title}</h3>
                        <p>${card.body}</p>
                        <ul>
                          ${card.items.map((item) => html`<li key=${item}>${item}</li>`)}
                        </ul>
                      </article>
                    `
                  )}
                </div>
              `
        }
      </section>

      ${
        mode === "marketing"
          ? html`
              <section className="page-section">
                <div className="section-header">
                  <h2>${copy.featuresTitle}</h2>
                  <p>${copy.featuresBody}</p>
                </div>
                <div className="feature-grid">
                  ${copy.features.map(
                    ([icon, title, body]) => html`
                      <article className="feature-card" key=${title}>
                        <div className="feature-icon">${icon}</div>
                        <h3>${title}</h3>
                        <p>${body}</p>
                      </article>
                    `
                  )}
                </div>
              </section>

              <section className="page-section">
                <article className="hero-card hero-copy">
                  <div className="section-header">
                    <h2>${copy.finalTitle}</h2>
                    <p>${copy.finalBody}</p>
                  </div>
                  <div className="hero-cta">
                    <a className="button-link primary" href=${supportHref(language)}>${common.openSupport}</a>
                    <a className="button-link secondary" href=${blogHref(language)}>${common.openBlog}</a>
                  </div>
                </article>
              </section>
            `
          : html`
              <section className="page-section">
                <div className="section-header">
                  <h2>${copy.faqTitle}</h2>
                  <p>${copy.faqBody}</p>
                </div>
                <div className="faq-grid">
                  ${copy.faqs.map(
                    ([question, answer]) => html`
                      <article className="faq-card" key=${question}>
                        <h3>${question}</h3>
                        <p>${answer}</p>
                      </article>
                    `
                  )}
                </div>
              </section>
            `
      }

      <footer className="page-section">
        <div className="footer-grid">
          <article className="footer-card">
            <h3>Hi Emi</h3>
            <p>
              ${language === "es"
                ? "Una presencia simple y profesional para App Store Connect, soporte y presentación de marca."
                : "A simple, professional presence for App Store Connect, support, and brand presentation."}
            </p>
            <strong>${common.copyright.replace("{year}", String(year))}</strong>
            <p>${common.builtBy}</p>
          </article>

          <article className="footer-card">
            <h3>${language === "es" ? "Datos útiles" : "Useful details"}</h3>
            <p>${common.supportEmailLabel}: ${SUPPORT_EMAIL}</p>
            <p>${common.marketingUrlLabel}: ${MARKETING_URL}</p>
            <p>${common.supportUrlLabel}: ${SUPPORT_URL}</p>
            <div className="hero-cta">
              <a className="chip-button" href=${emailHref(language)}>${common.contact}</a>
              <a className="chip-button" href=${blogHref(language)}>${common.openBlog}</a>
            </div>
          </article>
        </div>

        <div className="footer-mini">
          <span>${common.copyright.replace("{year}", String(year))}</span>
          <nav>
            ${footerLinks.map(
              ([label, href]) => html`
                <a key=${label} href=${href}>${label}</a>
              `
            )}
          </nav>
        </div>
      </footer>
    </main>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
