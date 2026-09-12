const QUESTIONS = [
  { category: "구약 · 창세기", question: "하나님께서 아브라함에게 약속의 아들로 주신 사람은 누구인가요?", choices: ["이스마엘", "이삭", "에서", "야곱"], answer: "이삭", reference: "창세기 21:1–3", explanation: "하나님께서 말씀하신 때에 사라가 아들을 낳았고, 아브라함은 그 이름을 이삭이라 하였습니다." },
  { category: "구약 · 출애굽기", question: "모세가 하나님께 십계명을 받은 산은 어디인가요?", choices: ["갈멜산", "시내산", "감람산", "아라랏산"], answer: "시내산", reference: "출애굽기 19–20장", explanation: "이스라엘 백성이 시내 광야에 이르렀을 때 하나님께서 시내산에서 모세에게 말씀하셨습니다." },
  { category: "구약 · 여호수아", question: "이스라엘 백성이 가나안 땅에서 처음으로 무너뜨린 성은 어디인가요?", choices: ["아이성", "예루살렘", "여리고성", "헤브론"], answer: "여리고성", reference: "여호수아 6장", explanation: "백성이 엿새 동안 성을 돌고 일곱째 날 외치자 여리고 성벽이 무너졌습니다." },
  { category: "구약 · 사무엘상", question: "어린 다윗이 골리앗을 쓰러뜨릴 때 사용한 것은 무엇인가요?", choices: ["활과 화살", "창", "물맷돌", "칼"], answer: "물맷돌", reference: "사무엘상 17:49", explanation: "다윗은 물매로 돌을 던져 골리앗의 이마를 맞혔습니다." },
  { category: "구약 · 열왕기상", question: "하나님께 지혜를 구해 지혜로운 왕으로 알려진 사람은 누구인가요?", choices: ["사울", "다윗", "솔로몬", "히스기야"], answer: "솔로몬", reference: "열왕기상 3:9–12", explanation: "솔로몬은 백성을 잘 다스리도록 듣는 마음을 구했고, 하나님께서 지혜를 주셨습니다." },
  { category: "구약 · 다니엘", question: "다니엘이 사자 굴에 들어가게 된 까닭은 무엇인가요?", choices: ["왕의 음식을 거절해서", "예루살렘을 떠나서", "하나님께 기도해서", "꿈을 해석하지 못해서"], answer: "하나님께 기도해서", reference: "다니엘 6장", explanation: "다니엘은 왕 외의 누구에게도 기도하지 말라는 명령에도 하나님께 기도하였습니다." },
  { category: "신약 · 마태복음", question: "예수님께서 산상수훈에서 가르쳐 주신 기도는 무엇이라 부르나요?", choices: ["감사 기도", "주기도문", "중보 기도", "아론의 축복"], answer: "주기도문", reference: "마태복음 6:9–13", explanation: "예수님은 제자들에게 하늘에 계신 아버지께 드리는 기도의 본을 가르치셨습니다." },
  { category: "신약 · 마가복음", question: "예수님께서 오병이어의 기적에 사용하신 음식은 무엇인가요?", choices: ["떡 다섯 개와 물고기 두 마리", "떡 일곱 개와 물고기 한 마리", "떡 두 개와 물고기 다섯 마리", "떡 열두 개와 물고기 세 마리"], answer: "떡 다섯 개와 물고기 두 마리", reference: "마가복음 6:38–44", explanation: "예수님은 떡 다섯 개와 물고기 두 마리로 오천 명을 먹이셨습니다." },
  { category: "신약 · 누가복음", question: "선한 사마리아인 비유에서 강도 만난 사람을 돌본 사람은 누구인가요?", choices: ["제사장", "레위인", "사마리아인", "세리"], answer: "사마리아인", reference: "누가복음 10:30–37", explanation: "사마리아인은 다친 사람을 불쌍히 여겨 상처를 돌보고 주막까지 데려갔습니다." },
  { category: "신약 · 요한복음", question: "예수님께서 물을 포도주로 바꾸신 첫 표적이 일어난 곳은 어디인가요?", choices: ["베들레헴", "가버나움", "가나", "나사렛"], answer: "가나", reference: "요한복음 2:1–11", explanation: "갈릴리 가나의 혼인 잔치에서 예수님이 첫 표적을 행하셨습니다." },
  { category: "신약 · 사도행전", question: "성령이 제자들에게 임한 날은 어떤 절기였나요?", choices: ["유월절", "오순절", "초막절", "수전절"], answer: "오순절", reference: "사도행전 2:1–4", explanation: "오순절 날 제자들이 한곳에 모였을 때 성령이 각 사람 위에 임하셨습니다." },
  { category: "신약 · 서신서", question: "사랑은 오래 참고 친절하다고 기록된 성경은 어디인가요?", choices: ["로마서 8장", "고린도전서 13장", "에베소서 6장", "히브리서 11장"], answer: "고린도전서 13장", reference: "고린도전서 13:4", explanation: "고린도전서 13장은 사랑의 성품과 사랑이 얼마나 중요한지를 가르칩니다." },
  { category: "구약 · 룻기", question: "룻이 시어머니 나오미를 따라간 곳은 어디인가요?", choices: ["베들레헴", "애굽", "니느웨", "다메섹"], answer: "베들레헴", reference: "룻기 1:19", explanation: "룻은 모압을 떠나 나오미와 함께 베들레헴으로 갔습니다." },
  { category: "신약 · 복음서", question: "예수님께서 부활하신 날, 무덤 입구의 돌은 어떻게 되어 있었나요?", choices: ["그대로 닫혀 있었다", "둘로 갈라져 있었다", "옮겨져 있었다", "불에 타 있었다"], answer: "옮겨져 있었다", reference: "누가복음 24:1–3", explanation: "여인들이 무덤에 갔을 때 돌이 이미 무덤에서 굴려 옮겨진 것을 보았습니다." }
];

const SESSION_SIZE = 10;
const letters = ["A", "B", "C", "D"];

const state = { questions: [], index: 0, correct: 0, streak: 0, bestStreak: 0, locked: false };

const el = {
  quizView: document.querySelector("#quizView"), resultView: document.querySelector("#resultView"),
  questionTitle: document.querySelector("#questionTitle"), categoryLabel: document.querySelector("#categoryLabel"),
  answers: document.querySelector("#answers"), currentNumber: document.querySelector("#currentNumber"),
  totalNumber: document.querySelector("#totalNumber"), progressFill: document.querySelector("#progressFill"),
  progressTrack: document.querySelector(".progress-track"), progressText: document.querySelector("#progressText"),
  scoreLabel: document.querySelector("#scoreLabel"), streakLabel: document.querySelector("#streakLabel"),
  feedback: document.querySelector("#feedback"), feedbackTitle: document.querySelector("#feedbackTitle"),
  feedbackText: document.querySelector("#feedbackText"), verseReference: document.querySelector("#verseReference"),
  nextButton: document.querySelector("#nextButton"), nextButtonText: document.querySelector("#nextButtonText"),
  restartButton: document.querySelector("#restartButton"), retryButton: document.querySelector("#retryButton"),
  finalScore: document.querySelector("#finalScore"), resultMessage: document.querySelector("#resultMessage"),
  correctCount: document.querySelector("#correctCount"), bestStreak: document.querySelector("#bestStreak"),
  answeredCount: document.querySelector("#answeredCount")
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz() {
  state.questions = shuffle(QUESTIONS).slice(0, SESSION_SIZE).map((q) => ({ ...q, choices: shuffle(q.choices) }));
  Object.assign(state, { index: 0, correct: 0, streak: 0, bestStreak: 0, locked: false });
  el.quizView.hidden = false;
  el.resultView.hidden = true;
  el.totalNumber.textContent = SESSION_SIZE;
  updateHeader();
  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.index];
  state.locked = false;
  const progress = ((state.index + 1) / SESSION_SIZE) * 100;
  el.currentNumber.textContent = String(state.index + 1).padStart(2, "0");
  el.progressFill.style.width = `${progress}%`;
  el.progressTrack.setAttribute("aria-valuenow", String(progress));
  el.progressText.textContent = state.index === 0 ? "첫 문제를 천천히 읽어보세요." : `${SESSION_SIZE - state.index}문제가 남았습니다.`;
  el.categoryLabel.textContent = q.category;
  el.questionTitle.textContent = q.question;
  el.feedback.hidden = true;
  el.feedback.className = "feedback";
  el.nextButton.disabled = true;
  el.nextButtonText.textContent = "답을 선택해 주세요";
  el.answers.replaceChildren(...q.choices.map((choice, index) => createAnswer(choice, index)));
  el.questionTitle.focus({ preventScroll: true });
}

function createAnswer(choice, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "answer-button";
  button.setAttribute("role", "radio");
  button.setAttribute("aria-checked", "false");
  button.dataset.choice = choice;
  button.innerHTML = `<span class="answer-letter">${letters[index]}</span><span class="answer-text"></span><span class="answer-state" aria-hidden="true"></span>`;
  button.querySelector(".answer-text").textContent = choice;
  button.addEventListener("click", () => chooseAnswer(choice, button));
  return button;
}

function chooseAnswer(choice, selectedButton) {
  if (state.locked) return;
  state.locked = true;
  const q = state.questions[state.index];
  const isCorrect = choice === q.answer;
  document.querySelectorAll(".answer-button").forEach((button) => {
    button.disabled = true;
    if (button.dataset.choice === q.answer) button.classList.add("correct");
  });
  selectedButton.setAttribute("aria-checked", "true");
  if (!isCorrect) selectedButton.classList.add("wrong");

  if (isCorrect) {
    state.correct += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    el.feedbackTitle.textContent = "정답입니다!";
    el.feedbackText.textContent = q.explanation;
  } else {
    state.streak = 0;
    el.feedback.classList.add("wrong");
    el.feedbackTitle.textContent = `정답은 ‘${q.answer}’입니다.`;
    el.feedbackText.textContent = q.explanation;
  }
  el.verseReference.textContent = q.reference;
  el.feedback.hidden = false;
  el.nextButton.disabled = false;
  el.nextButtonText.textContent = state.index === SESSION_SIZE - 1 ? "결과 확인하기" : "다음 문제";
  updateHeader();
  el.nextButton.focus();
}

function updateHeader() {
  el.scoreLabel.textContent = state.correct * 10;
  el.streakLabel.textContent = state.streak;
}

function nextQuestion() {
  if (!state.locked) return;
  if (state.index < SESSION_SIZE - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const score = state.correct * 10;
  el.quizView.hidden = true;
  el.resultView.hidden = false;
  el.finalScore.textContent = score;
  el.correctCount.textContent = `${state.correct}문제`;
  el.bestStreak.textContent = `${state.bestStreak}문제`;
  el.answeredCount.textContent = `${SESSION_SIZE}문제`;
  el.resultMessage.textContent = score >= 90 ? "훌륭해요! 대회에서도 차분히 실력을 보여주세요." : score >= 70 ? "좋은 흐름이에요. 틀린 구절을 한 번 더 읽어보세요." : "한 문제씩 다시 익히면 금세 탄탄해질 거예요.";
  el.resultView.focus({ preventScroll: true });
}

el.nextButton.addEventListener("click", nextQuestion);
el.restartButton.addEventListener("click", startQuiz);
el.retryButton.addEventListener("click", startQuiz);

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const register = (tool) => Promise.resolve(context.registerTool(tool)).catch(() => {});
  register({
    name: "start_new_bible_quiz",
    title: "새 성경 퀴즈 시작",
    description: "문제와 보기 순서를 새로 섞어 10문제 성경 퀴즈를 시작합니다.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: () => { startQuiz(); return { status: "started", totalQuestions: SESSION_SIZE }; }
  });
  register({
    name: "answer_current_bible_question",
    title: "현재 성경 문제 답하기",
    description: "현재 보이는 문제의 보기 문구를 선택해 답합니다.",
    inputSchema: { type: "object", properties: { choice: { type: "string", description: "화면에 표시된 보기 문구" } }, required: ["choice"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: ({ choice }) => {
      if (state.locked) throw new Error("현재 문제에는 이미 답했습니다.");
      const button = [...document.querySelectorAll(".answer-button")].find((item) => item.dataset.choice === choice);
      if (!button) throw new Error("현재 보기 중 하나를 정확히 입력해 주세요.");
      const correct = choice === state.questions[state.index].answer;
      chooseAnswer(choice, button);
      return { correct, answer: state.questions[state.index].answer, reference: state.questions[state.index].reference };
    }
  });
}

startQuiz();
registerWebMcpTools();
