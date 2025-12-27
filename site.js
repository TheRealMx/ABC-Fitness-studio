const LS_KEYS = {
  cart: "ts_cart",
  newsletter: "ts_newsletter_email",
  feedbacks: "ts_feedbacks"
};
function readJSON(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function writeJSON(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
function subscribeNewsletter(e){ e.preventDefault(); const email=document.getElementById('subscribe-email').value.trim(); if(!email) return false; localStorage.setItem(LS_KEYS.newsletter,email); alert('Thank you for subscribing'); e.target.reset(); return false;}
function addToCart(item){ const cart=readJSON(LS_KEYS.cart,[]); const f=cart.find(i=>i.id===item.id); if(f) f.qty+=1; else cart.push({...item,qty:1}); writeJSON(LS_KEYS.cart,cart); alert('Item added.'); }
function openCart(){ renderCartModal(); const d=document.getElementById('cart-dialog'); if(d.showModal) d.showModal(); else d.setAttribute('open',''); }
function closeCart(){ const d=document.getElementById('cart-dialog'); if(d.close) d.close(); else d.removeAttribute('open'); }
function clearCart(){ writeJSON(LS_KEYS.cart,[]); renderCartModal(); alert('Cart is cleared!'); }
function processOrder(){ const cart=readJSON(LS_KEYS.cart,[]); if(cart.length===0){ alert('Your cart is empty.'); return;} alert('Thank you for your order.'); clearCart(); }
function renderCartModal(){ const cart=readJSON(LS_KEYS.cart,[]); const body=document.getElementById('cart-body'); if(!body) return; if(cart.length===0){ body.innerHTML='<p>Your cart is empty.</p>'; return;} const rows=cart.map(i=>`<tr><td>${i.name}</td><td>${i.qty}</td><td>$ ${i.price.toFixed(2)}</td><td>$ ${(i.price*i.qty).toFixed(2)}</td></tr>`).join(''); const total=cart.reduce((s,i)=>s+i.price*i.qty,0); body.innerHTML=`<table><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr></thead><tbody>${rows}</tbody><tfoot><tr><td colspan="3" style="text-align:right;font-weight:bold;">Total</td><td>$ ${total.toFixed(2)}</td></tr></tfoot></table>`; }
function submitFeedback(e){ e.preventDefault(); const data=Object.fromEntries(new FormData(e.target).entries()); const list=readJSON(LS_KEYS.feedbacks,[]); list.push({...data, submittedAt:new Date().toISOString()}); writeJSON(LS_KEYS.feedbacks,list); alert(`Thank you for your message, ${data.name||'friend'}`); e.target.reset(); return false;}
window.addToCart=addToCart; window.openCart=openCart; window.closeCart=closeCart; window.clearCart=clearCart; window.processOrder=processOrder; window.renderCartModal=renderCartModal; window.submitFeedback=submitFeedback; window.subscribeNewsletter=subscribeNewsletter;