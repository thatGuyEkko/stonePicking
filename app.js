const MAX_PICK = 3;
const TOTAL_MIN = 6;
const TOTAL_MAX = 99;
const DEFAULT_TOTAL = 16;
const LANGUAGE_STORAGE_KEY = "rock-pick-language";

const DEFAULT_NAMES = {
    "zh-CN": {
        player1: "你",
        player2: "对手",
        ai: "石子 AI"
    },
    en: {
        player1: "You",
        player2: "Opponent",
        ai: "Stone AI"
    }
};

const COPY = {
    "zh-CN": {
        documentTitle: "捡石子小游戏",
        eyebrow: "轻量策略小游戏",
        title: "捡石子",
        subtitle: "小规则里也有真选择，算准节奏就能把局面拿住。",
        ruleBanner: "固定规则：每回合只能拿 1 到 3 颗，而且不能和上一手的数量相同。",
        maxPickLabel: "单次拿取",
        repeatRuleLabel: "重复限制",
        repeatRuleValue: "不能重复上一手",
        setupTitle: "对局设置",
        setupHint: "先设好模式、名字和石子数量，再开始这一局。",
        modeLabel: "对战模式",
        modeAi: "玩家 vs AI",
        modePvp: "玩家 vs 玩家",
        totalLabel: "石子总数",
        player1Label: "玩家 1",
        player2Label: "玩家 2",
        aiNameLabel: "AI 名称",
        player1Placeholder: "你的名字",
        player2Placeholder: "另一位玩家",
        aiPlaceholder: "给 AI 起个名",
        startGame: "开始游戏",
        rulesTitle: "规则说明",
        rulesHint: "开始前快速过一眼，进入对局后就只保留核心操作区。",
        rules: [
            "一堆石子由双方轮流拿取。",
            "每回合只能拿 1、2 或 3 颗。",
            "这一手不能和上一手拿取相同数量。",
            "拿到最后一颗，或者让对手无合法操作，即可获胜。"
        ],
        remainingLabel: "剩余石子",
        lastPickLabel: "上一手",
        boardTitle: "石子堆",
        actionsLabel: "本回合可选",
        logTitle: "对局记录",
        logHintExpand: "点击展开查看",
        logHintCollapse: "点击收起",
        newRound: "再来一局",
        backToSetup: "返回设置",
        closeModal: "继续查看",
        resultLabel: "对局结果",
        humanFirstRole: "先手",
        humanSecondRole: "后手",
        aiRole: "AI 对手",
        statusTurn: ({ name }) => `轮到 ${name}`,
        statusThinking: ({ name }) => `${name} 正在思考...`,
        statusComplete: "本局结束",
        turnHint: ({ moves }) => `可拿 ${moves.join(" / ")} 颗`,
        turnHintBlocked: ({ name }) => `${name} 没有合法操作`,
        winnerTakeLast: ({ name }) => `${name} 拿到最后一颗，赢了`,
        resultTitle: ({ name }) => `${name} 获胜`,
        resultCopyTakeLast: ({ name }) => `${name} 拿到了最后一颗石子，这局结束。`,
        resultCopyNoMoves: ({ winner, loser }) => `${loser} 已经没有合法操作，${winner} 拿下这一局。`,
        emptyLog: "开局后，这里会按顺序记录每一步。",
        moveEntry: ({ name, count, left }) => `${name} 拿了 ${count} 颗，剩余 ${left} 颗`,
        pickButton: ({ count }) => `拿 ${count}`,
        noLastPick: "无",
        totalRangeError: "请输入 6 到 99 之间的石子数。",
        logCount: ({ count }) => `共 ${count} 手`
    },
    en: {
        documentTitle: "Rock Pick",
        eyebrow: "Pocket strategy game",
        title: "Rock Pick",
        subtitle: "A tiny ruleset with real decisions. Read the rhythm, then close the game.",
        ruleBanner: "Fixed rule set: take 1 to 3 stones each turn, and you cannot repeat the previous move.",
        maxPickLabel: "Per turn",
        repeatRuleLabel: "Repeat rule",
        repeatRuleValue: "No same pick twice",
        setupTitle: "Match Setup",
        setupHint: "Pick the mode, names, and stone count before you start.",
        modeLabel: "Mode",
        modeAi: "Player vs AI",
        modePvp: "Player vs Player",
        totalLabel: "Total stones",
        player1Label: "Player 1",
        player2Label: "Player 2",
        aiNameLabel: "AI name",
        player1Placeholder: "Your name",
        player2Placeholder: "Other player",
        aiPlaceholder: "Name the AI",
        startGame: "Start Game",
        rulesTitle: "Rules",
        rulesHint: "Give the rules a quick scan now. Once play starts, the screen stays focused on the match.",
        rules: [
            "Both sides take turns from the same pile of stones.",
            "Each move can take 1, 2, or 3 stones.",
            "You cannot take the same amount as the previous move.",
            "Take the last stone, or leave your opponent with no legal move, to win."
        ],
        remainingLabel: "Stones left",
        lastPickLabel: "Last move",
        boardTitle: "Stone Pile",
        actionsLabel: "Available moves",
        logTitle: "Match Log",
        logHintExpand: "Tap to expand",
        logHintCollapse: "Tap to collapse",
        newRound: "Play Again",
        backToSetup: "Back to Setup",
        closeModal: "Keep Viewing",
        resultLabel: "Match Result",
        humanFirstRole: "First move",
        humanSecondRole: "Second move",
        aiRole: "AI opponent",
        statusTurn: ({ name }) => `${name}'s turn`,
        statusThinking: ({ name }) => `${name} is thinking...`,
        statusComplete: "Game complete",
        turnHint: ({ moves }) => `Available picks: ${moves.join(" / ")}`,
        turnHintBlocked: ({ name }) => `${name} has no legal move`,
        winnerTakeLast: ({ name }) => `${name} took the last stone`,
        resultTitle: ({ name }) => `${name} wins`,
        resultCopyTakeLast: ({ name }) => `${name} took the last stone and closed the round.`,
        resultCopyNoMoves: ({ winner, loser }) => `${loser} has no legal move left, so ${winner} takes the round.`,
        emptyLog: "Every move in this round will appear here.",
        moveEntry: ({ name, count, left }) => `${name} took ${count} ${count === 1 ? "stone" : "stones"}, ${left} left`,
        pickButton: ({ count }) => `Take ${count}`,
        noLastPick: "None",
        totalRangeError: "Enter a stone count between 6 and 99.",
        logCount: ({ count }) => `${count} moves`
    }
};

const state = {
    lang: loadLanguage(),
    gameMode: "ai",
    total: DEFAULT_TOTAL,
    remaining: DEFAULT_TOTAL,
    turn: 0,
    lastPick: 0,
    gameStarted: false,
    busy: false,
    winner: null,
    resultModalDismissed: false,
    log: [],
    players: [],
    aiTimer: null,
    animationTimer: null
};

const dom = {
    modeSelect: document.getElementById("modeSelect"),
    totalStones: document.getElementById("totalStones"),
    player1: document.getElementById("player1"),
    player2: document.getElementById("player2"),
    player2LabelText: document.getElementById("player2LabelText"),
    startButton: document.getElementById("startButton"),
    newRoundButton: document.getElementById("newRoundButton"),
    backButton: document.getElementById("backButton"),
    rulesList: document.getElementById("rulesList"),
    status: document.getElementById("status"),
    turnHint: document.getElementById("turnHint"),
    remainingCount: document.getElementById("remainingCount"),
    lastPickValue: document.getElementById("lastPickValue"),
    playerCard0: document.getElementById("playerCard0"),
    playerCard1: document.getElementById("playerCard1"),
    avatar0: document.getElementById("avatar0"),
    avatar1: document.getElementById("avatar1"),
    playerName0: document.getElementById("playerName0"),
    playerName1: document.getElementById("playerName1"),
    playerRole0: document.getElementById("playerRole0"),
    playerRole1: document.getElementById("playerRole1"),
    stonesStage: document.getElementById("stonesStage"),
    stonesGrid: document.getElementById("stonesGrid"),
    stoneOverlay: document.getElementById("stoneOverlay"),
    actions: document.getElementById("actions"),
    logList: document.getElementById("logList"),
    logCounter: document.getElementById("logCounter"),
    logHint: document.getElementById("logHint"),
    setupScreen: document.getElementById("setupScreen"),
    gameScreen: document.getElementById("gameScreen"),
    gamePanel: document.getElementById("gamePanel"),
    resultModal: document.getElementById("resultModal"),
    resultModalTitle: document.getElementById("resultModalTitle"),
    resultModalCopy: document.getElementById("resultModalCopy"),
    modalNewRoundButton: document.getElementById("modalNewRoundButton"),
    modalCloseButton: document.getElementById("modalCloseButton"),
    modalBackButton: document.getElementById("modalBackButton"),
    langButtons: Array.from(document.querySelectorAll(".lang-btn")),
    i18nNodes: Array.from(document.querySelectorAll("[data-i18n]"))
};

const positionMemo = new Map();

bootstrap();

function bootstrap() {
    dom.modeSelect.value = "ai";
    dom.totalStones.value = String(state.total);
    state.players = [DEFAULT_NAMES[state.lang].player1, DEFAULT_NAMES[state.lang].ai];
    dom.player1.value = state.players[0];
    dom.player2.value = state.players[1];

    dom.modeSelect.addEventListener("change", handleModeChange);
    dom.totalStones.addEventListener("blur", clampTotalInput);
    dom.startButton.addEventListener("click", startGame);
    dom.newRoundButton.addEventListener("click", startGame);
    dom.backButton.addEventListener("click", hideGame);
    dom.logList.closest(".log-section").addEventListener("toggle", renderLogHint);
    dom.modalNewRoundButton.addEventListener("click", () => {
        closeResultModal();
        startGame();
    });
    dom.modalCloseButton.addEventListener("click", closeResultModal);
    dom.modalBackButton.addEventListener("click", () => {
        closeResultModal();
        hideGame();
    });

    dom.langButtons.forEach((button) => {
        button.addEventListener("click", () => applyLanguage(button.dataset.lang));
    });

    renderStaticText();
    renderSetupState();
    renderGameVisibility();
}

function loadLanguage() {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === "en" ? "en" : "zh-CN";
}

function saveLanguage(lang) {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

function t(key, params = {}) {
    const value = COPY[state.lang][key];
    return typeof value === "function" ? value(params) : value;
}

function currentSetupMode() {
    return dom.modeSelect.value;
}

function getDefaultName(key, mode) {
    if (key === "player2") {
        return DEFAULT_NAMES[state.lang][mode === "ai" ? "ai" : "player2"];
    }
    return DEFAULT_NAMES[state.lang][key];
}

function isKnownDefaultName(value, keys) {
    const trimmed = value.trim();
    if (!trimmed) {
        return true;
    }

    return Object.values(DEFAULT_NAMES).some((entry) => keys.some((key) => entry[key] === trimmed));
}

function applyLanguage(nextLang) {
    if (!COPY[nextLang] || nextLang === state.lang) {
        return;
    }

    const setupMode = currentSetupMode();
    const currentPlayer1 = dom.player1.value;
    const currentPlayer2 = dom.player2.value;
    const livePlayer1 = state.players[0] || "";
    const livePlayer2 = state.players[1] || "";

    state.lang = nextLang;
    saveLanguage(nextLang);

    dom.player1.value = isKnownDefaultName(currentPlayer1, ["player1"])
        ? getDefaultName("player1", setupMode)
        : currentPlayer1;
    dom.player2.value = isKnownDefaultName(currentPlayer2, ["player2", "ai"])
        ? getDefaultName("player2", setupMode)
        : currentPlayer2;

    if (state.players.length === 2) {
        state.players[0] = isKnownDefaultName(livePlayer1, ["player1"])
            ? DEFAULT_NAMES[state.lang].player1
            : livePlayer1;
        state.players[1] = isKnownDefaultName(livePlayer2, ["player2", "ai"])
            ? DEFAULT_NAMES[state.lang][state.gameMode === "ai" ? "ai" : "player2"]
            : livePlayer2;
    }

    renderStaticText();
    renderSetupState();
    renderGameState();
}

function renderStaticText() {
    document.documentElement.lang = state.lang;
    document.documentElement.dataset.lang = state.lang;
    document.title = t("documentTitle");

    dom.i18nNodes.forEach((node) => {
        node.textContent = t(node.dataset.i18n);
    });

    dom.modeSelect.options[0].textContent = t("modeAi");
    dom.modeSelect.options[1].textContent = t("modePvp");
    dom.startButton.textContent = t("startGame");
    dom.newRoundButton.textContent = t("newRound");
    dom.backButton.textContent = t("backToSetup");
    dom.modalNewRoundButton.textContent = t("newRound");
    dom.modalCloseButton.textContent = t("closeModal");
    dom.modalBackButton.textContent = t("backToSetup");

    renderRulesList();
    renderLanguageButtons();
    renderLogHint();
    renderResultModal();
}

function renderRulesList() {
    dom.rulesList.replaceChildren();
    t("rules").forEach((rule) => {
        const item = document.createElement("li");
        item.textContent = rule;
        dom.rulesList.appendChild(item);
    });
}

function renderLanguageButtons() {
    dom.langButtons.forEach((button) => {
        const active = button.dataset.lang === state.lang;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
    });
}

function renderSetupState() {
    const mode = currentSetupMode();

    dom.player2LabelText.textContent = mode === "ai" ? t("aiNameLabel") : t("player2Label");
    dom.player1.placeholder = t("player1Placeholder");
    dom.player2.placeholder = mode === "ai" ? t("aiPlaceholder") : t("player2Placeholder");

    if (isKnownDefaultName(dom.player1.value, ["player1"])) {
        dom.player1.value = DEFAULT_NAMES[state.lang].player1;
    }

    if (isKnownDefaultName(dom.player2.value, ["player2", "ai"])) {
        dom.player2.value = getDefaultName("player2", mode);
    }
}

function renderGameVisibility() {
    dom.setupScreen.classList.toggle("is-hidden", state.gameStarted);
    dom.gameScreen.classList.toggle("is-hidden", !state.gameStarted);
    document.body.classList.toggle("is-game-mode", state.gameStarted);

    if (!state.gameStarted) {
        closeResultModal();
    }
}

function renderGameState() {
    renderGameVisibility();
    renderResultModal();

    if (!state.gameStarted) {
        return;
    }

    renderStatus();
    renderMetrics();
    renderPlayers();
    renderStones();
    renderActions();
    renderLog();
}

function renderStatus() {
    if (state.winner) {
        const winnerName = state.players[state.winner.index];
        const loserName = state.players[state.winner.loserIndex];

        dom.status.textContent = t("statusComplete");
        dom.turnHint.textContent = state.winner.reason === "no-moves"
            ? t("turnHintBlocked", { name: loserName })
            : t("winnerTakeLast", { name: winnerName });
        return;
    }

    const activeName = state.players[state.turn];
    const legalMoves = getLegalMoves();

    dom.status.textContent = state.busy && state.gameMode === "ai" && state.turn === 1
        ? t("statusThinking", { name: activeName })
        : t("statusTurn", { name: activeName });
    dom.turnHint.textContent = t("turnHint", { moves: legalMoves });
}

function renderResultModal() {
    if (!state.winner) {
        closeResultModal();
        return;
    }

    if (state.resultModalDismissed) {
        dom.resultModal.classList.add("is-hidden");
        return;
    }

    const winnerName = state.players[state.winner.index];
    const loserName = state.players[state.winner.loserIndex];

    dom.resultModalTitle.textContent = t("resultTitle", { name: winnerName });
    dom.resultModalCopy.textContent = state.winner.reason === "no-moves"
        ? t("resultCopyNoMoves", { winner: winnerName, loser: loserName })
        : t("resultCopyTakeLast", { name: winnerName });
    dom.resultModal.classList.remove("is-hidden");
}

function closeResultModal() {
    if (state.winner) {
        state.resultModalDismissed = true;
    }
    dom.resultModal.classList.add("is-hidden");
}

function renderMetrics() {
    dom.remainingCount.textContent = String(state.remaining);
    dom.lastPickValue.textContent = state.lastPick ? String(state.lastPick) : t("noLastPick");
}

function renderPlayers() {
    const secondAvatar = state.gameMode === "ai" ? "🤖" : "🧑‍💻";

    dom.avatar0.textContent = "🧑";
    dom.avatar1.textContent = secondAvatar;
    dom.playerName0.textContent = state.players[0];
    dom.playerName1.textContent = state.players[1];
    dom.playerRole0.textContent = t("humanFirstRole");
    dom.playerRole1.textContent = state.gameMode === "ai" ? t("aiRole") : t("humanSecondRole");

    [dom.playerCard0, dom.playerCard1].forEach((card, index) => {
        const isActive = !state.winner && state.turn === index;
        const isWinner = Boolean(state.winner) && state.winner.index === index;
        card.classList.toggle("is-active", isActive);
        card.classList.toggle("is-winner", isWinner);
    });
}

function renderStones() {
    dom.stonesGrid.replaceChildren();
    dom.stoneOverlay.replaceChildren();

    for (let index = 0; index < state.total; index += 1) {
        const stone = document.createElement("span");
        stone.className = "stone-token";
        stone.textContent = "🪨";
        stone.dataset.index = String(index);

        if (index >= state.remaining) {
            stone.classList.add("is-spent");
        } else if (index >= Math.max(0, state.remaining - 3)) {
            stone.classList.add("is-hot");
        }

        dom.stonesGrid.appendChild(stone);
    }
}

function renderActions() {
    dom.actions.replaceChildren();
    const legalMoves = new Set(getLegalMoves());

    for (let count = 1; count <= MAX_PICK; count += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "action-btn";
        button.textContent = t("pickButton", { count });
        button.disabled = !legalMoves.has(count)
            || state.busy
            || Boolean(state.winner)
            || (state.gameMode === "ai" && state.turn === 1);
        button.classList.toggle("is-allowed", legalMoves.has(count));
        button.addEventListener("click", () => pickStones(count, false));
        dom.actions.appendChild(button);
    }
}

function renderLog() {
    dom.logList.replaceChildren();
    dom.logCounter.textContent = t("logCount", { count: state.log.length });
    renderLogHint();

    if (state.log.length === 0) {
        const empty = document.createElement("div");
        empty.className = "log-empty";
        empty.textContent = t("emptyLog");
        dom.logList.appendChild(empty);
        return;
    }

    state.log.forEach((entry) => {
        const row = document.createElement("div");
        row.className = "log-entry";
        row.classList.add(state.gameMode === "ai" && entry.playerIndex === 1 ? "is-ai" : "is-human");

        const marker = document.createElement("span");
        marker.className = "log-marker";

        const body = document.createElement("div");
        body.className = "log-body";

        const sentence = document.createElement("div");
        sentence.textContent = t("moveEntry", {
            name: state.players[entry.playerIndex],
            count: entry.count,
            left: entry.left
        });
        body.appendChild(sentence);

        row.appendChild(marker);
        row.appendChild(body);
        dom.logList.appendChild(row);
    });

    dom.logList.scrollTop = dom.logList.scrollHeight;
}

function renderLogHint() {
    const details = dom.logList.closest(".log-section");
    dom.logHint.textContent = details && details.open ? t("logHintCollapse") : t("logHintExpand");
}

function handleModeChange() {
    renderSetupState();
}

function clampTotalInput() {
    const parsed = Number.parseInt(dom.totalStones.value, 10);
    const nextValue = Number.isNaN(parsed) ? state.total : Math.max(TOTAL_MIN, Math.min(TOTAL_MAX, parsed));
    dom.totalStones.value = String(nextValue);
}

function startGame() {
    clearTimers();
    closeResultModal();
    clampTotalInput();

    const total = Number.parseInt(dom.totalStones.value, 10);
    if (Number.isNaN(total) || total < TOTAL_MIN || total > TOTAL_MAX) {
        window.alert(t("totalRangeError"));
        return;
    }

    state.gameMode = currentSetupMode();
    state.total = total;
    state.remaining = total;
    state.turn = 0;
    state.lastPick = 0;
    state.gameStarted = true;
    state.busy = false;
    state.winner = null;
    state.resultModalDismissed = false;
    state.log = [];
    state.players = [
        normalizeName(dom.player1.value, ["player1"], "player1"),
        normalizeName(dom.player2.value, ["player2", "ai"], state.gameMode === "ai" ? "ai" : "player2")
    ];

    renderGameState();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function hideGame() {
    clearTimers();
    closeResultModal();
    state.gameStarted = false;
    state.busy = false;
    state.winner = null;
    state.resultModalDismissed = false;
    state.log = [];
    renderGameVisibility();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function normalizeName(rawValue, knownKeys, defaultKey) {
    const trimmed = rawValue.trim();
    if (!trimmed) {
        return DEFAULT_NAMES[state.lang][defaultKey];
    }

    return isKnownDefaultName(trimmed, knownKeys)
        ? DEFAULT_NAMES[state.lang][defaultKey]
        : trimmed;
}

function getLegalMoves(remaining = state.remaining, lastPick = state.lastPick) {
    const moves = [];
    for (let count = 1; count <= MAX_PICK; count += 1) {
        if (count <= remaining && count !== lastPick) {
            moves.push(count);
        }
    }
    return moves;
}

function pickStones(count, fromAi) {
    if (!state.gameStarted || state.busy || state.winner) {
        return;
    }

    if (!fromAi && state.gameMode === "ai" && state.turn === 1) {
        return;
    }

    if (!getLegalMoves().includes(count)) {
        return;
    }

    state.busy = true;
    renderStatus();
    renderActions();
    renderPlayers();

    animatePick(count, state.turn).then(() => {
        completeMove(count);
    });
}

function animatePick(count, playerIndex) {
    const sources = Array.from(dom.stonesGrid.querySelectorAll(".stone-token:not(.is-spent)"))
        .slice(-count);

    if (sources.length === 0) {
        return Promise.resolve();
    }

    const stageRect = dom.stonesStage.getBoundingClientRect();
    const avatar = playerIndex === 0 ? dom.avatar0 : dom.avatar1;
    const avatarRect = avatar.getBoundingClientRect();
    avatar.classList.add("is-collecting");

    sources.forEach((source, index) => {
        source.classList.add("is-lifting");

        const sourceRect = source.getBoundingClientRect();
        const clone = document.createElement("span");
        const startX = sourceRect.left - stageRect.left;
        const startY = sourceRect.top - stageRect.top;
        const endX = avatarRect.left + (avatarRect.width / 2) - (sourceRect.left + (sourceRect.width / 2));
        const endY = avatarRect.top + (avatarRect.height / 2) - (sourceRect.top + (sourceRect.height / 2));

        clone.className = "flight-stone";
        clone.textContent = "🪨";
        clone.style.left = `${startX}px`;
        clone.style.top = `${startY}px`;
        dom.stoneOverlay.appendChild(clone);

        window.requestAnimationFrame(() => {
            clone.style.transitionDelay = `${index * 40}ms`;
            clone.style.transform = `translate(${endX}px, ${endY}px) scale(0.4) rotate(${index % 2 === 0 ? 16 : -16}deg)`;
            clone.style.opacity = "0";
        });
    });

    return new Promise((resolve) => {
        const delay = 680 + (count * 40);
        state.animationTimer = window.setTimeout(() => {
            avatar.classList.remove("is-collecting");
            dom.stoneOverlay.replaceChildren();
            state.animationTimer = null;
            resolve();
        }, delay);
    });
}

function completeMove(count) {
    const playerIndex = state.turn;

    state.remaining -= count;
    state.lastPick = count;
    state.log.push({
        playerIndex,
        count,
        left: state.remaining
    });

    if (state.remaining === 0) {
        finishGame(playerIndex, "take-last");
        return;
    }

    state.turn = 1 - playerIndex;

    if (getLegalMoves().length === 0) {
        finishGame(playerIndex, "no-moves");
        return;
    }

    state.busy = false;
    renderGameState();

    if (state.gameMode === "ai" && state.turn === 1) {
        scheduleAiTurn();
    }
}

function finishGame(winnerIndex, reason) {
    clearTimers();
    state.winner = {
        index: winnerIndex,
        loserIndex: 1 - winnerIndex,
        reason
    };
    state.resultModalDismissed = false;
    state.busy = false;
    renderGameState();
}

function scheduleAiTurn() {
    clearTimeout(state.aiTimer);
    state.busy = true;
    renderStatus();
    renderActions();
    renderPlayers();

    state.aiTimer = window.setTimeout(() => {
        state.aiTimer = null;
        state.busy = false;
        const move = chooseAiMove();
        pickStones(move, true);
    }, 920);
}

function chooseAiMove() {
    const legalMoves = getLegalMoves();
    let bestMove = legalMoves[0];
    let bestOutcome = analyzeMove(state.remaining, state.lastPick, bestMove);

    for (const move of legalMoves) {
        const outcome = analyzeMove(state.remaining, state.lastPick, move);
        if (isBetterOutcome(outcome, bestOutcome)) {
            bestMove = move;
            bestOutcome = outcome;
        }
    }

    return bestMove;
}

function analyzeMove(remaining, lastPick, move) {
    const nextRemaining = remaining - move;

    if (nextRemaining === 0) {
        return {
            canWin: true,
            plies: 1
        };
    }

    const opponentOutcome = analyzePosition(nextRemaining, move);
    return {
        canWin: !opponentOutcome.canWin,
        plies: opponentOutcome.plies + 1
    };
}

function isBetterOutcome(candidate, currentBest) {
    if (candidate.canWin !== currentBest.canWin) {
        return candidate.canWin;
    }

    if (candidate.canWin) {
        return candidate.plies < currentBest.plies;
    }

    return candidate.plies > currentBest.plies;
}

function analyzePosition(remaining, lastPick) {
    const key = `${remaining}:${lastPick}`;
    if (positionMemo.has(key)) {
        return positionMemo.get(key);
    }

    const legalMoves = getLegalMoves(remaining, lastPick);
    if (legalMoves.length === 0) {
        const outcome = {
            canWin: false,
            plies: 0
        };
        positionMemo.set(key, outcome);
        return outcome;
    }

    let bestWinPlies = Number.POSITIVE_INFINITY;
    let bestLossPlies = -1;

    for (const move of legalMoves) {
        const outcome = analyzeMove(remaining, lastPick, move);

        if (outcome.canWin) {
            bestWinPlies = Math.min(bestWinPlies, outcome.plies);
        } else {
            bestLossPlies = Math.max(bestLossPlies, outcome.plies);
        }
    }

    const result = Number.isFinite(bestWinPlies)
        ? { canWin: true, plies: bestWinPlies }
        : { canWin: false, plies: bestLossPlies };

    positionMemo.set(key, result);
    return result;
}

function clearTimers() {
    if (state.aiTimer) {
        window.clearTimeout(state.aiTimer);
        state.aiTimer = null;
    }

    if (state.animationTimer) {
        window.clearTimeout(state.animationTimer);
        state.animationTimer = null;
    }

    dom.stoneOverlay.replaceChildren();
    dom.avatar0.classList.remove("is-collecting");
    dom.avatar1.classList.remove("is-collecting");
}
