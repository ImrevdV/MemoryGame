const boardArray = document.getElementById("js--board").children;
const themodal = document.getElementById("js--modal");
const triesElement = document.getElementById("js--tries");
const delay = 1000;
var currentlyFlipped = null
var tries = 0

function swap(id1, id2) {
    let temperary = boardArray[id1].className;
    boardArray[id1].className = boardArray[id2].className;
    boardArray[id2].className = temperary;
}

function reset() {
    for (let i = 0; i < boardArray.length; i++) {
        boardArray[i].classList.remove('hidden');
        boardArray[i].classList.remove('flipped');
    }
    currentlyFlipped = null;
    tries = 0
    triesElement.innerHTML = `Tries: ${tries}`
    for (let i = 0; i < boardArray.length; i++) {
        let randomIndex = Math.floor(Math.random() * boardArray.length);
        swap(i, randomIndex)
    }
}

function checkDone() {
    for (let i = 0; i < boardArray.length; i++) {
        if (!boardArray[i].classList.contains('hidden')){
            return false
        }
    }
    return true
}

function remove(card1, card2) {
    setTimeout(function() {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.classList.add('hidden');
        card2.classList.add('hidden');
        if (checkDone()) {
            console.log('should be done')
            themodal.classList.remove('hidden');
        }
    }, delay);
}

function unflip(card1, card2) {
    setTimeout(function() {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }, delay);
}

function flip(card) {
    card.classList.add('flipped');
    if (currentlyFlipped) {
        tries++
        triesElement.innerHTML = `Tries: ${tries}`
        if (currentlyFlipped.classList[0] == card.classList[0]) {
            remove(card, currentlyFlipped);
        }
        else {
            unflip(card, currentlyFlipped);
        }
        currentlyFlipped = null;
    } else {
        currentlyFlipped = card
    }
}

function closeModal() {
    themodal.classList.add('hidden');
}

reset()