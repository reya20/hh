const products = [
  {
    id: 1,
    name: "Coca-cola",
    price: 1,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUiPKyhaBkGNsFhNrTNDdSvGbKV-bi8Jppg&s",
  },
  {
    id: 2,
    name: "Prime",
    price: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUqPEl0BWgokfIVaqD8X5Trg3pXquLF05kLg&s",
  },
  {
    id: 3,
    name: "Monster Energy Drink",
    price: 2.5,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJbeo9SwxxGqzceyQDVkmq9VZ3UTODrEbV9Q&s",
  },
  {
    id: 4,
    name: "Red Bull Drink",
    price: 2.5,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS58KI_Fyb_D6zHZNdz8bjnrR6kY1rc_QHBkw&s",
  },
  {
    id: 5,
    name: "7 up",
    price: 2.5,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE5iKRUaHZvb3CLA9jbIh0VuNqEqMiGYDbkA&s",
  },
  {
    id: 6,
    name: "G-Sport",
    price: 4,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSvSPcljNoJnoK0EQ5G1GETXxg_kc9wvih4Q&s",
  },
  {
    id: 7,
    name: "Sting",
    price: 1,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwxhvfjZBNKCEqQImYfmvsNDzG1r7DiWdWXA&s",
  },
  {
    id: 8,
    name: "Provida",
    price: 1,
    img: "https://tse4.mm.bing.net/th/id/OIP.B4B5BPMlEPE29MY-U9HD4QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 9,
    name: "Power RDE",
    price: 2.5,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWPsU_--EzuLEEbZ6Lpi1RD_ry8ukje5n1pQ&s",
  },
  {
    id: 10,
    name: "GOYA Europa",
    price: 2.6,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoIui36ISem7aTb7uWdBr6YqKBUHIRxhf5Iw&s",
  },
  {
    id: 11,
    name: "Shilajit",
    price: 1.6,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAVDf5rMcB78yzZXcwZx3Vm_Fuh9X7sYlEtQ&s",
  },
  {
    id: 12,
    name: "Gora Europa",
    price: 3.26,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoar88Sg2DwIFO0zTj1stCI-_-HRtrFx_Txw&s",
  },
  {
    id: 13,
    name: "NOOCCO",
    price: 1.6,
    img: "https://proteinpackage.co.uk/cdn/shop/files/NOCCO-Berry-Rhubarb-BCAA-Energy-Drinks-330ml-Can_1200x.png?v=1742401912",
  },
  {
    id: 14,
    name: "XA Europa",
    price: 3.86,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSKf1Axa0BbIG-x7iz3pM0TUBBGmbzGGJ_qg&s",
  },
  {
    id: 15,
    name: "MI Drink",
    price: 1.96,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNDby2s_-IkZ59bEZuQHbNqjgvJM8uDqTWUw&s",
  },
];

let cart = JSON.parse(localStorage.getItem("myCartData")) || [];

function displayProducts(searchTerm = "") {
  const productGrid = document.getElementById("product-grid");
  if (!productGrid) return;
  productGrid.innerHTML = "";
  const lowerSearch = searchTerm.toLowerCase();

  products.forEach((product) => {
    if (searchTerm && !product.name.toLowerCase().includes(lowerSearch)) return;
    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => addToCart(product.id);
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
    `;
    productGrid.appendChild(card);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const itemInCart = cart.find((item) => item.id === productId);
  if (itemInCart) {
    itemInCart.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartBody = document.getElementById("cart-body");
  const grandTotalLabel = document.getElementById("grand-total");
  if (!cartBody) return;

  localStorage.setItem("myCartData", JSON.stringify(cart));
  cartBody.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const amount = item.price * item.qty;
    total += amount;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="font-weight: 600; color: #1e293b;">${item.name}</td>
      <td style="color: #64748b;">$${item.price.toFixed(2)}</td>
      <td style="text-align: center;">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1); event.stopPropagation();">-</button>
        <span style="margin: 0 10px; font-weight: 700; color: #0f172a;">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1); event.stopPropagation();">+</button>
      </td>
      <td style="text-align: right; font-weight: 700; color: #0f172a;">$${amount.toFixed(2)}</td>
    `;
    cartBody.appendChild(row);
  });

  if (cart.length > 0) {
    const clearRow = document.createElement("tr");
    clearRow.innerHTML = `
      <td colspan="4" style="text-align: left; padding-top: 14px; border: none;">
        <span onclick="clearEntireCart()" style="color: #ef4444; cursor: pointer; font-weight: 700; text-decoration: none; font-size: 12px; display: inline-flex; align-items: center; gap: 4px;">
          ❌ Clear All Items
        </span>
      </td>
    `;
    cartBody.appendChild(clearRow);
  }
  if (grandTotalLabel) {
    grandTotalLabel.innerText = total.toFixed(2);
  }
}

function changeQty(productId, delta) {
  const itemInCart = cart.find((item) => item.id === productId);
  if (itemInCart) {
    itemInCart.qty += delta;
    if (itemInCart.qty <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
  }
  renderCart();
}

function saveCustomerData() {
  if (!cart || cart.length === 0) {
    alert("pls order your drink");
    return;
  }

  const nameInput = document.getElementById("customer-name");
  const emailInput = document.getElementById("customer-email");
  const fromDateInput = document.getElementById("order-date-from");
  const grandTotalElement = document.getElementById("grand-total");
  const grandTotal = grandTotalElement ? grandTotalElement.innerText : "0";

  if (!nameInput.value || !emailInput.value || !fromDateInput.value) {
    alert("Please fill out Name, Email, and From Date fields before saving.");
    return;
  }

  const nameValue = nameInput.value.trim();
  if (nameValue.length === 0) {
    alert("Wrong name! The customer name cannot be left blank.");
    nameInput.focus();
    return;
  }

  const letterPattern = /^[a-zA-Z\s]+$/;
  if (!letterPattern.test(nameValue)) {
    alert("Letters only! Please enter letters only for the Customer Name.");
    nameInput.focus();
    return;
  }

  const emailValue = emailInput.value.trim().toLowerCase();
  if (!emailValue.endsWith("@gmail.com")) {
    alert(
      "You're wrong! Please enter a valid email address ending with @gmail.com",
    );
    return;
  }

  const completeOrder = {
    customerName: nameValue,
    customerEmail: emailValue,
    orderDate: fromDateInput.value,
    cartSnapshot: [...cart],
    totalAmount: parseFloat(grandTotal) || 0,
  };

  const uniqueKey = "order_" + fromDateInput.value + "_" + Date.now();
  localStorage.setItem(uniqueKey, JSON.stringify(completeOrder));
  alert("Order saved successfully!");

  nameInput.value = "";
  emailInput.value = "";
  cart = [];
  renderCart();

  if (document.getElementById("history-log-output")) {
    showSavedData(false);
  }
}

function printDailySalesSummary() {
  const startDateElement = document.getElementById("order-date-from");
  const endDateElement = document.getElementById("order-date-to");

  if (
    !startDateElement ||
    !endDateElement ||
    !startDateElement.value ||
    !endDateElement.value
  ) {
    alert(
      "Please select a valid date range to build a summary statement report.",
    );
    return;
  }

  const startDate = startDateElement.value;
  const endDate = endDateElement.value;
  let totalMoneyEarned = 0;
  let productSalesMap = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("order_")) {
      const order = JSON.parse(localStorage.getItem(key));
      const orderDate = order.orderDate;
      if (orderDate >= startDate && orderDate <= endDate) {
        totalMoneyEarned += parseFloat(order.totalAmount) || 0;
        if (order.cartSnapshot) {
          order.cartSnapshot.forEach((item) => {
            if (!productSalesMap[item.name]) {
              productSalesMap[item.name] = { qty: 0, total: 0 };
            }
            productSalesMap[item.name].qty += item.qty;
            productSalesMap[item.name].total += item.price * item.qty;
          });
        }
      }
    }
  }

  let summaryRowsHtml = "";
  const soldItemNames = Object.keys(productSalesMap);

  if (soldItemNames.length === 0) {
    alert(
      `No sales data recorded in system archives from [${startDate}] to [${endDate}].`,
    );
    return;
  }

  soldItemNames.forEach((name) => {
    const stats = productSalesMap[name];
    summaryRowsHtml += `
      <tr>
        <td class="product-title">${name}</td>
        <td class="text-center highlight-qty">${stats.qty} units</td>
        <td class="text-right product-price">$${stats.total.toFixed(2)}</td>
      </tr>
    `;
  });

  const reportWindow = window.open("", "_blank");
  reportWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Daily Sales Summary Report</title>
      <style>
        body { font-family: sans-serif; padding: 40px; }
        .header { text-align: center; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px; border-bottom: 1px solid #ddd; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
      </style>
    </head>
    <body>
      <div class="header"><h2>Sales Summary Report</h2></div>
      <table>
        <thead><tr><th>Drink Item</th><th>Qty Sold</th><th>Revenue</th></tr></thead>
        <tbody>${summaryRowsHtml}</tbody>
      </table>
      <h3>Grand Total Revenue: $${totalMoneyEarned.toFixed(2)}</h3>
    </body>
    </html>
  `);
  reportWindow.document.close();
  reportWindow.print();
}

function printReceipt() {
  const nameField = document.getElementById("customer-name");
  const emailField = document.getElementById("customer-email");
  const dateField = document.getElementById("order-date-from");
  const totalField = document.getElementById("grand-total");

  const name =
    nameField && nameField.value ? nameField.value : "Walk-in Customer";
  const email = emailField && emailField.value ? emailField.value : "N/A";
  const date =
    dateField && dateField.value
      ? dateField.value
      : new Date().toISOString().split("T")[0];
  const grandTotal = totalField ? totalField.innerText : "0.00";

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let receiptRows = "";
  cart.forEach((item) => {
    const itemTotal = item.price * item.qty;
    receiptRows += `
      <tr>
        <td>${item.name} (${item.qty} x $${item.price.toFixed(2)})</td>
        <td style="text-align: right;">$${itemTotal.toFixed(2)}</td>
      </tr>
    `;
  });

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
    <body>
      <h1>Receipt</h1>
      <p>Date: ${date}</p>
      <p>Customer: ${name}</p>
      <table>${receiptRows}</table>
      <h3>Total: $${grandTotal}</h3>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

function showSavedData(forceShowAll = false) {
  const logOutput = document.getElementById("history-log-output");
  if (!logOutput) return;

  const startDateInput = document.getElementById("order-date-from");
  const endDateInput = document.getElementById("order-date-to");

  const startDate = startDateInput ? startDateInput.value : "";
  const endDate = endDateInput ? endDateInput.value : "";

  logOutput.innerHTML = "";
  let foundRecords = false;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("order_")) {
      const order = JSON.parse(localStorage.getItem(key));
      const cleanRecordDate = order.orderDate.trim();

      if (
        forceShowAll ||
        (!startDate && !endDate) ||
        (cleanRecordDate >= startDate && cleanRecordDate <= endDate)
      ) {
        foundRecords = true;
        const recordDiv = document.createElement("div");
        recordDiv.className = "history-log-row";
        recordDiv.innerHTML = `
          <div class="history-log-left" style="cursor: pointer; flex: 1;" onclick="loadSavedRecord('${key}')">
            <div><strong>📅 ${order.orderDate}</strong> | 👤 ${order.customerName}</div>
            <div style="font-weight: 700; color: #4f46e5;">$${parseFloat(order.totalAmount).toFixed(2)}</div>
          </div>
          <button class="btn-delete-log" onclick="deleteCustomerLog('${key}', event)">🗑️ Delete</button>
        `;
        logOutput.appendChild(recordDiv);
      }
    }
  }
}

function loadSavedRecord(storageKey) {
  const order = JSON.parse(localStorage.getItem(storageKey));
  if (!order) return;
  const nameField = document.getElementById("customer-name");
  const emailField = document.getElementById("customer-email");
  const dateField = document.getElementById("order-date-from");
  if (nameField) nameField.value = order.customerName;
  if (emailField) emailField.value = order.customerEmail;
  if (dateField) dateField.value = order.orderDate;
  cart = order.cartSnapshot || [];
  renderCart();
}

function deleteCustomerLog(storageKey, event) {
  event.stopPropagation();
  if (confirm("Are you sure you want to delete this historical record?")) {
    localStorage.removeItem(storageKey);
    showSavedData(true);
  }
}

function clearEntireCart() {
  if (
    confirm("Are you sure you want to clear all items from the current cart?")
  ) {
    cart = [];
    renderCart();
  }
}

const searchInput = document.getElementById("search-product");
if (searchInput) {
  searchInput.addEventListener("input", (e) => displayProducts(e.target.value));
}

const dateFromElement = document.getElementById("order-date-from");
const dateToElement = document.getElementById("order-date-to");

if (dateFromElement)
  dateFromElement.addEventListener("input", () => showSavedData(false));
if (dateToElement)
  dateToElement.addEventListener("input", () => showSavedData(false));

displayProducts();
renderCart();
if (dateFromElement && !dateFromElement.value)
  dateFromElement.value = new Date().toISOString().split("T")[0];
if (dateToElement && !dateToElement.value)
  dateToElement.value = new Date().toISOString().split("T")[0];
if (document.getElementById("history-log-output")) showSavedData(false);
