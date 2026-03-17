const socket = io();

function validateInputs() {
  const titleInput = document.getElementById("productTitle");
  const descriptionInput = document.getElementById("productDescription");
  const priceInput = document.getElementById("productPrice");
  const codeInput = document.getElementById("productCode");
  const stockInput = document.getElementById("productStock");
  const categoryInput = document.getElementById("productCategory");
  const thumbnailsInput = document.getElementById("productThumbnails");

  const titleInputErrorMsg = document.getElementById("titleErrMsg");
  const descriptionInputErrorMsg = document.getElementById("descriptionErrMsg");
  const priceInputErrorMsg = document.getElementById("priceErrMsg");
  const codeInputErrorMsg = document.getElementById("codeErrMsg");
  const stockInputErrorMsg = document.getElementById("stockErrMsg");
  const categoryInputErrorMsg = document.getElementById("categoryErrMsg");
  const thumbnailsInputErrorMsg = document.getElementById("thumbnailsErrMsg");

  let is_valid = true;

  if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚüÜñÑ. -]{1,40}$/.test(titleInput.value)) {
    titleInputErrorMsg.innerText =
      "El campo título debe tener entre 1 y 40 caracteres (letras, números o espacios)";
    titleInputErrorMsg.classList = "invalid-feedback d-inline";
    is_valid = false;
  }

  if (!/^[A-Za-z0-9áéíóúÁÉÍÓÚüÜñÑ. -]{1,200}$/.test(descriptionInput.value)) {
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

function resetErrMsg() {
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

const openCreateModal = () => {
  document.getElementById("modalTitle").textContent = "Añadir nuevo producto";
  document.getElementById("productForm").reset();

  const modalElement = document.getElementById("productModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

  const productForm = document.getElementById("productForm");
  productForm.addEventListener("submit", createProduct);

  modal.show();
};

const openEditModal = async (product) => {
  document.getElementById("modalTitle").textContent = "Editar Producto";

  document.getElementById("productTitle").value = product.title;
  document.getElementById("productDescription").value = product.description;
  document.getElementById("productCode").value = product.code;
  document.getElementById("productPrice").value = Number(product.price.$numberDecimal).toFixed(2);
  document.getElementById("productStock").value = product.stock;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productThumbnails").value = product.thumbnails[0];

  const modalElement = document.getElementById("productModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

  const productForm = document.getElementById("productForm");

  productForm.addEventListener("submit", (event) =>
    editProduct(event, product._id),
  );

  modal.show();

};

const createProduct = (e) => {
  e.preventDefault();
  resetErrMsg();

  const formData = new FormData(productForm);
  const productData = {};

  formData.forEach((value, key) => {
    if (key == "thumbnails") {
      productData["thumbnails"] = [value];
    } else {
      productData[key] = value;
    }
  });

  if (validateInputs()) {
    socket.emit("new product", productData);
  }
};

const editProduct = (e, productID) => {
  e.preventDefault();
  resetErrMsg();

  const formData = new FormData(productForm);
  const productData = {};

  

  formData.forEach((value, key) => {
    if (key == "thumbnails") {
      productData["thumbnails"] = [value];
    } else {
      productData[key] = value;
    }
  });

  productData["_id"] = productID;
  
  if (validateInputs()) {
    socket.emit("update product", productData);
  }
};

socket.on("added product", (newProduct) => {
 const modalElement = document.getElementById("productModal");
 const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
  const productCardRow = document.getElementById("product-card-wrapper");
  const productCard = document.createElement("div");

  console.log(newProduct);

  productCard.classList = "card d-flex flex-column col-4 mx-2";
  productCard.style = "width: 18rem; height: 420px;";
  productCard.id = `id-${newProduct._id}`;
  productCard.innerHTML = `
    <img
      src=${newProduct.thumbnails[0]}
      class="card-img-top bg-light mt-2"
      alt=${newProduct.title}
      style="min-height: 200px; height: 200px;"
    />
    <div class="card-body flex-grow-1">
      <div class="d-flex justify-content-between">
        <p class="card-text mb-1 text-secondary">${newProduct.category}</p>
        <div>
          <button class="btn p-1" onclick="openEditModal('${newProduct._id}')">
            <i class="bi bi-pencil-square fs-5 text-primary"></i>
          </button>

          <button class="btn p-1" onclick="deleteProduct('${newProduct._id}')">
            <i class="bi bi-trash fs-5 text-danger"></i>
          </button>
        </div>
      </div>
      <h5 class="card-title mb-1 product-name">${newProduct.title}</h5>
      <p class="card-text mb-1 product-stock">In stock: ${newProduct.stock}</p>
      <p class="card-text mb-1 text-success fw-bold product-price">$${Number(newProduct.price.$numberDecimal).toFixed(2)}</p>
    </div>
    <div class="mb-3 d-flex justify-content-between w-100">
      <a href=/product/${newProduct._id} class="btn btn-primary w-100">Ver más</a>
    </div>
  `;

  productCardRow.appendChild(productCard);

  productForm.reset();
  modal.hide();
});

socket.on("updated product", (updatedProduct) => {
  const modalElement = document.getElementById("productModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

  const cardWrapper = document.getElementById("product-card-wrapper");
  const oldCard = document.getElementById(`id-${updatedProduct._id}`)
  const newCard = document.createElement("div");
  newCard.classList = "card d-flex flex-column col-4 mx-2";
  newCard.style = "width: 18rem; height: 420px";
  newCard.id = `id-${updatedProduct._id}`;
  newCard.innerHTML = `
    <img
            src=${updatedProduct.thumbnails[0]}
            class="card-img-top bg-light mt-2"
            alt="${updatedProduct.title}"
            style="min-height: 200px; height: 200px;"
          />
          <div class="card-body flex-grow-1">
            <div class="d-flex justify-content-between align-items-center">
              <p class="card-text mb-1 text-secondary product-category">${updatedProduct.category}</p>
              <div>
                <button class="btn p-1" onclick="openEditModal(${updatedProduct})">
                  <i class="bi bi-pencil-square fs-5 text-primary"></i>
                </button>

                <button class="btn p-1" onclick="deleteProduct('${updatedProduct._id}')">
                  <i class="bi bi-trash fs-5 text-danger"></i>
                </button>
              </div>
            </div>
            <h5 class="card-title mb-1 product-name">${updatedProduct.title}</h5>
            <p class="card-text mb-1 product-stock">In stock: ${updatedProduct.stock}</p>
            <p class="card-text mb-1 text-success fw-bold product-price">$${Number(updatedProduct.price.$numberDecimal).toFixed(2)}</p>
          </div>
          <div class="mb-3 d-flex justify-content-between w-100">
            <a href="/product/${updatedProduct._id}" class="btn btn-primary w-100">Ver más</a>
          </div>
        </div>
  `;
  cardWrapper.replaceChild(newCard, oldCard);
  
  productForm.reset();
  modal.hide();
});

function deleteProduct(productID) {
  socket.emit("delete product", { productID: productID });
}

socket.on("deleted product", ({ productID }) => {
  const productToDelete = document.getElementById("id-" + productID);
  productToDelete.remove();
});
