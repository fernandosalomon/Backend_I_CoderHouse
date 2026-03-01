const socket = io();

function validateInputs() {
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const codeInput = document.getElementById("code");
  const stockInput = document.getElementById("stock");
  const categoryInput = document.getElementById("category");
  const thumbnailsInput = document.getElementById("thumbnails");

  const titleInputErrorMsg = document.getElementById("titleErrMsg");
  const descriptionInputErrorMsg = document.getElementById("descriptionErrMsg");
  const priceInputErrorMsg = document.getElementById("priceErrMsg");
  const codeInputErrorMsg = document.getElementById("codeErrMsg");
  const stockInputErrorMsg = document.getElementById("stockErrMsg");
  const categoryInputErrorMsg = document.getElementById("categoryErrMsg");
  const thumbnailsInputErrorMsg = document.getElementById("thumbnailsErrMsg");

  let is_valid = true;

  if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚüÜñÑ ]{1,40}$/.test(titleInput.value)) {
    titleInputErrorMsg.innerText =
      "El campo título debe tener entre 1 y 40 caracteres (letras, números o espacios)";
    titleInputErrorMsg.classList = "invalid-feedback d-inline";
    is_valid = false;
  }

  if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚüÜñÑ ]{1,200}$/.test(descriptionInput.value)) {
    descriptionInputErrorMsg.innerText =
      "El campo descripción debe tener entre 1 y 200 caracteres (letras, números o espacios)";
    descriptionInputErrorMsg.classList = "invalid-feedback d-inline";
    is_valid = false;
  }

  if (!/^\d+\.\d{2}$/.test(priceInput.value)) {
    priceInputErrorMsg.innerText =
      "El campo precio debe contener un número con dos cifras decimales";
    priceInputErrorMsg.classList = "invalid-feedback d-inline";
    is_valid = false;
  }

  if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚüÜñÑ-]{1,15}$/.test(codeInput.value)) {
    codeInputErrorMsg.innerText =
      "El campo código debe tener entre 1 y 15 caracteres (letras, números o guiones(-))";
    codeInputErrorMsg.classList = "invalid-feedback d-inline";
    is_valid = false;
  }

  if (!/^(0|[1-9]\d*)$/.test(stockInput.value)) {
    stockInputErrorMsg.innerText =
      "El campo stock debe contener un número entero o cero";
    stockInputErrorMsg.classList = "invalid-feedback d-inline";
    is_valid = false;
  }

  if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚüÜñÑ ]{1,40}$/.test(categoryInput.value)) {
    categoryInputErrorMsg.innerText =
      "El campo categoría debe tener entre 1 y 40 caracteres (letras, números o espacios)";
    categoryInputErrorMsg.classList = "invalid-feedback d-inline";
    is_valid = false;
  }

  if (
    !/^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/.test(
      thumbnailsInput.value,
    )
  ) {
    thumbnailsInputErrorMsg.innerText =
      "El campo thumbnails debe ser una dirección URL válida (http://example.com/image)";
    thumbnailsInputErrorMsg.classList = "invalid-feedback d-inline";
    is_valid = false;
  }

  return is_valid;
}

function resetErrMsg(){
  const titleInputErrorMsg = document.getElementById("titleErrMsg");
  const descriptionInputErrorMsg = document.getElementById("descriptionErrMsg");
  const priceInputErrorMsg = document.getElementById("priceErrMsg");
  const codeInputErrorMsg = document.getElementById("codeErrMsg");
  const stockInputErrorMsg = document.getElementById("stockErrMsg");
  const categoryInputErrorMsg = document.getElementById("categoryErrMsg");
  const thumbnailsInputErrorMsg = document.getElementById("thumbnailsErrMsg");

  titleInputErrorMsg.classList = "d-none";
  descriptionInputErrorMsg.classList = "d-none";
  priceInputErrorMsg.classList = "d-none";
  codeInputErrorMsg.classList = "d-none";
  stockInputErrorMsg.classList = "d-none";
  categoryInputErrorMsg.classList = "d-none";
  thumbnailsInputErrorMsg.classList = "d-none";
}

const newProductForm = document.getElementById("newProductForm");

newProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  resetErrMsg();

  const formData = new FormData(newProductForm);
  const productData = {};

  formData.forEach((value, key) => {
    if (key == "thumbnails") {
      productData["thumbnails"] = [value];
    } else {
      productData[key] = value;
    }
  });

  if(validateInputs()){
    socket.emit("new product", productData);
  }

});

socket.on("added product", (newProduct) => {
  const productTable = document.getElementById("productTable");
  const modalElement = document.getElementById("addNewProductModal");
  const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);

  productTable.innerHTML += `
        <tr id="id-${newProduct.id}">
          <td><img src="${newProduct.thumbnails[0]}" alt="{{this.name}}" style="width: 80px; height: 80px;"></td>
          <td>${newProduct.title}</td>
          <td>${newProduct.category}</td>
          <td>${newProduct.stock}</td>
          <td>$${newProduct.price}</td>
          <td>
            ${newProduct.status == "true" ? '<span class="badge text-bg-success">Habilitado</span>' : '<span class="badge text-bg-danger">Deshabilitado</span>'}
          </td>
          <td><button
              class="btn btn-danger"
              onclick="deleteProduct(${newProduct.id})"
            >Borrar</button></td>
        </tr>
    `;

  newProductForm.reset();
  modal.hide();
});

function deleteProduct(productID) {
  socket.emit("delete product", { productID: productID });
}

socket.on("deleted product", ({ productID }) => {
  const productToDelete = document.getElementById("id-" + productID);
  productToDelete.remove();
});
