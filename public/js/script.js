const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let song = aplayer.getAttribute("data-song");
  let singer = aplayer.getAttribute("data-singer");
  song = JSON.parse(song);
  singer = JSON.parse(singer);
  const ap = new APlayer({
    container: aplayer,
    audio: [
      {
        name: song.title,
        artist: singer.fullName,
        url: song.audio,
        cover: song.avatar,
      },
    ],
    autoplay: true,
  });
  const songAvatar = document.querySelector(".singer-detail .inner-avatar");
  if (songAvatar) {
    ap.on("play", () => {
      songAvatar.style.animationPlayState = "running";
    });
    ap.on("pause", () => {
      songAvatar.style.animationPlayState = "paused";
    });
  }
  ap.on("ended", () => {
    const link = `/songs/listen/${song._id}`;
    const option = {
      method: "PATCH"
    }
    fetch(link, option) 
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          const listenBox = document.querySelector(".inner-actions .inner-listen span");
          if (listenBox) {
            listenBox.innerHTML = `${data.listen} lượt nghe`
          }
        }
      })
  })
}

// lam like va dislike
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", (e) => {
    e.preventDefault();
    const likeActive = buttonLike.classList.contains("active");
    const typeLike = likeActive ? "Dislike" : "Like";
    const songId = buttonLike.getAttribute("button-like");
    const link = `/songs/like/${typeLike}/${songId}`;
    const option = {
      method: "PATCH",
    };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const innerLike = buttonLike.querySelector(".inner-number");
        if (innerLike) {
          innerLike.innerHTML = data.like;
          buttonLike.classList.toggle("active");
        }
      });
  });
}
// end button like
const buttonFavorites = document.querySelectorAll("[button-favorite]");
if (buttonFavorites) {
  buttonFavorites.forEach((buttonFavorite) => {
    buttonFavorite.addEventListener("click", (e) => {
      e.preventDefault();
      const isFavorite = buttonFavorite.classList.contains("active");
      const typeFavorite = isFavorite ? "unFavorite" : "Favorite";
      const songId = buttonFavorite.getAttribute("button-favorite");
      const link = `/songs/favorite/${typeFavorite}/${songId}`;
      fetch(link)
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            buttonFavorite.classList.toggle("active");
          }
        });
    });
  });
}
// suggest search
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
    const inputSearch = document.querySelector("input[name = 'keyword']");
    if (inputSearch) {
        inputSearch.addEventListener("keyup", () => {
            const value = inputSearch.value;
            const link = `/search/suggest?keyword=${value}`;
            fetch(link)
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        const innerSuggest = boxSearch.querySelector(".inner-suggest");
                        const innerList = boxSearch.querySelector(".inner-list");
                        if (data.songs.length > 0) {
                            let htmls = data.songs.map(item => 
                                `<a class="inner-item" href="/songs/detail/${item.slug}">
                                    <div class="inner-image">
                                        <img src=${item.avatar} />
                                    </div>
                                    <div class="inner-info">
                                        <div class="inner-title">${item.title}</div>
                                        <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i>${item.singer.fullName}</div>
                                    </div>
                                </a>`
                            )
                            htmls = htmls.join("");
                            innerList.innerHTML = htmls;
                            innerSuggest.classList.add("show");
                        }
                        else {
                            innerList.innerHTML = "";
                            innerSuggest.classList.remove("show");
                        }
                    }
                })
        })
    }
}


