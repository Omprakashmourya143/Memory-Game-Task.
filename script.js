const images = ["🌟", "(◔◡◔)", "😎", "🦄", "🎉", "🍕", "🚀", "🌺"];

let cards = [];
let flippedCards = [];
let matchedPairs = [];

function CreateGameBoard(){
    const gameboard = document.getElementById("id-gameboard");
    cards = [];

    // Duplicating the images.

    const cardimages = images.concat(images);

    cardimages.sort(() => Math.random() - 0.5)

    for(let i=0; i < cardimages.length; i++){
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = cardimages[i];
        card.textContent = "?";
        card.addEventListener("click",handleCardClick);
        gameboard.append(card)
    }
}

function handleCardClick(){
    const card = this;

    if(card.classList.contains("matched") || flippedCards.length >= 2){
        return;
    }
    
    card.textContent = card.dataset.image;
    card.classList.add("flipped");
    flippedCards.push(card);

    if(flippedCards.length === 2){
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch(){
    const [card1, card2] = flippedCards;

    if(card1.dataset.image === card2.dataset.image){
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        if(matchedPairs === images.length){
            setTimeout(showGameOverMessage, 500)
        }
    }else{
        card1.textContent = "?";
        card2.textContent = "?";
    }

    flippedCards = [];
}

function showGameOverMessage(){
    alert("Congratulations! You're matched all the Pairs!");
    resetGame();
}

function resetGame(){
    const gameboard = document.getElementById("id-gameboard");
    gameboard.innerHTML = "";
    matchedPairs = 0;
    CreateGameBoard();
}

CreateGameBoard();