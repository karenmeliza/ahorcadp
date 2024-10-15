const words = ["javascript", "html", "css", "web", "hangman"]; // Palabras para adivinar
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let wrongLetters = [];
let remainingGuesses = 6;

// Función para actualizar la interfaz del juego
function updateWordDisplay() {
    const wordContainer = document.getElementById('wordContainer');
    wordContainer.innerHTML = selectedWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

// Maneja los intentos del usuario
function handleGuess() {
    const letterInput = document.getElementById('letterInput');
    const guessedLetter = letterInput.value.toLowerCase();
    
    // Validación de entrada
    if (!guessedLetter || guessedLetter.length !== 1 || !/^[a-zA-Z]+$/.test(guessedLetter)) {
        document.getElementById('message').textContent = "Por favor, ingresa una letra válida.";
        letterInput.value = '';
        return;
    }

    // Verifica si la letra ya fue adivinada
    if (guessedLetters.includes(guessedLetter) || wrongLetters.includes(guessedLetter)) {
        document.getElementById('message').textContent = "Ya has intentado esa letra.";
        letterInput.value = '';
        return;
    }

    document.getElementById('message').textContent = '';

    // Verifica si la letra está en la palabra
    if (selectedWord.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        checkWin();
    } else {
        wrongLetters.push(guessedLetter);
        remainingGuesses--;
        updateWrongLetters();
        checkLoss();
    }

    letterInput.value = '';
    updateWordDisplay();
}

// Actualiza las letras incorrectas en la interfaz
function updateWrongLetters() {
    document.getElementById('wrongLetters').textContent = `Letras incorrectas: ${wrongLetters.join(',')}`;
    document.getElementById('remainingGuesses').textContent = `Intentos restantes: ${remainingGuesses}`;
}

// Verifica si el jugador ha ganado
function checkWin() {
    const wordDisplay = document.getElementById('wordContainer').textContent.replace(/\s/g, '');
    if (wordDisplay === selectedWord) {
        document.getElementById('message').textContent = "¡Felicidades, ganaste!";
        document.getElementById('guessBtn').disabled = true;
    }
}

// Verifica si el jugador ha perdido
function checkLoss() {
    if (remainingGuesses <= 0) {
        document.getElementById('message').textContent = `Perdiste. La palabra era: ${selectedWord}`;
        document.getElementById('guessBtn').disabled = true;
    }
}

// Inicializa el juego
function initGame() {
    updateWordDisplay();
    document.getElementById('guessBtn').addEventListener('click', handleGuess);
}

// Inicia el juego cuando la página carga
window.onload = initGame;