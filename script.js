

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days*24*60*60*1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(value || "")}${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0;i<ca.length;i++){
    let c = ca[i].trim();
    if(c.indexOf(nameEQ)===0) return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}

function initVisitorGreeting() {
  const msg = document.getElementById("visitor-msg");
  if(!msg) return;
  if(getCookie("visitor")) {
    msg.textContent = "Welcome!Have a great time:).";
    msg.style.color = "green";
  } else {
    setCookie("visitor", "yes", 365);
    msg.textContent = "First time here? Enjoy exploring authentic Kenyan crafts!";
    msg.style.color = "red";
  }
}

function validateForm() {
  const msg = document.getElementById("form-msg");
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  msg.style.color = "red";
  msg.textContent = "";

  if(name.length < 3) { msg.textContent = "Full name must be at least 3 characters."; return false; }
  if(!email.includes("@") || !email.includes(".")) { msg.textContent = "Please enter a valid email."; return false; }
  if(password.length < 8) { msg.textContent = "Password must be at least 8 characters."; return false; }

  msg.style.color = "green";
  msg.textContent = "Registration successful! (Demo mode)";
  setTimeout(()=>msg.textContent="",5000);
  return false; 

function acceptConsent() {
  const checkbox = document.getElementById("consent-check");
  if(!checkbox) return;
  if(checkbox.checked) {
    setCookie("consent","yes",365);
    alert("Thank you! You accepted our cookie policy.");
  } else {
    alert("Please check the box to agree before proceeding.");
  }
}


function searchProducts() {
  const query = document.getElementById("search")?.value.toLowerCase() || "";
  const list = document.getElementById("productList");
  if(!list) return;
  const items = list.getElementsByTagName("li");
  for(let i=0;i<items.length;i++){
    const text = items[i].textContent.toLowerCase();
    items[i].style.display = text.includes(query)?"":"none";
  }
}

const products = [
  {
    name: "Woven Maasai Basket",
    price: 1200,
    img: "https://images.unsplash.com/photo-1584305570908-259a448c7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Maasai Beaded Necklace",
    price: 850,
    img: "https://images.unsplash.com/photo-1611590027211-b954fd027b51?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Organic Shea Butter Soap",
    price: 450,
    img: "https://sheanutorganix.us/cdn/shop/files/095E962D-7F0D-46BB-B2FB-003BF55B766B.jpg?v=1753334718&width=400"
  },
  {
    name: "Kikoy Table Runner",
    price: 1100,
    img: "https://images.unsplash.com/photo-1582735689365-9d3d8d3d8d3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Hand-carved Wooden Spoon Set",
    price: 600,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];


function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  const featured = products.slice(0, 3);
  featured.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>KSh ${product.price}</p>
    `;
    container.appendChild(div);
  });
}



  container.innerHTML = "";
  featured.forEach(p=>{
    const div = document.createElement("div");
    div.textContent = p;
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  initVisitorGreeting();
  renderFeaturedProducts();
});
