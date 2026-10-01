const id = new URLSearchParams(window.location.search).get("id");

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

const product = document.querySelector("#product");

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

const backbutton = document.querySelector("#backbutton");
backbutton.addEventListener("click", () => history.back());

function visData(element) {
  console.log(element);
  const tilbudspris = Math.round(element.price - (element.price * element.discount) / 100);
  product.innerHTML = `
            <article class="details">
            <img src=https://kea-alt-del.dk/t7/images/webp/1000/${element.id}.webp alt="produktbillede" />
            <div>
            <h2>${element.brandname}</h2>
            <p>${element.subcategory}</p>
            <h3>${element.productdisplayname}</h3>
            <p>${element.description}</p>
                ${
                  element.discount
                    ? `<p class="tilbudslabel">-${element.discount}%</p>
                 <p>Før kr. ${element.price},- <span class="tilbudspris">Nu ${tilbudspris},-</span></p> `
                    : `<p> kr. ${element.price}, - </p> `
                }
            </div>
        </article>`;
}
