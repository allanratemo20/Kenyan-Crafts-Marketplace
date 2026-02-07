// ---------- COOKIES ----------
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(value || "")}${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}

// ---------- VISITOR MESSAGE ----------
function initVisitorGreeting() {
  const msg = document.getElementById("visitor-msg");
  if (!msg) return;

  if (getCookie("visitor")) {
    msg.textContent = "Welcome back! Have a great time 🙂";
    msg.style.color = "green";
  } else {
    setCookie("visitor", "yes", 365);
    msg.textContent = "First time here? Enjoy authentic Kenyan crafts!";
    msg.style.color = "red";
  }
}

// ---------- REGISTRATION ----------
function validateForm() {
  const msg = document.getElementById("form-msg");
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const consent = document.getElementById("consent-check").checked;

  msg.style.color = "red";
  msg.textContent = "";

  if (!consent) {
    msg.textContent = "Please agree to data processing.";
    return false;
  }

  if (name.length < 3) {
    msg.textContent = "Full name must be at least 3 characters.";
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    msg.textContent = "Enter a valid email.";
    return false;
  }

  if (password.length < 8) {
    msg.textContent = "Password must be at least 8 characters.";
    return false;
  }

  msg.style.color = "green";
  msg.textContent = "Registration successful! Redirecting...";

  setTimeout(() => {
    window.location.href = "products.html";
  }, 1000);

  return false; // stop page reload
}

// ---------- COOKIE CONSENT ----------
function acceptConsent() {
  const checkbox = document.getElementById("consent-check");
  if (!checkbox) return;

  if (checkbox.checked) {
    setCookie("consent", "yes", 365);
    alert("Thank you! Consent accepted.");
  } else {
    alert("Please tick the checkbox first.");
  }
}

// ---------- PRODUCT SEARCH ----------
function searchProducts() {
  const query = document.getElementById("search")?.value.toLowerCase() || "";
  const list = document.getElementById("productList");
  if (!list) return;

  const items = list.getElementsByTagName("li");
  for (let item of items) {
    item.style.display = item.textContent.toLowerCase().includes(query) ? "" : "none";
  }
}

// ---------- PRODUCTS ----------
const products = [
  { name: "Woven Maasai Basket", price: 1200, img: "https://images.unsplash.com/photo-1584305570908-259a448c7b11?auto=format&fit=crop&w=400&q=80" },
  { name: "Maasai Beaded Necklace", price: 850, img: "https://images.unsplash.com/photo-1611590027211-b954fd027b51?auto=format&fit=crop&w=400&q=80" },
  { name: "Organic Shea Butter Soap", price: 450, img: "https://sheanutorganix.us/cdn/shop/files/095E962D-7F0D-46BB-B2FB-003BF55B766B.jpg?v=1753334718&width=400" },
];

function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>KSh ${p.price}</p>
    `;
    container.appendChild(div);
  });
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  initVisitorGreeting();
  loadFeaturedProducts();
});
