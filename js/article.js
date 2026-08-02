const CATEGORY_ICONS = {
  Desarrollo: "🌱",
  Alimentación: "🥣",
  Sueño: "🌙",
  Juegos: "🧩"
};

const CATEGORY_LABELS = {
  es: {
    Desarrollo: "Desarrollo",
    Alimentación: "Alimentación",
    Sueño: "Sueño",
    Juegos: "Juegos"
  },
  en: {
    Desarrollo: "Development",
    Alimentación: "Feeding",
    Sueño: "Sleep",
    Juegos: "Play"
  }
};

const UI = {
  es: {
    articleTitle: "Artículo | Hi Emi",
    loading: "Cargando artículo...",
    noId: "No se indicó qué artículo abrir.",
    cannotLoad: "No fue posible cargar el artículo.",
    missing: "El artículo no existe o fue eliminado.",
    notFoundTitle: "No pudimos abrir este artículo",
    backHome: "Volver a consejos",
    readingTime: "min de lectura",
    source: "Fuente",
    like: "♡ Me gustó",
    liked: "♥ Guardado",
    share: "↗ Compartir",
    tipLabel: "💜 Consejo Hi Emi",
    relatedTitle: "También te puede interesar",
    copied: "Enlace copiado."
  },
  en: {
    articleTitle: "Article | Hi Emi",
    loading: "Loading article...",
    noId: "No article was selected.",
    cannotLoad: "We couldn't load the article.",
    missing: "The article doesn't exist or was removed.",
    notFoundTitle: "We couldn't open this article",
    backHome: "Back to tips",
    readingTime: "min read",
    source: "Source",
    like: "♡ Like it",
    liked: "♥ Saved",
    share: "↗ Share",
    tipLabel: "💜 Hi Emi tip",
    relatedTitle: "You may also like",
    copied: "Link copied."
  }
};

const language = resolveLanguage();
const ui = UI[language] ?? UI.es;
const root = document.getElementById("articleRoot");
const backButton = document.getElementById("backButton");
const articleToolbar = document.getElementById("articleToolbar");

document.documentElement.lang = language;
document.title = ui.articleTitle;

if (backButton) {
  backButton.setAttribute("aria-label", text("Volver", "Back"));
  backButton.addEventListener("click", () => {
    const target = new URL("./index.html", window.location.href);
    target.searchParams.set("lang", language);

    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = target.pathname + target.search;
    }
  });
}

function updateToolbarVisibility() {
  if (!articleToolbar) return;

  const isAtTop = window.scrollY <= 10;
  articleToolbar.classList.toggle("hidden", !isAtTop);
}

window.addEventListener("scroll", updateToolbarVisibility, {
  passive: true
});

updateToolbarVisibility();

async function loadArticle() {
  try {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) throw new Error(ui.noId);

    const items = await loadLocalizedArticles();
    const articles = items.filter(item => item.type !== "ad");
    const article = articles.find(item => String(item.id) === String(id));

    if (!article) throw new Error(ui.missing);

    renderArticle(article, articles);
  } catch (error) {
    root.innerHTML = `
      <div class="error-state">
        <h2>${ui.notFoundTitle}</h2>
        <p>${error.message}</p>
        <a class="primary-button" href="${homeLink()}">${ui.backHome}</a>
      </div>
    `;
  }
}

async function loadLocalizedArticles() {
  const paths = [
    `./data/articles.${language}.json`,
    "./data/articles.json"
  ];

  let lastError = null;

  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(ui.cannotLoad);
      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error(ui.cannotLoad);
}

function renderArticle(article, allArticles) {
  document.title = `${article.title} | Hi Emi`;

  const readingTime = calculateReadingTime(article.content);
  const related = allArticles
    .filter(item => item.id !== article.id)
    .filter(item => item.category === article.category)
    .slice(0, 3);

  root.innerHTML = `
    <article>
      <header class="article-header">
        <span class="tag">
          ${CATEGORY_ICONS[article.category] ?? "✨"} ${categoryLabel(article.category)}
        </span>

        <h1>${article.title}</h1>
        <p class="article-subtitle">${article.subtitle ?? article.summary}</p>

        <div class="article-info">
          <span>${article.date}</span>
          <span>•</span>
          <span>${readingTime} ${ui.readingTime}</span>
          <span>•</span>
          <span>${ui.source}: ${article.source}</span>
        </div>
      </header>

      <img class="hero-image" src="${article.image}" alt="">

      <section class="article-content">
        ${renderBlocks(article.content)}
      </section>

      <section class="article-actions">
        <button class="secondary-button" id="likeButton">${ui.like}</button>
        <button class="secondary-button" id="shareButtonBottom">${ui.share}</button>
      </section>

      ${related.length ? `
        <section class="related-section">
          <h2>${ui.relatedTitle}</h2>
          <div class="related-grid">
            ${related.map(item => `
              <a class="related-card" href="${articleLink(item.id)}">
                <img src="${item.image}" alt="">
                <div>
                  <span class="tag">${CATEGORY_ICONS[item.category] ?? "✨"} ${categoryLabel(item.category)}</span>
                  <h3>${item.title}</h3>
                </div>
              </a>
            `).join("")}
          </div>
        </section>
      ` : ""}
    </article>
  `;

  document.getElementById("likeButton")?.addEventListener("click", event => {
    event.currentTarget.textContent = ui.liked;
  });

  document.getElementById("shareButtonBottom")?.addEventListener("click", () => {
    shareArticle(article);
  });
}

function renderBlocks(blocks) {
  return blocks.map(block => {
    switch (block.type) {
      case "heading":
        return `<h2>${block.text}</h2>`;
      case "paragraph":
        return `<p>${block.text}</p>`;
      case "tip":
        return `<div class="tip-box"><strong>${ui.tipLabel}</strong>${block.text}</div>`;
      case "quote":
        return `<blockquote class="quote-box">${block.text}</blockquote>`;
      case "list":
        return `<ul>${block.items.map(item => `<li>${item}</li>`).join("")}</ul>`;
      case "image":
        return `<img class="inline-image" src="${block.src}" alt="${block.alt ?? ""}">`;
      default:
        return "";
    }
  }).join("");
}

function calculateReadingTime(blocks) {
  const text = blocks.map(block => {
    if (block.text) return block.text;
    if (block.items) return block.items.join(" ");
    return "";
  }).join(" ");

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function shareArticle(article) {
  const shareData = {
    title: article.title,
    text: article.summary,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert(ui.copied);
    }
  } catch (error) {
    // The user may have canceled the share dialog.
  }
}

function categoryLabel(category) {
  return CATEGORY_LABELS[language]?.[category] ?? category;
}

function homeLink() {
  const url = new URL("./index.html", window.location.href);
  url.searchParams.set("lang", language);
  return `./index.html?lang=${language}`;
}

function resolveLanguage() {
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get("lang");

  if (langParam === "es" || langParam === "en") {
    return langParam;
  }

  const browserLanguage = (navigator.language || navigator.languages?.[0] || "en").toLowerCase();
  return browserLanguage.startsWith("es") ? "es" : "en";
}

function text(spanish, english) {
  return language === "es" ? spanish : english;
}

loadArticle();
