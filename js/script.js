const CATEGORY_ICONS = {
  "Todos": "⭐",
  "Desarrollo": "🌱",
  "Alimentación": "🥣",
  "Sueño": "🌙",
  "Juegos": "🧩"
};

let articles = [];
let selectedCategory = "Todos";

const categoriesElement = document.getElementById("categories");
const feedElement = document.getElementById("feed");

async function loadArticles() {
  try {
    const response = await fetch("./data/articles.json");
    if (!response.ok) throw new Error("No fue posible cargar los artículos.");
    articles = await response.json();
    renderCategories();
    renderFeed();
  } catch (error) {
    feedElement.innerHTML = `<div class="error-state">${error.message}</div>`;
  }
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
      ${CATEGORY_ICONS[category] ?? "✨"} ${category}
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
            ${CATEGORY_ICONS[article.category] ?? "✨"} ${article.category}
          </span>
          <span class="date">${article.date}</span>
        </div>

        <h2 class="article-title">${article.title}</h2>
        <p class="article-summary">${article.summary}</p>

        <div class="article-footer">
          <a class="read-more" href="./article.html?id=${encodeURIComponent(article.id)}">
            Leer más →
          </a>
          <span class="source">Fuente: ${article.source}</span>
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
        <h2>${ad.title}</h2>
        <p>${ad.text}</p>
      </div>
      <a class="ad-button" href="${ad.url}">${ad.buttonText}</a>
    </aside>
  `;
}

loadArticles();
