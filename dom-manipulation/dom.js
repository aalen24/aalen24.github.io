window.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.getElementById("filterContent");
    const newContentForm = document.getElementById("newContent");

    if (filterForm) {
        filterForm.style.display = "none";
    }

    if (newContentForm) {
        newContentForm.style.display = "none";
    }
});

function showFilter() {
    const filterForm = document.getElementById("filterContent");
    const newContentForm = document.getElementById("newContent");

    if (!filterForm) {
        return;
    }

    const isVisible = filterForm.style.display === "block";
    filterForm.style.display = isVisible ? "none" : "block";

    // Keep only one panel visible at a time.
    if (!isVisible && newContentForm) {
        newContentForm.style.display = "none";
    }
}

function filterArticles() {
    const opinionOn = document.getElementById("opinionCheckbox")?.checked ?? true;
    const recipeOn = document.getElementById("recipeCheckbox")?.checked ?? true;
    const updateOn = document.getElementById("updateCheckbox")?.checked ?? true;

    const articles = document.querySelectorAll("#articleList article");

    articles.forEach((article) => {
        if (article.classList.contains("opinion")) {
            article.style.display = opinionOn ? "block" : "none";
        } else if (article.classList.contains("recipe")) {
            article.style.display = recipeOn ? "block" : "none";
        } else if (article.classList.contains("update")) {
            article.style.display = updateOn ? "block" : "none";
        }
    });
}

function showAddNew() {
    const newContentForm = document.getElementById("newContent");
    const filterForm = document.getElementById("filterContent");

    if (!newContentForm) {
        return;
    }

    const isVisible = newContentForm.style.display === "flex";
    newContentForm.style.display = isVisible ? "none" : "flex";

    if (!isVisible && filterForm) {
        filterForm.style.display = "none";
    }
}

function addNewArticle() {
    const titleInput = document.getElementById("inputHeader");
    const textInput = document.getElementById("inputArticle");
    const opinionRadio = document.getElementById("opinionRadio");
    const recipeRadio = document.getElementById("recipeRadio");
    const lifeRadio = document.getElementById("lifeRadio");
    const articleList = document.getElementById("articleList");

    if (!titleInput || !textInput || !articleList) {
        return;
    }

    const title = titleInput.value.trim();
    const articleText = textInput.value.trim();

    if (!title || !articleText) {
        return;
    }

    let articleType = "opinion";
    let markerText = "Opinion";

    if (recipeRadio?.checked) {
        articleType = "recipe";
        markerText = "Recipe";
    } else if (lifeRadio?.checked) {
        articleType = "update";
        markerText = "Update";
    } else if (opinionRadio?.checked) {
        articleType = "opinion";
        markerText = "Opinion";
    }

    const nextIndex = articleList.querySelectorAll("article").length + 1;
    const article = document.createElement("article");
    article.className = articleType;
    article.id = `a${nextIndex}`;

    const marker = document.createElement("span");
    marker.className = "marker";
    marker.textContent = markerText;

    const header = document.createElement("h2");
    header.textContent = title;

    const body = document.createElement("p");
    body.textContent = articleText;

    const readMoreParagraph = document.createElement("p");
    const readMoreLink = document.createElement("a");
    readMoreLink.href = "moreDetails.html";
    readMoreLink.textContent = "Read more...";
    readMoreParagraph.appendChild(readMoreLink);

    article.appendChild(marker);
    article.appendChild(header);
    article.appendChild(body);
    article.appendChild(readMoreParagraph);

    articleList.appendChild(article);

    titleInput.value = "";
    textInput.value = "";
    if (opinionRadio) {
        opinionRadio.checked = true;
    }
    if (recipeRadio) {
        recipeRadio.checked = false;
    }
    if (lifeRadio) {
        lifeRadio.checked = false;
    }

    filterArticles();
}
