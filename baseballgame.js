const container = document.getElementById("container")
const submitButton = document.getElementById("submit-button")
const userInput = document.getElementById("user-input")
const restartButton = document.getElementById("restart-button")
let playGame = true;

// 랜덤으로 0-9 사이의 서로 다른 숫자 3개를 선택하는 함수
function generateRandomNumber() {
    var digits = [];
    while (digits.length < 3) {
        var rand = Math.floor(Math.random() * 10);
        if (digits.indexOf(rand) === -1) {
            digits.push(rand);
        }
    }
    return digits.join('');
}

// 게임 시작

if (playGame) {
    var answer = generateRandomNumber();
    submitButton.addEventListener("click", handleGuess);
    restartButton.addEventListener("click", handleReetart);
}
var guess = "";

function handleGuess(event) {
    event.preventDefault();

    guess = userInput.value;
    // 유효성 검사
    if (guess.length !== 3 || isNaN(guess) || new Set(guess).size !== 3) {

        return alert('잘못된 입력입니다. 0-9 사이의 서로 다른 숫자 3개를 입력하세요.');
    }
    match();
}
var attempts = 0;

function match() {
    attempts++;
    var strikes = 0;
    var balls = 0;

    for (var i = 0; i < guess.length; i++) {
        if (guess[i] === answer[i]) {
            strikes++;
        } else if (answer.indexOf(guess[i]) !== -1) {
            balls++;
        }
    }

    let newDiv = document.createElement("div")
    let newSpan1 = document.createElement("span")
    let newSpan2 = document.createElement("span")

    newSpan1.innerHTML = attempts + "번째 시도 : " + guess;
    newSpan2.innerHTML = strikes + 'S ' + balls + 'B';

    newDiv.append(newSpan1)
    newDiv.append(newSpan2)
    container.append(newDiv)

    if (strikes === 3) {

        let newDiv1 = document.createElement("div")
        let newSpan3 = document.createElement("span")

        newSpan3.innerHTML = '축하합니다! ' + attempts + '번의 시도 후에 맞추셨습니다. 정답은 ' + answer + '입니다.';

        newDiv.append(newSpan3)
        container.append(newDiv1)
        endGame()
    }
    function endGame() {
        userInput.setAttribute("disabled", "");
        submitButton.setAttribute("disabled", "");
        playGame = false;
    }

    function handleReetart() {
        window.location.reload();
    }
}