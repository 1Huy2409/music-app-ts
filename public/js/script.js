const aplayer = document.querySelector("#aplayer");
if (aplayer) {
    let song = aplayer.getAttribute("data-song");
    let singer = aplayer.getAttribute("data-singer");
    song = JSON.parse(song);
    singer = JSON.parse(singer);
    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: song.title,
            artist: singer.fullName,
            url: song.audio,
            cover: song.avatar
        }],
        autoplay: true
    });
    const songAvatar = document.querySelector(".singer-detail .inner-avatar");
    if (songAvatar) {
        ap.on("play", () => {
            songAvatar.style.animationPlayState = "running";
        }) 
        ap.on("pause", () => {
            songAvatar.style.animationPlayState = "paused";
        })
    }
}

// lam like va dislike
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
    buttonLike.addEventListener("click", (e) => {
        e.preventDefault();
        const likeActive = buttonLike.classList.contains("active");
        const typeLike = (likeActive) ? "Dislike" : "Like";
        const songId = buttonLike.getAttribute("button-like");
        const link = `/songs/like/${typeLike}/${songId}`;
        fetch(link)
            .then(
                res => res.json()
            )
            .then(data => {
                const innerLike = buttonLike.querySelector(".inner-number");
                if (innerLike) {
                    innerLike.innerHTML = data.like;
                    buttonLike.classList.toggle("active");
                }
            })
    })
}