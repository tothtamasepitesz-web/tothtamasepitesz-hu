/* ════════════════════════════════════════════════════════════════
   Tóth Tamás építész — közös oldalscript (minden aloldal ezt tölti be)
   ════════════════════════════════════════════════════════════════ */

/* ── Mobil menü ── */
var mb = document.querySelector('.menu-btn');
if (mb) mb.addEventListener('click', function(){
  document.getElementById('mainnav').classList.toggle('open');
});

/* ── Portfólió szűrő (csak ott fut, ahol van) ── */
document.querySelectorAll('.filters button').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('.filters button').forEach(function(b){b.classList.remove('on')});
    btn.classList.add('on');
    var f = btn.dataset.f;
    document.querySelectorAll('.proj').forEach(function(c){
      c.classList.toggle('hide', f !== 'mind' && c.dataset.cat !== f);
    });
  });
});

/* ── Görgetésre megjelenő szekciók ── */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, {threshold:.1});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
} else {
  document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
}

/* ── Ajánlatkérő űrlap: gombfeliratok + honeypot + thank-you modal ── */
var form = document.getElementById('ajanlatform');
if (form) {
  var sbtn = document.getElementById('submitbtn');
  var ferr = document.getElementById('formerror');

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    ferr.style.display = 'none';

    /* Honeypot: ha a rejtett mező ki van töltve, robot volt */
    if (form.website.value) return;

    if (!form.nev.value.trim() || !form.uzenet.value.trim()) {
      ferr.textContent = 'Hiba történt – próbáld újra';
      ferr.style.display = 'block';
      return;
    }

    sbtn.disabled = true;
    sbtn.textContent = 'Küldés folyamatban...';

    try {
      var body = 'Név: ' + form.nev.value + '%0D%0ATelefon: ' + form.tel.value + '%0D%0A%0D%0A' + encodeURIComponent(form.uzenet.value);
      location.href = 'mailto:info@tothtamasepitesz.hu?subject=' + encodeURIComponent('Konzultáció kérése a weboldalról') + '&body=' + body;

      setTimeout(function(){
        sbtn.textContent = 'Elküldve ✓';
        openThankyou();
        setTimeout(function(){
          sbtn.disabled = false;
          sbtn.textContent = 'Konzultáció kérése';
        }, 4000);
      }, 800);
    } catch (e) {
      sbtn.disabled = false;
      sbtn.textContent = 'Konzultáció kérése';
      ferr.textContent = 'Hiba történt – próbáld újra';
      ferr.style.display = 'block';
    }
  });
}

/* ── Thank-you modal: ESC + háttérkattintás zár, modalra katt nem ── */
var ty = document.getElementById('thankyou');
function openThankyou(){ if (ty) ty.classList.add('is-open'); }
function closeThankyou(){ if (ty) ty.classList.remove('is-open'); }
if (ty) {
  ty.addEventListener('click', function(e){ if (e.target === ty) closeThankyou(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeThankyou(); });
}

/* ── Évszám a láblécben ── */
var yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

/* ── Projektgaléria lightbox (projektoldalakon) ── */
(function(){
  var lb = document.getElementById('lightbox');
  if(!lb) return;
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery .gitem'));
  if(!items.length) return;
  var img = lb.querySelector('.lb-img');
  var idx = 0;
  function show(i){
    idx = (i + items.length) % items.length;
    var a = items[idx];
    img.src = a.getAttribute('data-full') || a.getAttribute('href');
    img.alt = a.querySelector('img') ? a.querySelector('img').alt : '';
  }
  function open(i){ show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function close(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  items.forEach(function(a,i){ a.addEventListener('click', function(e){ e.preventDefault(); open(i); }); });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function(e){ e.stopPropagation(); show(idx-1); });
  lb.querySelector('.lb-next').addEventListener('click', function(e){ e.stopPropagation(); show(idx+1); });
  lb.addEventListener('click', function(e){ if(e.target === lb) close(); });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') close();
    else if(e.key==='ArrowLeft') show(idx-1);
    else if(e.key==='ArrowRight') show(idx+1);
  });
})();

/* ── Kategória-fül előválasztás a menüből (munkak.html#haz stb.) ── */
(function(){
  function applyHashFilter(){
    var map={haz:'haz',tarsashaz:'tarsashaz',ipari:'kozepulet',nyaralo:'nyaralo',kozepulet:'kozepulet',mind:'mind'};
    var key=map[location.hash.replace('#','')];
    if(!key) return;
    var btn=document.querySelector('.filters button[data-f="'+key+'"]');
    if(btn) btn.click();
  }
  applyHashFilter();
  window.addEventListener('hashchange', applyHashFilter);
})();

/* ── Egyképes referencia-kártyák: kattintásra nagyítás (lightbox) a Referenciák oldalon ── */
(function(){
  var lb = document.getElementById('lightbox');
  if(!lb) return;
  var cards = Array.prototype.slice.call(document.querySelectorAll('.proj.lb'));
  if(!cards.length) return;
  var img = lb.querySelector('.lb-img');
  var list = [], idx = 0;
  function visible(){ return cards.filter(function(c){ return !c.classList.contains('hide'); }); }
  function show(i){
    idx = (i + list.length) % list.length;
    var c = list[idx];
    img.src = c.getAttribute('data-full');
    var im = c.querySelector('img'); img.alt = im ? im.alt : '';
  }
  function open(c){ list = visible(); var i = list.indexOf(c); show(i<0?0:i); lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function close(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  cards.forEach(function(c){ c.addEventListener('click', function(e){ e.preventDefault(); open(c); }); });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function(e){ e.stopPropagation(); show(idx-1); });
  lb.querySelector('.lb-next').addEventListener('click', function(e){ e.stopPropagation(); show(idx+1); });
  lb.addEventListener('click', function(e){ if(e.target === lb) close(); });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') close();
    else if(e.key==='ArrowLeft') show(idx-1);
    else if(e.key==='ArrowRight') show(idx+1);
  });
})();
