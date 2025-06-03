async function search() {
  const query = document.getElementById("query").value;
  if (!query) return;

  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp`;

  const script = document.createElement('script');
  const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

  window[callbackName] = function (data) {
    delete window[callbackName];
    document.body.removeChild(script);

    if (data.data.length > 0) {
      const track = data.data[0];
      document.getElementById("track_title").innerText = track.title;
      document.getElementById("artist").innerText = track.artist.name;

      const player = document.getElementById("player");
      player.src = track.preview;
      player.play();

      const cover = document.getElementById("cover");
      cover.src = track.album.cover_high;
      cover.style.display = 'block';
    } else {
      document.getElementById("track_name").innerText = "Нічого не знайдено 😢";

      const cover = document.getElementById("cover");
      cover.style.display = 'none';
      cover.src = '';
    }
  };

  script.src = url + `&callback=${callbackName}`;
  document.body.appendChild(script);
}
