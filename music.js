(function(){const mount=document.createElement('div');mount.innerHTML="<div class=\"artifact-player\" id=\"artifact-player\" aria-label=\"Playlist\">\r\n              <button class=\"player-btn\" id=\"player-prev\" aria-label=\"Previous track\">\r\n                <svg viewBox=\"0 0 24 24\"><path d=\"M6 6h2v12H6zm3.5 6 8.5 6V6z\"/></svg>\r\n              </button>\r\n              <button class=\"player-btn\" id=\"player-toggle\" aria-label=\"Play\">\r\n                <svg id=\"player-icon\" viewBox=\"0 0 24 24\"><path d=\"M8 5v14l11-7z\"/></svg>\r\n              </button>\r\n              <button class=\"player-btn\" id=\"player-next\" aria-label=\"Next track\">\r\n                <svg viewBox=\"0 0 24 24\"><path d=\"M16 6h2v12h-2zM6 6l8.5 6L6 18z\"/></svg>\r\n              </button>\r\n              <div class=\"player-meta\">\r\n                <div class=\"player-track\" id=\"player-track\">Loading playlist…</div>\r\n                <div class=\"player-sub\" id=\"player-sub\">◼ Muted · tap to play</div>\r\n              </div>\r\n              <div class=\"player-bars\" aria-hidden=\"true\">\r\n                <span></span><span></span><span></span><span></span>\r\n              </div>\r\n              <button class=\"player-btn player-mute\" id=\"player-mute\" aria-label=\"Unmute\">\r\n                <svg id=\"player-mute-icon\" viewBox=\"0 0 24 24\"><path d=\"M4 9v6h4l5 5V4L8 9H4zm11.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z\" opacity=\"0.35\"/><path d=\"M3 3l18 18-1.4 1.4L1.6 4.4z\"/></svg>\r\n              </button>\r\n            </div>\r\n            <div id=\"yt-host\"></div>";document.body.append(mount);})();
(() => {
  const bar = document.getElementById('artifact-player');
  const track = document.getElementById('player-track');
  const sub = document.getElementById('player-sub');
  const toggle = document.getElementById('player-toggle');
  const mute = document.getElementById('player-mute');
  const volume = document.createElement('input');
  volume.type = 'range'; volume.min = '0'; volume.max = '100'; volume.value = '30';
  volume.className = 'player-volume'; volume.setAttribute('aria-label', 'Volume');
  volume.title = 'Volume: 30%'; bar.append(volume);
  let player, ready = false, failed = false;
  function sync() {
    if (!ready || failed) return;
    const data = player.getVideoData();
    track.textContent = data.title || 'YouTube playlist';
    const playing = player.getPlayerState() === 1;
    const muted = player.isMuted() || player.getVolume() === 0;
    bar.classList.toggle('is-playing', playing);
    bar.classList.toggle('is-muted', muted);
    toggle.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    mute.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
    document.querySelector('#player-icon path').setAttribute('d', playing ? 'M6 5h4v14H6zm8 0h4v14h-4z' : 'M8 5v14l11-7z');
    sub.textContent = muted ? 'Muted' : playing ? 'Now playing' : 'Paused';
  }
  function unavailable() {
    failed = true;
    track.textContent = 'Playlist unavailable';
    sub.textContent = 'YouTube could not load this playlist';
    bar.classList.remove('is-playing');
  }
  function boot() {
    player = new YT.Player('yt-host', {
      width: '200', height: '200',
      playerVars: {origin: location.origin, playsinline: 1, autoplay: 0, listType: 'playlist', list: 'PLf-kHtzJzt2c'},
      events: {
        onReady() { ready = true; player.setVolume(Number(volume.value)); sync(); },
        onStateChange() { failed = false; sync(); },
        onError: unavailable
      }
    });
  }
  toggle.onclick = () => {
    if (!ready) return;
    if (failed) { failed = false; player.loadPlaylist({listType:'playlist',list:'PLf-kHtzJzt2c'}); }
    else if (player.getPlayerState() === 1) player.pauseVideo();
    else player.playVideo();
    sync();
  };
  document.getElementById('player-prev').onclick = () => { if(ready) player.previousVideo(); };
  document.getElementById('player-next').onclick = () => { if(ready) player.nextVideo(); };
  mute.onclick = () => {
    if(!ready) return;
    if(player.isMuted() || Number(volume.value) === 0) {
      if(Number(volume.value) === 0) volume.value = '30';
      player.setVolume(Number(volume.value)); player.unMute();
    } else player.mute();
    volume.title = 'Volume: ' + volume.value + '%'; sync();
  };
  volume.oninput = () => {
    volume.title = 'Volume: ' + volume.value + '%';
    if(!ready) return;
    player.setVolume(Number(volume.value));
    if(Number(volume.value) > 0) player.unMute(); else player.mute();
    sync();
  };
  if(window.YT && window.YT.Player) boot();
  else {
    window.onYouTubeIframeAPIReady = boot;
    const api = document.createElement('script');
    api.src = 'https://www.youtube.com/iframe_api'; api.onerror = unavailable;
    document.head.append(api);
  }
  setTimeout(() => { if(!ready) unavailable(); },15000);
})();
