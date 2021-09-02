"use strict";
const link = document.querySelector(".linksWrapper").children;
const input = document.getElementById("search");
const btn = document.getElementById("seacrhBtn");
const btnMobile = document.querySelector(".bi-search");
let type = "anime";

for (let e of link) {
  e.addEventListener("click", () => {
    for (let el of link) el.classList.remove("active");
    e.classList.add("active");
    input.placeholder = `Search ${e.textContent}...`;
    type = e.textContent.toLowerCase();
  });
}

btnMobile.addEventListener("click", async () => {
  const body = document.getElementById("body");
  const value = input.value.trim();
  body.innerHTML = '<div class="loadWrapper"><p>Loading...</p></div>';
  const data = await getData(type, value);
  const fragments = getFragment(data.results, type);
  body.innerHTML = new String();
  fragments.forEach((e) => {
    body.innerHTML += e;
  });
  input.value = "";
});

input.addEventListener("keyup", async () => {
  if (event.keyCode === 13) {
    const body = document.getElementById("body");
    const value = input.value.trim();
    body.innerHTML = '<div class="loadWrapper"><p>Loading...</p></div>';
    const data = await getData(type, value);
    const fragments = getFragment(data.results, type);
    body.innerHTML = new String();
    fragments.forEach((e) => {
      body.innerHTML += e;
    });
    input.value = "";
  }
});

btn.addEventListener("click", async () => {
  const body = document.getElementById("body");
  const value = input.value.trim();
  body.innerHTML = '<div class="loadWrapper"><p>Loading...</p></div>';
  const data = await getData(type, value);
  const fragments = getFragment(data.results, type);
  body.innerHTML = new String();
  fragments.forEach((e) => {
    body.innerHTML += e;
  });
  input.value = "";
});

function getData(type, value) {
  return fetch(`https://api.jikan.moe/v3/search/${type}?q=${value}`).then((e) =>
    e.json()
  );
}

function getFragment(obj, type) {
  if (obj == undefined) {
    return [
      '<div class="loadWrapper"><p>error.. <br><b>30 requests</b> / minute <br><b>2 requests</b> / second  </p>',
    ];
  }
  const frag = obj.map((e) => {
    if (type === "anime") {
      console.log(type);
      return ` <div class="myCard">
                <div class="imgwrapper">
                  <img
                    src="${e.image_url}"
                  />
                </div>
                <div class="cardContent">
                  <h2 class="title">${e.title}</h2>
                  <p class="synopsis">
                ${e.synopsis}
                  </p>
                  <div class="links">
                    <a href="${e.url}" class="myAnime" target="_blank" title="my anime list">more info</a>
                    <span class="episode"><span id="eps">${e.episodes}</span> Episodes</span>
                  </div>
                  <span class="type">${e.type}</span>
                  <span class="score">${e.score} <i class="bi bi-star-fill star"></i></span>
                </div>
              </div>`;
    } else {
      return ` <div class="myCard">
                <div class="imgwrapper">
                  <img
                    src="${e.image_url}"
                  />
                </div>
                <div class="cardContent">
                  <h2 class="title">${e.title}</h2>
                  <p class="synopsis">
                    ${e.synopsis}
                  </p>
                  <div class="links">
                    <a
                      href="${e.url}"
                      class="myAnime"
                      target="_blank"
                      title="my anime list"
                      >more info</a
                    >
                    <span class="episode"><span id="eps">${e.chapters}</span> Chapters</span>
                    <span class="volume"><span id="vol">${e.volumes}</span> Volumes</span>
                  </div>
                  <span class="type">${e.type}</span>
                  <span class="score">${e.score} <i class="bi bi-star-fill star"></i></span>
                </div>
              </div>`;
    }
  });
  return frag;
}
