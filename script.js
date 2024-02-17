const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random"
const quoteDisplayElement = document.getElementById("quoteDisplay")
const quoteInputElement = document.getElementById("quoteInput")
const timerElement = document.getElementById("timer")

quoteInputElement.addEventListener("input", () => {
  const arrayDisplayQuote = quoteDisplayElement.querySelectorAll("span")
  const arrayInputValue = quoteInputElement.value.split("")

  let correct = true
  arrayDisplayQuote.forEach((displayCharacterSpan, displayIndex) => {
    const inputCharacter = arrayInputValue[displayIndex]
    if (inputCharacter == null) {
      displayCharacterSpan.classList.remove("correct")
      displayCharacterSpan.classList.remove("incorrect")
      correct = false
    } else if (inputCharacter === displayCharacterSpan.innerText) {
      displayCharacterSpan.classList.add("correct")
      displayCharacterSpan.classList.remove("incorrect")
    } else {
      displayCharacterSpan.classList.remove("correct")
      displayCharacterSpan.classList.add("incorrect")
      correct = false
    }
  })

  if (correct) renderNewQuote()
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content)
    .catch((e) => console.log("error", e))
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  console.log("quote: ", quote)
  quoteDisplayElement.innerHTML = ""
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span")
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  startTimer()
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()
