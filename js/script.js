
const cardContainer = document.querySelector(".cards_container");
const newImgButton = document.querySelector(".new_cards-btn");
const accessKey = "dKWJiVIpyPbkKbUkXzmObUTRgUWSipOf5Q_4XORENPI";


newImgButton.addEventListener("click", fetchImages);

// Buscar 10 imagens de gatos da API
async function fetchImages() {
    const apiUrl = `https://api.unsplash.com/photos/random?query=cat&count=10&client_id=${accessKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.forEach((catImageObj) => {
            CardCreator(catImageObj.urls.regular)
        } )
    } catch (error) {
        console.log("Erro ao buscar imagens de gatos:", error);
    }
    

}

// Crie um cartão para cada imagem de gato
function CardCreator(imgUrl) {
    const card = document.createElement("div");
    card.classList.add("cat_card");

    const catImgContainer = document.createElement("div");
    catImgContainer.classList.add("card_img_container")
    const catImgElemnt = document.createElement("img");
    catImgElemnt.src = imgUrl;
    catImgContainer.appendChild(catImgElemnt)
    card.appendChild(catImgContainer);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("card_btn_container");

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.addEventListener("click", handleLike)
    const likeIcon = document.createElement("span");
    likeIcon.classList.add("fa", "fa-thumbs-up");
    likeBtn.appendChild(likeIcon);
    buttonsContainer.appendChild(likeBtn);

    const dislikeBtn = document.createElement("button");
    dislikeBtn.classList.add("dislike-btn");
    dislikeBtn.addEventListener("click", handleDislike)
    const dislikeIcon = document.createElement("span");
    dislikeIcon.classList.add("fa", "fa-thumbs-down");
    dislikeBtn.appendChild(dislikeIcon);
    buttonsContainer.appendChild(dislikeBtn);

    card.appendChild(buttonsContainer);

    cardContainer.appendChild(card);
}

// Função para Like
function handleLike(event) {
    const likeBtn = event.currentTarget;
    const parent = likeBtn.parentElement;
    const dislikeBtn = parent.querySelector(".dislike-btn");
    dislikeBtn.style.color = "#525252";
    likeBtn.style.color = likeBtn.style.color === "rgb(0, 123, 255)" ? "#525252": "#007bff";
}

// Função para Dislike 
function handleDislike(event) {
    const dislikeBtn = event.currentTarget;
    const parent = dislikeBtn.parentElement;
    const likeBtn = parent.querySelector(".like-btn");
    likeBtn.style.color = "#525252";
    dislikeBtn.style.color = dislikeBtn.style.color === "rgb(255, 64, 77)" ? "#525252" : "#ff404d";
}


fetchImages();
