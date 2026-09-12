(() => {
  const depop = 'https://www.depop.com/4080super/';
  const ebay = 'https://www.ebay.com/usr/4080super';
  const sidebar = document.querySelector('.sidebar');
  const shops = sidebar.querySelector('.shop-list');
  const contact = sidebar.querySelector('.contact-box');
  const updates = document.querySelector('.updates-alert');
  const alertTitle = document.querySelector('.updates-title');
  const hub = document.createElement('section');
  hub.className = 'shop-alert';
  hub.setAttribute('aria-label','Shop links and updates');
  shops.previousElementSibling.replaceWith(hub);
  hub.append(alertTitle, shops, updates, contact);
  contact.querySelector('.contact-box-title').textContent = 'Bundles / questions';
  contact.querySelector('.contact-box-sub').textContent = '@4080super on Instagram';
  updates.replaceChildren();
  const note = document.createElement('li');
  note.textContent = 'New finds whenever they turn up';
  updates.append(note);
  const fashion = [
    ['Chrome Hearts','','chrome'],
    ['Supreme','','supreme'],
    ['HELLSTAR','','hellstar'],
    ['Goth Money','','goth'],
    ['FTP','','ftp','ftp.png'],
    ['Maison Margiela','','margiela','margiela'],
    ['Palm Angels','','palmangels'],
    ['SAINT LAURENT','PARIS','saintlaurent']
  ];
  const tech = [
    ['NVIDIA','','nvidia','nvidia'],
    ['OpenAI','','openai','openai'],
    ['HYPERLIQUID','HIGH RISK. HIGH SPEC.','hyperliquid'],
    ['Claude','','claude','claude-crab'],
    ['TradeOgre','4080SUPER / EBAY','tradeogre'],
    ['Linux + Monero','','linux','linux']
  ];
  let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rotating = [];
  function rail(parent, entries, destination, photo) {
    parent.querySelector('.ad-stack').remove();
    const heading = document.createElement('div');
    heading.className = 'rail-heading';
    heading.textContent = '4080 LINK EXCHANGE';
    const pause = document.createElement('button');
    pause.type = 'button';
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-label','Pause rotating banners');
    pause.onclick = () => {
      paused = !paused;
      document.querySelectorAll('.rail-heading button').forEach(b => b.textContent = paused ? 'Play' : 'Pause');
    };
    heading.append(pause);
    const list = document.createElement('div');
    list.className = 'network-list';
    entries.forEach((entry, i) => {
      const a = document.createElement('a');
      a.href = destination; a.target = '_blank'; a.rel = 'noopener';
      a.title = 'Browse 4080Super on ' + (destination === depop ? 'Depop' : 'eBay');
      a.className = 'net-banner brand-banner brand-' + entry[2];
      a.setAttribute('aria-label', entry[0] + ' / 4080Super on ' + (destination === depop ? 'Depop' : 'eBay'));
      if(entry[3]) {
        const logo = document.createElement('img');
        logo.className = 'brand-logo';
        logo.src = 'images/brands/' + entry[3] + (entry[3].includes('.') ? '' : '.svg');
        logo.alt = '';
        a.append(logo);
      }
      const strong = document.createElement('strong'); strong.textContent = entry[0];
      if(entry[2] === 'tradeogre') {
        const emblem = document.createElement('img');
        emblem.src = 'images/brands/tradeogre-emblem.png';
        emblem.alt = ''; emblem.className = 'tradeogre-emblem';
        const wordmark = document.createElement('img');
        wordmark.src = 'images/brands/tradeogre-wordmark.png';
        wordmark.alt = 'TradeOgre'; wordmark.className = 'tradeogre-wordmark';
        a.append(emblem, wordmark);
      }
      if(entry[2] === 'linux') {
        const logos = document.createElement('span');
        logos.className = 'linux-monero-logos';
        logos.append(a.querySelector('.brand-logo'));
        const plus = document.createElement('span'); plus.textContent = '+';
        const monero = document.createElement('img');
        monero.src = 'images/brands/monero.svg'; monero.alt = ''; monero.className = 'monero-logo';
        logos.append(plus, monero); a.append(logos);
      }
      if(entry[2] === 'palmangels') {
        strong.textContent = '';
        Array.from(entry[0]).forEach((letter, index) => {
          const character = document.createElement('span');
          character.textContent = letter === ' ' ? '\u00a0' : letter;
          const offset = index - (entry[0].length - 1) / 2;
          character.style.transform = 'translateY(' + (offset * offset * 0.45) + 'px) rotate(' + (offset * 4) + 'deg)';
          strong.append(character);
        });
      }
      const small = document.createElement('small'); small.textContent = entry[1];
      a.append(strong);
      if(entry[1]) a.append(small);
      list.append(a);
      if(i === 0) {
        small.className = 'brand-destination';
        small.textContent = destination === depop ? '4080SUPER / DEPOP' : '4080SUPER / EBAY';
        a.append(small);
        rotating.push({a, small, original:small.textContent, alternate: destination === depop ? 'BROWSE THE ROTATION >' : 'BROWSE THE HARDWARE >'});
      }
    });
    const visual = document.createElement('a');
    visual.className = 'net-banner photo'; visual.href = depop; visual.target = '_blank'; visual.rel = 'noopener';
    const img = document.createElement('img'); img.src = photo; img.alt = ''; img.loading = 'lazy';
    const title = document.createElement('strong'); title.textContent = 'RARE FINDS';
    const sub = document.createElement('small'); sub.textContent = '4080super / Depop >';
    visual.append(img,title,sub); list.append(visual);
    parent.append(heading,list);
  }
  rail(document.querySelector('.sidebar'), fashion, depop, 'images/sw6.jpg');
  rail(document.querySelector('.newsbox'), tech, ebay, 'images/sn6.jpg');
  const clothingPhotos = [0,2,8,17,18].map(index => window.DEPOP_ITEMS[index]);
  function photoAds(selector, items, market){
    const list = document.querySelector(selector + ' .network-list');
    list.querySelector('.photo').remove();
    const banners = Array.from(list.children);
    items.forEach((item,i) => {
      const a = document.createElement('a');
      a.className = 'product-ad'; a.href = item.url; a.target = '_blank'; a.rel = 'noopener';
      const img = document.createElement('img'); img.src = item.img; img.alt = item.title; img.loading = 'lazy';
      const label = document.createElement('strong'); label.textContent = item.title;
      const destination = document.createElement('span'); destination.textContent = '4080SUPER / ' + market + ' >';
      a.append(img,label,destination);
      const anchor = banners[Math.min(i*2+1,banners.length-1)];
      anchor.after(a);
    });
  }
  photoAds('.sidebar',clothingPhotos,'DEPOP');
  photoAds('.newsbox',window.TECH_ITEMS,'EBAY');
  let alternate = false;
  setInterval(() => {
    if(paused || document.hidden) return;
    alternate = !alternate;
    rotating.forEach(({a,small,original,alternate:other}) => {
      if(a.matches(':hover') || a.matches(':focus')) return;
      a.classList.add('fade');
      setTimeout(() => {small.textContent = alternate ? other : original; a.classList.remove('fade');},350);
    });
  },6500);
  const chat = document.createElement('section');
  chat.className = 'chatroom';
  chat.setAttribute('aria-label','Archive chatroom');
  chat.innerHTML = '<div class="chat-title"><b>#4080 / chat</b><span id="chat-status">connecting</span></div><div class="chat-log" role="log" aria-live="polite"><p>Room is quiet.</p></div><form><input name="nick" aria-label="Nickname" placeholder="nickname" maxlength="20" required autocomplete="off"><input name="message" aria-label="Message" placeholder="say something..." maxlength="280" required autocomplete="off"><button type="submit" disabled>Send</button></form><p class="chat-note">No accounts. No server history. Messages fade after 5 minutes. Public room; others can copy messages.</p>';
  document.querySelector('.newsbox').prepend(chat);
  const status = chat.querySelector('#chat-status'), form = chat.querySelector('form'), log = chat.querySelector('.chat-log'), button = form.querySelector('button');
  if(!['127.0.0.1','localhost'].includes(location.hostname)) {
    status.textContent = 'offline';
    log.firstChild.textContent = 'Chat is not connected yet.';
    return;
  }
  const stream = new EventSource('/chat/events');
  stream.onopen = () => {status.textContent = 'live';button.disabled = false;};
  stream.onerror = () => {status.textContent = 'reconnecting';button.disabled = true;};
  stream.onmessage = event => {
    const data = JSON.parse(event.data);
    if(log.firstChild?.textContent === 'Room is quiet.') log.replaceChildren();
    const row = document.createElement('p'), nick = document.createElement('b');
    nick.textContent = data.nick + ': ';
    row.append(nick, document.createTextNode(data.message));
    log.append(row);
    while(log.children.length > 50) log.firstChild.remove();
    log.scrollTop = log.scrollHeight;
    setTimeout(() => row.remove(), 300000);
  };
  form.onsubmit = async event => {
    event.preventDefault();
    if(!form.elements.nick.value.trim() || !form.elements.message.value.trim()) return;
    button.disabled = true;
    try {
      const response = await fetch('/chat/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nick:form.elements.nick.value,message:form.elements.message.value})});
      if(!response.ok) throw new Error('Send failed');
      form.elements.message.value = '';status.textContent = 'live';
    } catch {status.textContent = 'send failed; retry';}
    button.disabled = false;
  };
})();
