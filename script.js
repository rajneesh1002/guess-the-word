const words = ["adventure", "creativity", "benchmark", "somewhere"];
    let word = words[Math.floor(Math.random() * words.length)].toLowerCase();
    let display = Array(9).fill('_');
    let wrong = 0;
    let maxWrong = 9;
    let start;
    let timer;

    const wordDiv = document.getElementById('word');
    const keysDiv = document.getElementById('keys');
    const livesSpan = document.getElementById('lives');
    const timeSpan = document.getElementById('time');
    const message = document.getElementById('final-message');
    const restartBtn = document.getElementById('restart-btn');

    function drawWord() {
      wordDiv.textContent = display.join(' ');
      livesSpan.textContent = maxWrong - wrong;
    }

    function handleLetter(letter, btn) {
      if (word.includes(letter)) {
        [...word].forEach((l, i) => {
          if (l === letter) display[i] = letter;
        });
        btn.classList.add('correct');
      } else {
        wrong++;
        btn.classList.add('wrong');
      }
      btn.disabled = true;
      drawWord();
      checkEnd();
    }

    function checkEnd() {
      if (display.join('') === word) {
        clearInterval(timer);
        message.textContent = `🎉 You guessed it in ${timeSpan.textContent} seconds!`;
        disableAllButtons();
      }
      if (wrong >= maxWrong) {
        clearInterval(timer);
        message.textContent = `😢 Game Over! The word was "${word}".`;
        disableAllButtons();
      }
    }

    function disableAllButtons() {
      document.querySelectorAll('#keys button').forEach(btn => btn.disabled = true);
    }

    function createKeyboard() {
      keysDiv.innerHTML = '';
      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const btn = document.createElement('button');
        btn.textContent = letter.toUpperCase();
        btn.onclick = () => handleLetter(letter, btn);
        keysDiv.appendChild(btn);
      }
    }

    
    function startGame() {
      word = words[Math.floor(Math.random() * words.length)].toLowerCase();
      display = Array(9).fill('_');
      wrong = 0;
      start = Date.now();
      message.textContent = '';
      createKeyboard();
      drawWord();
      clearInterval(timer);
      timer = setInterval(() => {
        timeSpan.textContent = Math.floor((Date.now() - start) / 1000);
      }, 1000);
    }

    restartBtn.onclick = startGame;

    startGame();