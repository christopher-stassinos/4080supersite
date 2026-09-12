(() => {
  const dialog = document.createElement('dialog');
  dialog.className = 'signup-dialog';
  dialog.setAttribute('aria-labelledby', 'signup-title');
  dialog.innerHTML = '<div class="signup-top"><span>4080SUPER / MAILING LIST</span><button type="button" class="signup-close" aria-label="Close signup" title="Close">&times;</button></div><div class="signup-content"><span class="signup-stamp">DIRECT FROM THE ARCHIVE</span><h2 id="signup-title">Stay in the loop.</h2><p>New finds, tech, and rare pieces.<br>No schedule. Just when something turns up.</p><form><label for="signup-email">Email address</label><input id="signup-email" name="email" type="email" placeholder="you@example.com" autocomplete="email" required><label class="signup-consent"><input type="checkbox" required> <span>Email me news and listings from 4080Super. I can unsubscribe anytime.</span></label><button class="signup-submit" type="submit" disabled>Join the list &rarr;</button><p class="signup-status" role="status">Email signup is coming soon.</p></form><button type="button" class="signup-later">Just browsing</button></div>';
  document.body.append(dialog);
  function rememberDismissal() {
    try { sessionStorage.setItem('4080-signup-dismissed','1'); } catch {}
  }
  dialog.querySelector('.signup-close').onclick = () => dialog.close();
  dialog.querySelector('.signup-later').onclick = () => dialog.close();
  dialog.addEventListener('close', rememberDismissal);
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if(event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.querySelector('h2').textContent = 'Get notified of new drops.';
  dialog.querySelector('.signup-content > p').textContent = 'New tech and rare finds. No fixed schedule. Unsubscribe anytime.';
  const form = dialog.querySelector('form');
  const submit = dialog.querySelector('.signup-submit');
  const status = dialog.querySelector('.signup-status');
  submit.textContent = 'Notify me';
  submit.disabled = false;
  status.textContent = 'Your email is stored privately for drop alerts only.';
  const trap = document.createElement('input');
  trap.name = 'website'; trap.tabIndex = -1; trap.autocomplete = 'off';
  trap.setAttribute('aria-hidden', 'true'); trap.style.display = 'none';
  form.append(trap);
  form.onsubmit = async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    submit.disabled = true;
    status.textContent = 'Saving...';
    try {
      const response = await fetch('https://desktop-0tm15db.tail6415f.ts.net/api/subscribe', {
        signal: AbortSignal.timeout(15000),
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: form.elements.email.value, consent: form.querySelector('[type=checkbox]').checked, website: trap.value})
      });
      if (!response.ok) throw new Error(response.status === 429 ? 'Please wait a few seconds and try again.' : 'Could not save your signup. Please try again.');
      form.reset();
      status.textContent = 'You are on the list. New-drop emails are not sending yet.';
      rememberDismissal();
    } catch (error) { status.textContent = error.message; }
    finally { submit.disabled = false; }
  };
  const reopen = document.createElement('button');
  reopen.type = 'button'; reopen.className = 'signup-reopen'; reopen.textContent = 'Mailing list';
  reopen.onclick = () => dialog.showModal();
  document.querySelector('.site-footer').append(reopen);
  let dismissed = false;
  try { dismissed = sessionStorage.getItem('4080-signup-dismissed') === '1'; } catch {}
  if(!dismissed) dialog.showModal();
})();
