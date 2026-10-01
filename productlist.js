const cat = new URLSearchParams(window.location.search).get("cat");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;

document.querySelector("h2").textContent = cat;

const produktliste = document.querySelector("#produktliste");

document.querySelectorAll("#filter button").forEach((knap = knap.addEventListener("click", filtrer)));

let alleData, udsnit;

const visantal = document.querySelector("#filtre span");
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    alleData = udsnit;
    visData(data);
  });

function filtrer(e) {
  console.log(e.target.textContent);
  const valgt = e.target.textContent;
  if ((valgt = "Alle")) {
    udsnit = alleData;
  } else {
    udsnit = alleData.filter((produkt) => produkt.gender == valgt);
  }
  console.log(alleData, udsnit);
  visData(udsnit);
}

function visData(json) {
  visantal.textContent = json.length;
  //   console.log(json);
  produktliste.innerHTML = "";
  json.forEach((element) => {
    const tilbudspris = Math.round(element.price - (element.price * element.discount) / 100);
    produktliste.innerHTML += `
        <a href=productdetails.html?id=${element.id} class=${element.soldout ? "udsolgt" : ""}>
            <article class="card">
            <img src=https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp alt="produktbillede" />
            <div>
                <h2>${element.productdisplayname}</h2>
                <h3>${element.brandname}</h3>
                ${
                  element.discount
                    ? `<p class="tilbudslabel">-${element.discount}%</p>
                 <p>Før kr. ${element.price},- <span class="tilbudspris">Nu ${tilbudspris},-</span></p> `
                    : `<p> kr. ${element.price}, - </p> `
                }
                <p>${element.gender}</p>
            </div>
        </article>
        </a>`;
  });
}
