const socket = io();

const newProductForm = document.getElementById("newProductForm");

newProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(newProductForm);
  const productData = {};

  formData.forEach((value, key) => {
    productData[key] = value;
  });

  socket.emit("new product", productData);
});

socket.on("added product", (newProduct) => {
  const productList = document.getElementById("productList");

  productList.innerHTML += `
        <li class="list-group-item" id="id-${newProduct.id}">
            <div class="d-flex justify-content-between">
              <p class="m-0">${newProduct.title} - $${newProduct.price}</p>
              <button class="btn btn-danger" onclick="deleteProduct(${newProduct.id})">Borrar</button>
            </div>
          </li>
    `;

  newProductForm.reset();
});

function deleteProduct(productID) {
  socket.emit("delete product", { productID: productID });
}

socket.on("deleted product", ({ productID }) => {
  const productToDelete = document.getElementById("id-" + productID);
  productToDelete.remove();
});
