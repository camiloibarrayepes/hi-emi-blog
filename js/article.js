const CATEGORY_ICONS = {
  "Desarrollo": "🌱",
  "Alimentación": "🥣",
  "Sueño": "🌙",
  "Juegos": "🧩"
};

const root = document.getElementById("articleRoot");
const backButton = document.getElementById("backButton");
const shareButton = document.getElementById("shareButton");

backButton.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "./index.html";
  }
});

async function loadArticle() {
  try {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) throw new Error("No se indicó qué artículo abrir.");

    const response = await fetch("./data/articles.json");
    if (!response.ok) throw new Error("No fue posible cargar el artículo.");

    const items = await response.json();
    const articles = items.filter(item => item.type !== "ad");
    const article = articles.find(item => String(item.id) === String(id));

    if (!article) throw new Error("El artículo no existe o fue eliminado.");

    renderArticle(article, articles);
    configureShare(article);
  } catch (error) {
    root.innerHTML = `
      <div class="error-state">
        <h2>No pudimos abrir este artículo</h2>
        <p>${error.message}</p>
        <a class="primary-button" href="./index.html">Volver a consejos</a>
      </div>
    `;
  }
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
          ${CATEGORY_ICONS[article.category] ?? "✨"} ${article.category}
        </span>

        <h1>${article.title}</h1>
        <p class="article-subtitle">${article.subtitle ?? article.summary}</p>

        <div class="article-info">
          <span>${article.date}</span>
          <span>•</span>
          <span>${readingTime} min de lectura</span>
          <span>•</span>
          <span>Fuente: ${article.source}</span>
        </div>
      </header>

      <img class="hero-image" src="${article.image}" alt="">

      <section class="article-content">
        ${renderBlocks(article.content)}
      </section>

      <section class="article-actions">
        <button class="secondary-button" id="likeButton">♡ Me gustó</button>
        <button class="secondary-button" id="shareButtonBottom">↗ Compartir</button>
      </section>

      ${related.length ? `
        <section class="related-section">
          <h2>También te puede interesar</h2>
          <div class="related-grid">
            ${related.map(item => `
              <a class="related-card" href="./article.html?id=${encodeURIComponent(item.id)}">
                <img src="${item.image}" alt="">
                <div>
                  <span class="tag">${CATEGORY_ICONS[item.category] ?? "✨"} ${item.category}</span>
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
    event.currentTarget.textContent = "♥ Guardado";
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
        return `<div class="tip-box"><strong>💜 Consejo Hi Emi</strong>${block.text}</div>`;
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

function configureShare(article) {
  shareButton.addEventListener("click", () => shareArticle(article));
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
      alert("Enlace copiado.");
    }
  } catch (error) {
    // El usuario pudo cancelar el diálogo de compartir.
  }
}

loadArticle();
