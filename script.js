window.jsPDF = window.jspdf.jsPDF;
const brand = document.getElementById("getBrandName");
const product = document.getElementById("getProductName");
const price = document.getElementById("getMrp");
const selling = document.getElementById("getSellingPrice");
const lifeSpan = document.getElementById("getLifeSpan");
const category = document.getElementById("getCategory");
const returnPeriod = document.getElementById("getReturnPeriod");
const file = document.getElementById("img");
const stock = document.getElementById("getStock");
const mfg = document.getElementById("getMfg");
const payment = document.getElementById("getPay");
const des = document.getElementById("getDes");
const formList = document.getElementById("list");
const formPop = document.getElementById("myForm");
const popUpDiv = document.getElementById("pop-up-div");
let tbl = document.getElementById("table");

const localStorageStock = JSON.parse(localStorage.getItem("stockData"));
let stockData =
  localStorage.getItem("stockData") !== null ? localStorageStock : [];
// Function to update stock data in Local storage
function updateLocalStorage() {
  localStorage.setItem("stockData", JSON.stringify(stockData));
}

let image = [];
const reader = new FileReader();
file.addEventListener("change", (e) => {
  const file = e.target.files[0];
  reader.addEventListener("load", () => {
    const final = reader.result;
    return (im = image.push(final));
  });
  reader.readAsDataURL(file);
});
addProductsToDom(stockData);
// To validate data and add to localstorage
function addProduct() {
  const price = document.getElementById("getMrp");
  const selling = document.getElementById("getSellingPrice");
  if (
    brand.value.trim() === "" ||
    product.value.trim() === "" ||
    price.value.trim() === "" ||
    price.value == 0 ||
    lifeSpan.value.trim() === "" ||
    category.value.trim() === "" ||
    lifeSpan.value.trim() === "" ||
    category.value.trim() === "" ||
    returnPeriod.value.trim() === "" ||
    image[0] == "" ||
    stock.value === "" ||
    stock.value === 0 ||
    mfg.value === "" ||
    des.value == "" ||
    payment.value == "" ||
    selling.value == 0
  ) {
    return false;
  }
  if (selling.value > price.value) {
    alert(" Selling price cannot be greater than the maximum retail price🚫 ");
    return false;
  } else {
    const productData = {
      id: generateID(),
      brandName: brand.value,
      productName: product.value,
      priceValue: price.value,
      sellingValue: selling.value,
      lifeSpanValue: lifeSpan.value,
      categoryName: category.value,
      return: returnPeriod.value,
      img: image[0],
      stockValue: stock.value,
      mFg: mfg.value,
      pay: payment.value,
      description: des.value,
    };
    const currentData = [];
    currentData.push(productData);
    addProductsToDom(currentData);
    popBtn();
    stockData.push(productData);
    updateLocalStorage();
    image.shift();
    closeForm();
  }
}
// function to add product to DOM
function addProductsToDom(data) {
  closeForm();
  data.forEach((element) => {
    let createList = document.createElement("div");
    createList.className = "item";
    createList.id = `item`;
    createList.innerHTML = `
  <span class="actionBtn" >
      <i class='bx bxs-edit-alt acc' id="${element.id}" ></i>
      <i class='bx bx-message-alt-x acc' id="${element.id}" ></i>
     </span>
  <img src=${element.img} class="avatar imageL" id="${element.id}">
  <div class="content">
      <table width="100%" cellspacing="0">
          <tr>
              <td >${element.brandName}</td>
              <td>${element.productName} </td>
          </tr>
          <tr>
              <td>₹ ${element.sellingValue}</td>
              <td>${element.pay} 💵</td>
          </tr>
      </table>
  </div>`;
    formList.appendChild(createList);
  });
  getButtonClicked();
  editBtnClicked();
  noData();
  popBtn();
}
// to get buttonClicked ID
function getButtonClicked() {
  const buttons = document.querySelectorAll(".bx-message-alt-x");
  buttons.forEach(function (button) {
    button.onclick = function () {
      const buttonClick = button.id;
      let result = confirm("Are you sure you want to delete this??");
      if (result) {
        deletProduct(buttonClick);
      } else {
        alert("Deletion cancelled.");
      }
      getButtonClicked();
    };
  });
}
getButtonClicked();
// function to delete product
function deletProduct(id) {
  let index = stockData.findIndex((element) => element.id == id);
  stockData.splice(index, 1);
  clearList();
  updateLocalStorage();
  addProductsToDom(stockData);
  popBtn();
  editBtnClicked();
}
function clearList() {
  while (formList.hasChildNodes()) formList.removeChild(formList.lastChild);
}
function editBtnClicked() {
  const buttons = document.querySelectorAll(".bxs-edit-alt");
  buttons.forEach(function (button) {
    button.onclick = function () {
      const buttonClick = button.id;
      updateLocalStorage();
      updateForm(buttonClick);
    };
  });
}
editBtnClicked();
// function to update product by array destructring
function updateForm(id) {
  image.shift();
  openForm();
  document.getElementById("save").style.display = "none";
  document.getElementById("update").style.display = "block";
  let foundedData = stockData.findIndex((stocks) => stocks.id == id); // findIndex
  let data = stockData[foundedData];
  brand.value = data.brandName;
  product.value = data.productName;
  price.value = data.priceValue;
  selling.value = data.sellingValue;
  lifeSpan.value = data.lifeSpanValue;
  category.value = data.categoryName;
  returnPeriod.value = data.return;
  // file.src = data.img;
  stock.value = data.stockValue;
  mfg.value = data.mFg;
  payment.value = data.pay;
  des.value = data.description;
  const update = document.getElementById("update");
  update.onclick = function () {
    if (
      brand.value.trim() === "" ||
      product.value.trim() === "" ||
      price.value.trim() === "" ||
      price.value == 0 ||
      lifeSpan.value.trim() === "" ||
      category.value.trim() === "" ||
      lifeSpan.value.trim() === "" ||
      category.value.trim() === "" ||
      returnPeriod.value.trim() === "" ||
      image[0] == "" ||
      stock.value === "" ||
      stock.value === 0 ||
      mfg.value === "" ||
      des.value == "" ||
      payment.value == "" ||
      selling.value == 0
    ) {
      return false;
    }
    if (selling.value > price.value) {
      alert(
        " Selling price cannot be greater than the maximum retail price🚫 "
      );
      return false;
    } else {
      stockData[foundedData] = {
        ...stockData[foundedData],
        brandName: brand.value,
        productName: product.value,
        priceValue: price.value,
        sellingValue: selling.value,
        lifeSpanValue: lifeSpan.value,
        categoryName: category.value,
        return: returnPeriod.value,
        stockValue: stock.value,
        mFg: mfg.value,
        pay: payment.value,
        description: des.value,
      };
      updateLocalStorage();
      clearList();
      addProductsToDom(stockData);
      image.shift();
    }
  };
}
function popBtn() {
  const buttons = document.querySelectorAll(".imageL");
  buttons.forEach(function (button) {
    button.onclick = function () {
      const buttonClick = button.id;
      productDetailsPop(buttonClick);
    };
  });
}
popBtn();
// Product Details Pop
function productDetailsPop(id) {
  document.getElementById("pop-up-div").style.display = "block";
  closeForm();
  let index = stockData.findIndex((element) => element.id == id);
  let data = stockData[index];
  let createform = document.createElement("div");
  createform.className = "form-popup";
  createform.id = "myForm1";
  createform.style.display = "block";
  createform.innerHTML = ` <form class="form-container" id="form-container">
   <button type="button" class="cross" onclick="closePopup()"> x </button>
    <div class="row1">
  <h3>Product Description </h3>
</div>
<div class="row">
<div class="item-pop">
        <img src=${data.img} class="avatar-pop">
        <button type="button" class="demoBtn" id="" onclick="">
         Buy Now
        </button>
        </div>
        <div class="form-group col col1">
        <h3>${data.brandName} ${data.productName}</h3>
        <div class="col-content">
        <h6>${data.categoryName}</h6>
        <h5> <img src="https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/64/null/external-price-online-shop-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png"/ width=30px> MRP ₹<del>${data.priceValue}</del></h5>
        <h5><img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/null/external-rupees-charity-kiranshastry-lineal-kiranshastry-1.png"/width=30px> ₹ ${data.sellingValue} only</h5>
        <h5> <img src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/68/null/external-Description-human-resources-smashingstocks-mixed-smashing-stocks.png"/ width=30px> ${data.description}</h5>
        <h5><img src="https://img.icons8.com/ios/50/null/recycle-sign.png"/width=30px> ${data.lifeSpanValue}</h5>
        <h5><img src="https://img.icons8.com/ios/50/null/card-in-use.png"/ width=30px> ${data.pay}</h5>
        <h5><img src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/null/external-In-Stock-miscellany-texts-and-badges-bearicons-detailed-outline-bearicons.png"/ width=30px> ${data.stockValue} Unit</h5>
        <h5><img src="https://img.icons8.com/dotty/80/null/return.png"/ width=30px> ${data.return} Available</h5>
        </div>
        </div>
        </div> </form>`;
  body.appendChild(createform);
}
function closePopup() {
  document.getElementById("myForm1").remove();
  popUpDiv.style.display = "none";
  closePopup();
}
/// Basic script for animation and dark mode functionality
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
});
// to open add product form button
function openForm() {
  editBtnClicked();
  document.getElementById("div-pop").style.display = "block";
  document.getElementById("myForm").style.display = "block";
  document.getElementById("save").style.display = "block";
  document.getElementById("update").style.display = "none";
}
// To close Form
function closeForm() {
  document.getElementById("form-container").reset();
  document.getElementById("myForm").style.display = "none";
  document.getElementById("div-pop").style.display = "none";
}
document.getElementById("next").onclick = function () {
  const widthItem = document.querySelector(".item").offsetWidth;
  document.getElementById("formList").scrollLeft += widthItem;
};
document.getElementById("prev").onclick = function () {
  const widthItem = document.querySelector(".item").offsetWidth;
  document.getElementById("formList").scrollLeft -= widthItem;
};
// To generate unique id
function generateID() {
  return Math.floor(Math.random() * 100000000);
}
// To show Active tab
var btnss = document.getElementsByClassName("nav-link");
for (var i = 0; i < btnss.length; i++) {
  btnss[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
// for no data found, create
function noData() {
  const divElement = document.getElementById("list"); // select the div element by its ID
  if (divElement.childElementCount === 0) {
    // check if it has any child elements
    document.getElementById("navBtn").style.display = "none";
    let createNoData = document.createElement("div");
    createNoData.className = "noData";
    createNoData.id = "no-data";
    createNoData.innerHTML = `<h1 class="no-data-found"> No Data Found! </h1>`;
    divElement.appendChild(createNoData);
  } else {
    document.getElementById("navBtn").style.display = "block";
    // document.getElementById("no-data").style.display = "none";
    const elementsToHide = document.querySelectorAll(".noData");
    for (const element of elementsToHide) {
      element.style.display = "none";
    }
  }
}

var formDiv = document.getElementById("formList");
var navBtn = document.getElementById("navBtn");
var stockDiv = document.getElementById("stockDetails");
var stockBtn = document.getElementById("addStockBtn");
let greetMsg = document.getElementById("greet");
var today = new Date();
var weekday_num = today.getDay();
var weekday_names = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var weekday_name = weekday_names[weekday_num];
var day = today.getDate();
var month = today.getMonth() + 1; // add 1 because getMonth() returns a zero-based index
var year = today.getFullYear();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month1 = months[new Date().getMonth()];
var formatted_date = day + " " + month1 + ", " + year + ", " + weekday_name;
const now = new Date();
const istOffset = 330; // IST offset from UTC in minutes
const istTime = new Date(now.getTime() + istOffset * 60 * 1000);
const hour = istTime.getHours();
let greeting;
if (hour >= 4 && hour < 12) {
  greeting = "Good morning! Mr.Arnab";
} else if (hour >= 12 && hour < 16) {
  greeting = "Good afternoon! Mr.Arnab";
} else if (hour >= 16 && hour < 20) {
  greeting = "Good evening! Mr.Arnab";
} else {
  greeting = "Good night! Mr.Arnab";
}
// Home button
let homePage = () => {
  stockBtn.style.display = "block";
  stockDiv.style.display = "none";
  formDiv.style.display = "block";
  navBtn.style.display = "block";
  document.getElementById("billingDiv").style.display = "none";
};
// Stock details
function stockDetails() {
  stockBtn.style.display = "none";
  formDiv.style.display = "none";
  navBtn.style.display = "none";
  stockDiv.style.display = "block";
  document.getElementById("time").innerHTML = formatted_date;
  document.getElementById("billingDiv").style.display = "none";
  greetMsg.innerHTML = greeting;
  showStock();
}
// Extract out data by categories of the specified produc types.
let filterStockValue = [];
let arr = [
  "Fruits and Vegetables",
  "Dairy and Eggs",
  "Mobiles & Electronic",
  "Men Clothing",
  "Women Clothing",
  "Acessories",
  "Household",
];
let num = 1;
function showStock() {
  num = 1;
  while (filterStockValue.length > 0) {
    filterStockValue.pop();
  }
  while (tbl.hasChildNodes()) tbl.removeChild(tbl.lastChild);
  arr.forEach(extractData);
  showChart();
}
function extractData(category) {
  let extractedData = stockData.filter((x) => x.categoryName === category);
  const values = extractedData.map((x) => x.stockValue);
  let flatArray = [].concat(...values);
  let sum = flatArray.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue);
  }, 0);
  let id = num++;
  let percentLeft = (sum / 350) * 100;
  let perValue = Math.floor(percentLeft);
  filterStockValue.push(sum);
  let createTD = document.createElement("tr");
  createTD.className = "delet";
  createTD.innerHTML = `<td>${pad(id)}</td>
<td>${category}</td>
<td>${pad(perValue)} %</td>
<td>${sum}</td>
<td>350</td>`;
  tbl.appendChild(createTD);
}
function showChart() {
  const ctx = document.getElementById("myChart");
  let lineChart = new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: [
        "Fruits & Vegetables",
        "Dairy and Eggs",
        "Mobiles & Electronic",
        "Men Clothing",
        "Women Clothing",
        "Acessories",
        "Household",
      ],
      datasets: [
        {
          label: "Available Stock 🛍️",
          data: [...filterStockValue],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  return lineChart;
}
function billing() {
  stockBtn.style.display = "none";
  formDiv.style.display = "none";
  navBtn.style.display = "none";
  stockDiv.style.display = "none";
  document.getElementById("billingDiv").style.display = "block";
}
function closeDiv() {
  // Add item to the Billing Information table
  getPurchaseMrp.className = "form-control";
  document.getElementById("bill-Container").style.display = "none";
  document.getElementById("bill-pop-up-div").style.display = "none";
  clearOption();
}
function addItem() {
  // Add item to the Billing Information
  document.getElementById("bill-pop-up-div").style.display = "block";
  document.getElementById("bill-Container").style.display = "block";
  document.getElementById("billForm").reset();
}
const categoryDrop = document.getElementById("get-category-drop");
const itemDrop = document.getElementById("getPurchaseProduct");
categoryDrop.addEventListener("change", () => {
  const index = stockData.filter((x) => x.categoryName === categoryDrop.value);
  clearOption();
  const options = index.map((element) => `<option value="${element.brandName}">${element.brandName}</option>`);
  itemDrop.innerHTML = options.join("");
});

const getPurchaseMrp = document.getElementById("getPurchaseMrp");
const getPurchasePrice = document.getElementById("getPurchasePrice");
const getBillQuantity = document.getElementById("getBillQuantity");
const tableForBill = document.getElementById("tableForBill");
const warning = document.getElementById("warning");
let mrpArray = [];
let priceArray = [];
itemDrop.addEventListener("change", () => {
  let element = stockData.find((x) => x.brandName === itemDrop.value);
  getPurchaseMrp.value = element.priceValue;
  getPurchaseMrp.className = "form-control mrp";
  getPurchasePrice.value = element.sellingValue;

  getBillQuantity.addEventListener("change", () => {
    if (getBillQuantity.value <= 10) {
      warning.className = "";
      getBillQuantity.className = "form-control";
      warning.innerHTML = "Quantity:";
    } else {
      warning.className = "warning";
      getBillQuantity.className = "form-control warningBorder";
      warning.innerHTML = "Value should between 1 to 10 😒";
      return false;
    }
  });
});

let productStockToBeUpdate = [];
let count = 1;
function addProductToBill() {
  if (!categoryDrop.value || !itemDrop.value || getBillQuantity.value > 10) {
    return false;
  }
  let id = count++;
  let tdList = `<td id="count">0${id}</td>
                <td>${categoryDrop.value}</td>
                <td>${itemDrop.value}</td>
                <td>${pad(getBillQuantity.value)} Unit</td>
                <td>₹ ${getPurchaseMrp.value}</td>
                <td>₹ ${getPurchasePrice.value}</td>`;
  tableForBill.insertAdjacentHTML("beforeend", `<tr>${tdList}</tr>`);
  
  productStockToBeUpdate.push(itemDrop.value);
  mrpArray.push(getPurchaseMrp.value * getBillQuantity.value);
  priceArray.push(getPurchasePrice.value * getBillQuantity.value);
  finalBill();
  closeDiv();
}

function clearOption() {
  itemDrop.options.length = 1;
}
function pad(d) {
  return d < 10 ? "0" + d.toString() : d.toString();
}
let invoiceData = {
  customer: {},
  item: [],
  total: 0,
};
function finalBill() {
  const finalBillPrice = priceArray.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
  const discount = 0.1;
  const discountedPrice = finalBillPrice * (1 - discount);
  const gst = 0.04;
  const finalPrice = discountedPrice * (1 + gst);
  const itemCount = mrpArray.length;
  const item = {
    id: itemCount,
    Category: categoryDrop.value,
    productName: itemDrop.value,
    unit: getBillQuantity.value,
    mrp: getPurchaseMrp.value,
    price: getPurchasePrice.value,
  };
  invoiceData.item.push(item);
  invoiceData.total = finalPrice;
  document.getElementById("discount").innerHTML = ` 10 %`;
  document.getElementById("totalPrice").innerHTML = `₹ ${finalBillPrice} `;
  document.getElementById("finalPrice").innerHTML = `₹ ${Math.floor( finalPrice )}`;
  document.getElementById("tax").innerHTML = ` 4 % GST`;
  document.getElementById("itemCount").innerHTML = `${pad(itemCount)}`;
}


function save() {
  const tdList = tableForBill.getElementsByTagName("td");
  if (tdList.length <= 0) {
    alert("Please add Product 🛒😒 ");
  } else {
    const doc = new jsPDF();
    doc.setFont("helvetica").setFontSize(18).setTextColor("#3C3C3C").text("The Indian Mart", 14, 22);
    doc.setFontSize(12).text(`Customer Name: ${invoiceData.customer.name}`, 14, 40)
      .text(`Customer Email: ${invoiceData.customer.email}`, 14, 48)
      .text(`Customer Address: ${invoiceData.customer.address}`, 14, 56);
    doc.setFontSize(14).setTextColor("#000000").text("ID", 14, 80)
      .text("Category", 24, 80).text("Product Name", 60, 80)
      .text("Quantity", 107, 80).text("Product MRP", 136, 80)
      .text("Mart Price", 176, 80);
    let y = 88;
    for (const item of invoiceData.item) {
      doc.setFontSize(10).setTextColor("#3C3C3C")
        .text(item.id.toString(), 14, y).text(item.Category.toString(), 24, y)
        .text(item.productName.toString(), 60, y).text(item.unit.toString(), 107, y)
        .text(item.mrp.toString(), 136, y).text(item.price.toString(), 176, y);
      y += 8;
    }
    doc.setFontSize(16).text(` Total:  $${invoiceData.total.toFixed(2)}`, 14, y + 16);
    productStockToBeUpdate.forEach(updateStock);
    doc.save("invoice.pdf");
  }
}

function updateStock(product) {
  const index = stockData.findIndex((x) => x.brandName === product);
  if (index !== -1) {
    stockData.splice(index, 1, {
      ...stockData[index],
      stockValue: stockData[index].stockValue - getBillQuantity.value,
    });
    updateLocalStorage();
  }
}
