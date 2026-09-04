import React, { useEffect, useMemo, useState } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);
const SUPPORT_EMAIL = "camilo.ibarray@gmail.com";
const BLOG_URL = "./index.html";
const MARKETING_URL = "./app.html";
const SUPPORT_URL = "./support.html";
const PRIVACY_URL = "./privacy.html";

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
      openPrivacy: "Ver privacidad",
      copyright: "Copyright © {year} Hi Emi. Todos los derechos reservados.",
      builtBy: "Creado por Camilo Ibarra.",
      supportEmailLabel: "Email de soporte",
      marketingUrlLabel: "URL de marketing",
      supportUrlLabel: "URL de soporte",
      privacyUrlLabel: "URL de privacidad"
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
        ["💜", "Diseño emocional", "Una experiencia suave, íntima y enfocada en esos instantes que suelen perderse."]
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
    },
    privacy: {
      pageTitle: "Hi Emi | Política de privacidad",
      eyebrow: "Política de privacidad oficial",
      title: "Tu privacidad importa y tus recuerdos deben sentirse seguros.",
      subtitle:
        "Esta política explica qué datos recopila y procesa Hi Emi, cómo se obtienen, cómo se usan, cuándo se comparten y qué opciones tienes respecto a tu información.",
      primaryCta: "Contactar soporte",
      secondaryCta: "Ver página principal",
      lastUpdatedLabel: "Última actualización",
      lastUpdatedDate: "3 de septiembre de 2026",
      sections: [
        {
          title: "1. Qué hace Hi Emi",
          body: "Hi Emi es una app pensada para guardar palabras, audios, fotos y recuerdos relacionados con el desarrollo temprano del lenguaje de tu bebé."
        },
        {
          title: "2. Qué datos podemos recopilar o almacenar",
          body: "Dependiendo de cómo uses la app, Hi Emi puede almacenar información que ingresas directamente, como tu correo electrónico, nombre del bebé, apodo, nombre de usuario, género, fecha de nacimiento, palabras registradas, significados, categorías, fotos, grabaciones de audio y configuraciones relacionadas con tu experiencia."
        },
        {
          title: "3. Cómo se obtienen esos datos",
          body: "Los datos se obtienen cuando tú los escribes dentro de la app, cuando grabas audios, cuando seleccionas fotos, cuando creas o inicias sesión en una cuenta, cuando eliges sincronizar en la nube y cuando realizas acciones como editar, eliminar o restaurar recuerdos."
        },
        {
          title: "4. Cómo usamos tus datos",
          body: "Usamos esta información para mostrar y organizar tus recuerdos dentro de la app, permitir la reproducción de audios y visualización de fotos, crear e identificar tu cuenta, sincronizar y restaurar contenido entre dispositivos, y habilitar o validar funciones premium o accesos especiales configurados para tu cuenta."
        },
        {
          title: "5. Almacenamiento local y sincronización en la nube",
          body: "Parte de la información se almacena localmente en tu dispositivo. Si decides activar la sincronización en la nube, Hi Emi puede enviar y almacenar ciertos datos en Google Firebase, incluyendo Firebase Authentication, Firestore y Storage, para crear tu cuenta, mantener tu sesión, sincronizar tus recuerdos y permitir su recuperación posterior."
        },
        {
          title: "6. Qué datos se comparten y con quién",
          body: "Si activas la nube, Hi Emi comparte con Google Firebase únicamente los datos necesarios para esa función, como correo electrónico, nombre del bebé, apodo, nombre de usuario, género, fecha de nacimiento, palabras, significados, audios, fotos y cambios de sincronización. Hi Emi no comparte tus datos con servicios de inteligencia artificial de terceros."
        },
        {
          title: "7. Permiso del usuario y carácter opcional de la nube",
          body: "La sincronización en la nube es opcional. Hi Emi solicita tu autorización antes de enviar datos a Google Firebase para esa función. Si no otorgas ese permiso, puedes seguir usando la app localmente sin activar la nube."
        },
        {
          title: "8. Compras y acceso premium",
          body: "Hi Emi puede ofrecer acceso premium mediante una compra única o mediante acceso Friends & Family configurado para tu cuenta. La gestión del pago se realiza a través de Apple y Hi Emi no almacena la información completa de tu método de pago."
        },
        {
          title: "9. Seguridad y protección de datos",
          body: "Aplicamos medidas razonables para proteger la información almacenada y procuramos utilizar proveedores que ofrezcan medidas de protección adecuadas para los datos procesados. Sin embargo, ningún sistema puede garantizar seguridad absoluta."
        },
        {
          title: "10. Tus opciones y control sobre tus datos",
          body: "Puedes editar o eliminar información dentro de la app según las funciones disponibles. También puedes decidir no activar la nube. Si necesitas ayuda con acceso, sincronización o eliminación de datos asociados a tu cuenta, puedes escribirnos."
        },
        {
          title: "11. Niños",
          body: "Hi Emi está pensada para ser usada por madres, padres o adultos responsables. No está dirigida a que niños creen cuentas por sí solos."
        },
        {
          title: "12. Cambios a esta política",
          body: "Esta política puede actualizarse en el futuro. Si hacemos cambios importantes, publicaremos la versión más reciente en esta misma URL."
        },
        {
          title: "13. Contacto",
          body: "Si tienes preguntas sobre privacidad o datos personales relacionados con Hi Emi, puedes escribir a camilo.ibarray@gmail.com."
        }
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
      openPrivacy: "Open privacy",
      copyright: "Copyright © {year} Hi Emi. All rights reserved.",
      builtBy: "Built by Camilo Ibarra.",
      supportEmailLabel: "Support email",
      marketingUrlLabel: "Marketing URL",
      supportUrlLabel: "Support URL",
      privacyUrlLabel: "Privacy URL"
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
    },
    privacy: {
      pageTitle: "Hi Emi | Privacy Policy",
      eyebrow: "Official privacy policy",
      title: "Your privacy matters, and your memories should feel safe.",
      subtitle:
        "This policy explains what data Hi Emi collects and processes, how it is obtained, how it is used, when it is shared, and what choices you have regarding your information.",
      primaryCta: "Contact support",
      secondaryCta: "Open main page",
      lastUpdatedLabel: "Last updated",
      lastUpdatedDate: "September 3, 2026",
      sections: [
        {
          title: "1. What Hi Emi does",
          body: "Hi Emi is an app designed to save words, audio clips, photos, and memories related to your baby's early language development."
        },
        {
          title: "2. What data we may collect or store",
          body: "Depending on how you use the app, Hi Emi may store information you enter directly, such as your email address, your baby's name, nickname, username, gender, birth date, saved words, meanings, categories, photos, audio recordings, and settings related to your experience."
        },
        {
          title: "3. How that data is obtained",
          body: "Data is obtained when you type it into the app, record audio, select photos, create or sign in to an account, choose to enable cloud sync, and perform actions such as editing, deleting, or restoring memories."
        },
        {
          title: "4. How we use your data",
          body: "We use this information to display and organize your memories inside the app, enable audio playback and photo viewing, create and identify your account, sync and restore content across devices, and enable or validate premium features or special account-based access."
        },
        {
          title: "5. Local storage and cloud sync",
          body: "Some information is stored locally on your device. If you choose to enable cloud sync, Hi Emi may send and store certain data in Google Firebase, including Firebase Authentication, Firestore, and Storage, to create your account, maintain your session, sync your memories, and allow later recovery."
        },
        {
          title: "6. What data is shared and with whom",
          body: "If you enable cloud sync, Hi Emi shares with Google Firebase only the data needed for that feature, such as email address, baby's name, nickname, username, gender, birth date, words, meanings, audio, photos, and sync changes. Hi Emi does not share your data with third-party artificial intelligence services."
        },
        {
          title: "7. User permission and optional cloud sync",
          body: "Cloud sync is optional. Hi Emi asks for your permission before sending data to Google Firebase for that feature. If you do not grant permission, you can continue using the app locally without enabling cloud sync."
        },
        {
          title: "8. Purchases and premium access",
          body: "Hi Emi may offer premium access through a one-time purchase or through Friends & Family access configured for your account. Payment handling is managed by Apple, and Hi Emi does not store your full payment method information."
        },
        {
          title: "9. Security and data protection",
          body: "We apply reasonable measures to protect stored information and aim to use providers that offer appropriate safeguards for processed data. However, no system can guarantee absolute security."
        },
        {
          title: "10. Your choices and control over your data",
          body: "You can edit or delete information inside the app according to the available features. You can also choose not to enable cloud sync. If you need help with access, sync, or deletion of data associated with your account, you can contact us."
        },
        {
          title: "11. Children",
          body: "Hi Emi is intended to be used by parents or responsible adults. It is not meant for children to create accounts on their own."
        },
        {
          title: "12. Changes to this policy",
          body: "This policy may be updated in the future. If we make important changes, we will publish the latest version at this same URL."
        },
        {
          title: "13. Contact",
          body: "If you have questions about privacy or personal data related to Hi Emi, you can write to camilo.ibarray@gmail.com."
        }
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
  const mode = document.body.dataset.page;
  if (mode === "support" || mode === "privacy") return mode;
  return "marketing";
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

function privacyHref(language) {
  return `${PRIVACY_URL}?lang=${language}`;
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
    [common.openPrivacy, privacyHref(language)],
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
            ${mode === "support"
              ? common.openMarketing
              : mode === "privacy"
                ? common.openSupport
                : common.openSupport}
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
            : mode === "support"
              ? html`
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
              : html`
                <div className="hero-side">
                  <article className="glass-card highlight-card">
                    <h2>${copy.lastUpdatedLabel}</h2>
                    <p>${copy.lastUpdatedDate}</p>
                    <div className="memory-stack">
                      ${copy.sections.slice(0, 3).map(
                        (section) => html`
                          <div className="memory-item" key=${section.title}>
                            <div className="memory-icon">🔒</div>
                            <div>
                              <strong>${section.title}</strong>
                              <span>${section.body}</span>
                            </div>
                          </div>
                        `
                      )}
                    </div>
                  </article>
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
          : mode === "support"
            ? html`
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
            : html`
              <section className="page-section">
                <div className="section-header">
                  <h2>${copy.lastUpdatedLabel}: ${copy.lastUpdatedDate}</h2>
                  <p>
                    ${language === "es"
                      ? "Esta página está pensada para usarse como Privacy Policy URL pública en App Store Connect."
                      : "This page is intended to be used as the public Privacy Policy URL in App Store Connect."}
                  </p>
                </div>
                <div className="feature-grid">
                  ${copy.sections.map(
                    (section) => html`
                      <article className="feature-card" key=${section.title}>
                        <h3>${section.title}</h3>
                        <p>${section.body}</p>
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
            <p>${common.privacyUrlLabel}: ${PRIVACY_URL}</p>
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
