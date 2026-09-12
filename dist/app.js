
const SESSION_SIZE = QUESTIONS.length;
const letters = ["A", "B", "C", "D"];

const state = { questions: [], index: 0, correct: 0, streak: 0, bestStreak: 0, locked: false, reviewing: false, complete: false };
const shortForm = document.querySelector("#shortForm");
const shortAnswer = document.querySelector("#shortAnswer");
const selfReview = document.querySelector("#selfReview");
const hint = document.querySelector(".question-hint");

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
  state.questions = shuffle(QUESTIONS).map((q) => ({ ...q, choices: shuffle(q.choices) }));
  Object.assign(state, { index: 0, correct: 0, streak: 0, bestStreak: 0, locked: false, reviewing: false, complete: false });
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
  selfReview.hidden = true;
  state.reviewing = false;
  shortForm.hidden = q.type !== "short";
  shortAnswer.value = "";
  shortAnswer.disabled = false;
  document.querySelector("#checkShortButton").disabled = false;
  el.answers.hidden = q.type === "short";
  document.querySelector(".shuffle-note").hidden = q.type === "short";
  hint.textContent = q.type === "short" ? "주관식 · 답을 적고 정답을 확인하세요." : "객관식 · 가장 알맞은 답 하나를 선택하세요.";
  el.feedback.className = "feedback";
  el.nextButton.disabled = true;
  el.nextButtonText.textContent = q.type === "short" ? "답을 입력해 주세요" : "답을 선택해 주세요";
  el.answers.replaceChildren(...q.choices.map((choice, index) => createAnswer(choice, index)));
  el.questionTitle.focus({ preventScroll: true });
}

function createAnswer(choice, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "answer-button";
  button.setAttribute("aria-pressed", "false");
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
  selectedButton.setAttribute("aria-pressed", "true");
  if (!isCorrect) selectedButton.classList.add("wrong");

  finishAnswer(isCorrect);
}

function normalizeAnswer(value) {
  return value.normalize("NFKC").replace(/[\s,，.。·]/gu, "").toLowerCase();
}

function submitShortAnswer(value) {
  const q = state.questions[state.index];
  if (state.complete || state.locked || state.reviewing || q.type !== "short") throw new Error("지금은 주관식 답안을 제출할 수 없습니다.");
  if (typeof value !== "string" || !value.trim() || value.length > 500) throw new Error("1~500자로 답을 입력해 주세요.");
  shortAnswer.value = value;
  shortAnswer.disabled = true;
  document.querySelector("#checkShortButton").disabled = true;
  // Only exact normalized matches are automatic; alternative phrasing is self-reviewed.
  if (normalizeAnswer(value) === normalizeAnswer(q.answer)) {
    finishAnswer(true);
    return { status: "graded", correct: true, answer: q.answer };
  }
  state.reviewing = true;
  el.feedback.hidden = false;
  el.feedback.className = "feedback reviewing";
  el.feedbackTitle.textContent = "모범답안과 비교해 보세요.";
  el.feedbackText.textContent = q.answer;
  el.verseReference.textContent = q.reference;
  selfReview.hidden = false;
  el.nextButtonText.textContent = "답안을 비교해 주세요";
  document.querySelector("#markCorrect").focus();
  return { status: "needs_self_review", answer: q.answer };
}

function reviewShortAnswer(correct) {
  if (!state.reviewing || typeof correct !== "boolean") throw new Error("비교할 주관식 답안이 없습니다.");
  finishAnswer(correct);
}

function finishAnswer(isCorrect) {
  const q = state.questions[state.index];
  state.locked = true;
  state.reviewing = false;
  selfReview.hidden = true;
  el.feedback.className = "feedback";
  if (isCorrect) {
    state.correct += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    el.feedbackTitle.textContent = "정답입니다!";
    el.feedbackText.textContent = q.type === "short" ? "모범답안: " + q.answer : q.explanation;
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
  el.scoreLabel.textContent = Math.round(state.correct / SESSION_SIZE * 100);
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
  state.complete = true;
  const score = Math.round(state.correct / SESSION_SIZE * 100);
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
shortForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!shortAnswer.value.trim()) {
    shortAnswer.setCustomValidity("답을 입력해 주세요.");
    shortAnswer.reportValidity();
    return;
  }
  submitShortAnswer(shortAnswer.value);
});
shortAnswer.addEventListener("input", () => shortAnswer.setCustomValidity(""));
document.querySelector("#markCorrect").addEventListener("click", () => reviewShortAnswer(true));
document.querySelector("#markWrong").addEventListener("click", () => reviewShortAnswer(false));

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const register = (tool) => Promise.resolve(context.registerTool(tool)).catch(() => {});
  register({
    name: "start_new_bible_quiz",
    title: "새 성경 퀴즈 시작",
    description: "문제와 보기 순서를 새로 섞어 전체 50문제 성경 퀴즈를 시작합니다.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: () => { startQuiz(); return { status: "started", totalQuestions: SESSION_SIZE }; }
  });
  register({
    name: "answer_current_bible_question",
    title: "현재 성경 문제 답하기",
    description: "현재 객관식 보기 또는 주관식 답안을 제출합니다. 주관식 표현이 다르면 자기 채점이 필요합니다.",
    inputSchema: { type: "object", properties: { choice: { type: "string", description: "화면에 표시된 보기 문구" } }, required: ["choice"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: ({ choice }) => {
      if (state.complete || state.locked || state.reviewing) throw new Error("현재 답안을 제출할 수 없습니다.");
      if (state.questions[state.index].type === "short") return submitShortAnswer(choice);
      const button = [...document.querySelectorAll(".answer-button")].find((item) => item.dataset.choice === choice);
      if (!button) throw new Error("현재 보기 중 하나를 정확히 입력해 주세요.");
      const correct = choice === state.questions[state.index].answer;
      chooseAnswer(choice, button);
      return { correct, answer: state.questions[state.index].answer, reference: state.questions[state.index].reference };
    }
  });
  register({
    name: "review_short_bible_answer",
    description: "제출한 주관식 답안을 모범답안과 비교하여 정답 여부를 기록합니다.",
    inputSchema: { type: "object", properties: { correct: { type: "boolean" } }, required: ["correct"], additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute: ({ correct }) => { reviewShortAnswer(correct); return { status: "graded", correct }; }
  });
}

startQuiz();
registerWebMcpTools();
