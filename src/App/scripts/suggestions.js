const input = document.getElementById('query');
const suggestions = document.getElementById('suggestions');

// Функция для загрузки и отображения подсказок
input.addEventListener('input', function () {
  const query = input.value.trim();
  if (!query) {
    suggestions.style.display = 'none';
    return;
  }

  if (window.currentScriptTag) {
    document.body.removeChild(window.currentScriptTag);
    delete window.currentCallbackName;
  }

  const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  window.currentCallbackName = callbackName;

  window[callbackName] = function (data) {
    delete window[callbackName];
    if (window.currentScriptTag) {
      document.body.removeChild(window.currentScriptTag);
      delete window.currentScriptTag;
    }

    if (data.data.length === 0) {
      suggestions.style.display = 'none';
      return;
    }

    suggestions.innerHTML = '';
    data.data.forEach(track => {
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.gap = '10px'; // відстань між картинкою і текстом
      div.style.padding = '10px';
      div.style.cursor = 'pointer';

      // Картинка обкладинки
      const img = document.createElement('img');
      img.src = track.album.cover_small;
      img.style.width = '50px';
      img.style.height = '50px';
      img.style.borderRadius = '8px';

      // Текст треку
      const text = document.createElement('span');
      text.textContent = `${track.artist.name} — ${track.title}`;
      text.style.color = 'white';

      div.appendChild(img);
      div.appendChild(text);

      div.onclick = () => {
        selectTrack(track);
        suggestions.style.display = 'none';
      };

      suggestions.appendChild(div);
    });

    suggestions.style.display = 'block';
  };

  const script = document.createElement('script');
  script.src = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp&callback=${callbackName}`;
  document.body.appendChild(script);
  window.currentScriptTag = script;
});

function selectTrack(track) {
  document.getElementById("track_title").innerText = track.title;
  document.getElementById("artist").innerText = track.artist.name;

  const player = document.getElementById("player");
  player.src = track.preview;
  player.play();

  const cover = document.getElementById("cover");
  cover.src = track.album.cover_medium;
  cover.style.display = 'block';

  input.value = track.title;
}

input.addEventListener('blur', function () {
  setTimeout(() => {
    suggestions.style.display = 'none';
  }, 100); 
});

input.addEventListener('focus', function () {
  const query = input.value.trim();
  if (query && suggestions.children.length > 0) {
    suggestions.style.display = 'block';
  }
});