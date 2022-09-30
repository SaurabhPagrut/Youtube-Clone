const api_key = "AIzaSyC19JNAQknPBEhufxN2FIWfHDC5FL7_LjA";
let containerDiv = document.getElementById("container");
let search = async () => {
    let query = document.getElementById("query").value;
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${query}&key=${api_key}`
    let res = await fetch(url);
    let data = await res.json();
    if (query) {

        append(data.items);
    }
    else {
        containerDiv.innerHTML = null;
    }
}
let mostPopular = async () => {
    let url2 = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&regionCode=in&key=${api_key}`;
    let res = await fetch(url2);
    let data = await res.json();
    append2(data.items);
    // console.log(data);
}
mostPopular();
let append2 = data => {
    // containerDiv.innerHTML = null;
    data.forEach(({ id }) => {
        let MDiv = document.createElement("div");

        let Iframe = document.createElement("iframe");
        Iframe.src = "https://www.youtube.com/embed/" + id;
        Iframe.allow = "fullscreen";

        MDiv.append(Iframe);
        containerDiv.append(MDiv);
    })
}
let append = (data) => {
    document.getElementById("MPI").innerHTML = null;
    containerDiv.innerHTML = null;
    data.forEach(({ id: { videoId }, snippet: { title, channelTitle, thumbnails: { high: { url } } } }) => {
        let vidDiv = document.createElement("div");

        let Thumbnail = document.createElement("img");
        Thumbnail.src = url;

        let redirect = document.createElement("a");
        redirect.append(Thumbnail);
        redirect.addEventListener("click", () => {
            showVideo(videoId);
        })


        let Title = document.createElement("h4");
        Title.innerText = title;

        let ChannelTitle = document.createElement("p");
        ChannelTitle.innerText = channelTitle;

        vidDiv.append(redirect, ChannelTitle, Title);
        containerDiv.append(vidDiv);
    });
}

let showVideo = (ID) => {
    let obj = {
        id: ID
    }
    localStorage.setItem("videoID", JSON.stringify(obj));
    window.location = "./video.html";
}

{/* <iframe width="560" height="315" 
src="https://www.youtube.com/embed/WY94vSuQsJQ" 
title="YouTube video player" frameborder="0" allow="accelerometer; 
autoplay; clipboard-write; encrypted-media; gyroscope; 
picture-in-picture" allowfullscreen>
</iframe> */}