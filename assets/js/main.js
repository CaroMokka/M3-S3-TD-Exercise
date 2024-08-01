let form = document.getElementById("form-products");
let btnTotal = document.getElementById("btn-total");

let packageProducts = [];

btnTotal.addEventListener("click", function () {
  let displayTotal = document.querySelector("#display-total");
  displayTotal.textContent = "$" + totalAllProducts(packageProducts);
});

function listTableProducts(packageProducts) {
  document.querySelector("#products-list tbody").innerHTML = "";
  let index = 0;
  while (index < packageProducts.length) {
    let tableProducts = document.querySelector("#products-list tbody");
    let rowProduct = document.createElement("tr");

    let nameProduct = packageProducts[index].product_name;
    let priceProduct = packageProducts[index].product_price;
    let quantityProduct = packageProducts[index].product_quantity;
    let totalPriceByProduct = packageProducts[index].product_total;

    let cellNameProduct = document.createElement("td");
    cellNameProduct.textContent = nameProduct;

    let cellPriceProduct = document.createElement("td");
    cellPriceProduct.textContent = priceProduct;

    let cellQuantityProduct = document.createElement("td");
    cellQuantityProduct.textContent = quantityProduct;

    let cellTotalPriceProduct = document.createElement("td");
    cellTotalPriceProduct.textContent = totalPriceByProduct;

    // Crear fila
    rowProduct.appendChild(cellNameProduct);
    rowProduct.appendChild(cellPriceProduct);
    rowProduct.appendChild(cellQuantityProduct);
    rowProduct.appendChild(cellTotalPriceProduct);

    // Agregar fila al cuerpo de la tabla
    tableProducts.appendChild(rowProduct);

    // Incrementar índice
    index++;
  }
}
function totalPriceByProduct(quantity, price) {
  let totalValueProduct = quantity * price;
  return totalValueProduct;
}
function totalAllProducts(arr) {
  let ac = 0;
  for (let i = 0; i < arr.length; i++) {
    let totalUnitary = arr[i].product_total;
    ac += totalUnitary;
  }
  console.log(ac);
  return ac;
}
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let listProducts = document.getElementById("form-select-product");
  let productSelect = listProducts.value;
  let price = parseInt(document.getElementById("price-product").value);
  let quantity = parseInt(document.getElementById("quantity-product").value);

  //validation form
  if (productSelect === "") {
    return (document.getElementById("msg-product").innerText =
      "Debe seleccionar un producto");
  }
  if (price === "") {
    return (document.getElementById("msg-price").innerText =
      "Debe ingresa un valor");
  }
  if (quantity === "") {
    return (document.getElementById("msg-quantity").innerText =
      "Debe ingresar una cantidad");
  }
  //invocar function para sacar el total por producto
  let totalByProduct = totalPriceByProduct(quantity, price);
  //create product
  const product = {
    product_name: productSelect,
    product_quantity: quantity,
    product_price: price,
    product_total: totalByProduct,
  };

  //add products package
  packageProducts.push(product);
  //clear form
  e.target.reset();
  listTableProducts(packageProducts, quantity, price);
});
