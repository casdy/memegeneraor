const titleEl = document.querySelector(".title");
const memeEl = document.querySelector(".meme");
const authorEl = document.querySelector(".author");
const generateMemeBtnEl = document.querySelector(".generateMemeBtn");
const shareBtnEl = document.querySelector(".shareBtn");
const downloadBtnEl = document.querySelector(".downloadBtn");

// Meme Api GitHub Link: https://github.com/D3vd/Meme_Api
async function generateMeme() {
    const response = await fetch("https://meme-api.com/gimme/wholesomememes");
    const data = await response.json();
    titleEl.innerHTML = data.title;
    memeEl.setAttribute("src", data.url);
    authorEl.innerHTML = `Meme Created By ${data.author}`;
    console.log(data);
}

function shareMeme() {
    const memeUrl = memeEl.getAttribute("src");
    const memeTitle = titleEl.innerText;

    if (navigator.share) {
        navigator.share({
                title: memeTitle,
                text: "Check out this meme!",
                url: memeUrl,
            })
            .then(() => console.log("Meme shared successfully"))
            .catch((error) => console.log("Error sharing meme:", error));
    } else {
        const shareText = `Check out this meme: ${memeTitle} ${memeUrl}`;

        const platforms = [
            { name: "Twitter", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}` },
            { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memeUrl)}` },
            { name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(memeUrl)}` },
            { name: "Instagram", url: `https://www.instagram.com/?url=${encodeURIComponent(memeUrl)}` },
            { name: "Snapchat", url: `https://www.snapchat.com/share?url=${encodeURIComponent(memeUrl)}` },
            { name: "Messages", url: `sms:&body=${encodeURIComponent(shareText)}` },
            // Add more platforms as needed
        ];

        platformButtonsContainer.innerHTML = ""; // Clear previous buttons

        platforms.forEach((platform) => {
            const button = document.createElement("button");
            button.textContent = platform.name;
            button.addEventListener("click", () => shareOnPlatform(platform.url));
            platformButtonsContainer.appendChild(button);
        });

        openShareDialog();
    }
}

function openShareDialog() {
    const shareDialog = document.querySelector(".share-dialog");
    shareDialog.style.display = "flex";
}

function closeShareDialog() {
    const shareDialog = document.querySelector(".share-dialog");
    shareDialog.style.display = "none";
}

function shareOnPlatform(url) {
    window.open(url, "_blank");
}

function downloadMeme() {
    const memeUrl = memeEl.getAttribute("src");
    const a = document.createElement("a");
    a.href = memeUrl;
    a.download = "meme.png";
    a.click();
}

generateMemeBtnEl.addEventListener("click", generateMeme);
shareBtnEl.addEventListener("click", shareMeme);
downloadBtnEl.addEventListener("click", downloadMeme);
closeBtnEl.addEventListener("click", closeShareDialog);

generateMeme();