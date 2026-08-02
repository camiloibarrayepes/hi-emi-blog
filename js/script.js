const CATEGORY_ICONS = {
  Todos: "⭐",
  Desarrollo: "🌱",
  Alimentación: "🥣",
  Sueño: "🌙",
  Juegos: "🧩"
};

const CATEGORY_LABELS = {
  es: {
    Todos: "Todos",
    Desarrollo: "Desarrollo",
    Alimentación: "Alimentación",
    Sueño: "Sueño",
    Juegos: "Juegos"
  },
  en: {
    Todos: "All",
    Desarrollo: "Development",
    Alimentación: "Feeding",
    Sueño: "Sleep",
    Juegos: "Play"
  }
};

const UI = {
  es: {
    pageTitle: "Consejos | Hi Emi",
    loading: "Cargando consejos...",
    notice: "El contenido es informativo y no sustituye la orientación de un pediatra o profesional de la salud.",
    readMore: "Leer más →",
    source: "Fuente",
    adTitle: "Aquí tu publicidad",
    adDescription: "Conecta tu marca con familias interesadas en el bienestar de sus pequeños.",
    adButton: "Conoce más"
  },
  en: {
    pageTitle: "Tips | Hi Emi",
    loading: "Loading tips...",
    notice: "This content is for informational purposes only and does not replace guidance from a pediatrician or healthcare professional.",
    readMore: "Read more →",
    source: "Source",
    adTitle: "Your ad here",
    adDescription: "Connect your brand with families who care about their little ones' well-being.",
    adButton: "Learn more"
  }
};

let articles = [];
let selectedCategory = "Todos";

const language = resolveLanguage();
const categoriesElement = document.getElementById("categories");
const feedElement = document.getElementById("feed");
const ui = UI[language] ?? UI.es;

document.documentElement.lang = language;
document.title = ui.pageTitle;

async function loadArticles() {
  feedElement.innerHTML = `<div class="loading">${ui.loading}</div>`;

  try {
    articles = await loadLocalizedArticles();
    renderCategories();
    renderFeed();
    renderNotice();
  } catch (error) {
    feedElement.innerHTML = `<div class="error-state">${error.message}</div>`;
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
      if (!response.ok) throw new Error(`No fue posible cargar los artículos desde ${path}.`);
      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("No fue posible cargar los artículos.");
}

function renderCategories() {
  const categories = ["Todos", ...new Set(
    articles.filter(item => item.type !== "ad").map(item => item.category)
  )];

  categoriesElement.innerHTML = categories.map(category => `
    <button
      class="category ${category === selectedCategory ? "active" : ""}"
      type="button"
      data-category="${category}"
    >
      ${CATEGORY_ICONS[category] ?? "✨"} ${categoryLabel(category)}
    </button>
  `).join("");

  document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.category;
      renderCategories();
      renderFeed();
    });
  });
}

function renderFeed() {
  const filtered = articles.filter(item => {
    if (item.type === "ad") return selectedCategory === "Todos";
    return selectedCategory === "Todos" || item.category === selectedCategory;
  });

  feedElement.innerHTML = filtered.map(item => {
    if (item.type === "ad") return adTemplate(item);
    return articleTemplate(item);
  }).join("");
}

function articleTemplate(article) {
  return `
    <article class="article-card">
      <div class="article-image">
        <img src="${article.image}" alt="" loading="lazy">
      </div>

      <div class="article-body">
        <div class="article-meta">
          <span class="tag">
            ${CATEGORY_ICONS[article.category] ?? "✨"} ${categoryLabel(article.category)}
          </span>
          <span class="date">${article.date}</span>
        </div>

        <h2 class="article-title">${article.title}</h2>
        <p class="article-summary">${article.summary}</p>

        <div class="article-footer">
          <a class="read-more" href="${articleLink(article.id)}">
            ${ui.readMore}
          </a>
          <span class="source">${ui.source}: ${article.source}</span>
        </div>
      </div>
    </article>
  `;
}

function adTemplate(ad) {
  return `
    <aside class="ad-card">
      <div class="ad-icon">📣</div>
      <div>
        <h2>${ui.adTitle}</h2>
        <p>${ui.adDescription}</p>
      </div>
      <a class="ad-button" href="${ad.url}">${ui.adButton}</a>
    </aside>
  `;
}

function renderNotice() {
  const notice = document.querySelector(".notice");
  if (notice) notice.textContent = ui.notice;
}

function categoryLabel(category) {
  return CATEGORY_LABELS[language]?.[category] ?? category;
}

function articleLink(id) {
  const url = new URL("./article.html", window.location.href);
  url.searchParams.set("id", String(id));
  url.searchParams.set("lang", language);
  return `./article.html?id=${encodeURIComponent(id)}&lang=${language}`;
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

loadArticles();
