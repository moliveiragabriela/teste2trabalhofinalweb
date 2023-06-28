// Criando variável e armazenando o nome do jogador começando com string vazia
var playerName = '';

// Criando variável e armazenando as perguntas e respostas carregadas no json
var questions = [];

// Criando variável e índice da pergunta atual
var currentQuestionIndex = 0;

// Criando variável score da pontuação do jogador iniciando com 0
var score = 0;

// Obtém referências aos elementos do DOM
const nameInput = document.getElementById('name');
const nameForm = document.getElementById('name-form');
const categoryButtons = document.getElementById('category-buttons');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const resultElement = document.getElementById('result');


// Função chamada quando o jogo começa (botão iniciar)
function startGame() {
  playerName = nameInput.value;
  if (playerName.trim() !== '') {
    nameForm.style.display = 'none';
    categoryButtons.style.display = 'block';
  } 
  else {
    alert('Insira o seu nick para iniciar o jogo!');
  }
}

// Função chamada ao carregar as perguntas alguma categoria
function loadQuestions(category) {
  // Realiza uma solicitação para carregar as perguntas no arquivo JSON 
  fetch('questions.json')
  //quando/resposta/cria função anônima/response é o parâmetro/response.json transforma o json em um obj JS
    .then(response => response.json()) 
    //objeto ja convertido para JS/ cria função anônima/ data é o parâmetro/o bloco são as ações
    .then(data => {
      questions = data[category];
      currentQuestionIndex = 0;
      score = 0;
      showQuestion();
      categoryButtons.style.display = 'none';
      questionContainer.style.display = 'block';
    });
}

// Função para exibir a próxima pergunta
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  optionsContainer.innerHTML = '';
// Função para perseguir cada elemento do array options e criar botões com seu respectivo texto
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option.text;
    button.onclick = () => checkAnswer(option.correct);
    optionsContainer.appendChild(button);
  });
}

// Função chamada quando o jogador seleciona uma resposta
function checkAnswer(isCorrect) {
  if (isCorrect) {
    score++;
  }
  // Verifica se há mais perguntas
  if (currentQuestionIndex === 9) {
    showResult();
  } else {
    currentQuestionIndex++;
    showQuestion();
  }
}

// Função para exibir o resultado final
function showResult() {
  questionContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  resultElement.textContent = `Obrigado por jogar, ${playerName}! Sua pontuação é ${score}/${questions.length}`;
}
  
  function jogarNovamente() {
    window.location.href = "index.html";
  }