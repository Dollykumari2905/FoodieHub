const API = 'http://localhost:5000/api';

let token = localStorage.getItem('token') || null;
let cart = [];

const $ = id => document.getElementById(id);

async function fetchMenu(){
  const res = await fetch(`${API}/menu`);
  const items = await res.json();
  const menu = $('menu');
  menu.innerHTML = '';
  items.forEach(i=>{
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<h4>${i.name}</h4><p>${i.description || ''}</p><p>₹${i.price}</p>
      <input type="number" min="1" value="1" id="qty-${i.id}" style="width:60px" />
      <button data-id="${i.id}" data-price="${i.price}">Add</button>`;
    menu.appendChild(div);
  });

  menu.querySelectorAll('button').forEach(btn=>{
    btn.onclick = ()=>{
      const id = btn.dataset.id;
      const qty = parseInt($(`qty-${id}`).value || 1);
      addToCart(parseInt(id), qty, parseFloat(btn.dataset.price));
    };
  });
}

function addToCart(menu_item_id, quantity, price){
  const existing = cart.find(c=>c.menu_item_id===menu_item_id);
  if(existing) existing.quantity += quantity;
  else cart.push({ menu_item_id, quantity, price });
  renderCart();
}

function renderCart(){
  const list = $('cart-list'); list.innerHTML = '';
  let total=0;
  cart.forEach(it=>{
    total += it.quantity * parseFloat(it.price);
    const li = document.createElement('li');
    li.textContent = `${it.menu_item_id} x${it.quantity} — ₹${(it.quantity*it.price).toFixed(2)}`;
    list.appendChild(li);
  });
  $('cart-total').textContent = total.toFixed(2);
}

async function placeOrder(){
  if(!token){ alert('Login first'); return; }
  if(cart.length===0){ alert('Cart empty'); return; }
  const payload = { items: cart.map(it=>({ menu_item_id: it.menu_item_id, quantity: it.quantity }))};
  const res = await fetch(`${API}/orders`, {
    method:'POST', headers: { 'Content-Type':'application/json', 'Authorization':'Bearer ' + token },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if(res.ok){ alert('Order placed! ID: ' + data.orderId); cart=[]; renderCart(); }
  else alert(data.message || 'Error');
}

async function register(){
  const name = $('reg-name').value, email = $('reg-email').value, password = $('reg-pass').value;
  const res = await fetch(`${API}/auth/register`, {
    method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,password})
  });
  const data = await res.json();
  alert(data.message || 'Registered');
}

async function login(){
  const email = $('login-email').value, password = $('login-pass').value;
  const res = await fetch(`${API}/auth/login`, {
    method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password})
  });
  const data = await res.json();
  if(res.ok){
    token = data.token;
    localStorage.setItem('token', token);
    $('auth').style.display='none';
    $('main').style.display='block';
    await fetchMenu();
  } else alert(data.message || 'Login failed');
}

function logout(){
  token = null; localStorage.removeItem('token');
  $('auth').style.display='block';
  $('main').style.display='none';
}

document.addEventListener('DOMContentLoaded', async ()=>{
  $('btn-register').onclick = register;
  $('btn-login').onclick = login;
  $('btn-place').onclick = placeOrder;
  $('btn-logout').onclick = logout;

  if(token){
    $('auth').style.display='none';
    $('main').style.display='block';
    await fetchMenu();
  }
});
