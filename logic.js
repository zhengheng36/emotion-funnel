const app = {
    // 状态
    state: {
        currentViewId: 'view-q1',
        history: [],
        group: null,            
        currentQuestionObj: null, 
        currentQuestionIndex: null,
        subChoiceIndex: null,   
        lang: 'zh',
        theme: 'light' // 默认主题
    },

    // --- 【新增】软重置：保留语言，重置流程 ---
    restart: () => {
        // 1. 清空所有选择状态
        app.state.history = [];
        app.state.group = null;
        app.state.currentQuestionObj = null;
        app.state.currentQuestionIndex = null;
        app.state.subChoiceIndex = null;
        
        // 2. 注意：这里故意不重置 app.state.lang 和 app.state.theme

        // 3. 强制回到第一页
        app.changeView('view-q1');
        
        // 4. 滚动到顶部
        window.scrollTo(0, 0);
    },

    // --- 【新增】夜间模式切换 ---
    toggleTheme: () => {
        const newTheme = app.state.theme === 'light' ? 'dark' : 'light';
        app.applyTheme(newTheme);
    },

    applyTheme: (themeName) => {
        app.state.theme = themeName;
        const htmlEl = document.documentElement;
        const iconEl = document.getElementById('theme-icon');

        // 设置 HTML 属性供 CSS 使用
        if (themeName === 'dark') {
            htmlEl.setAttribute('data-theme', 'dark');
            iconEl.innerText = '☀️'; // 切换成太阳图标
        } else {
            htmlEl.removeAttribute('data-theme');
            iconEl.innerText = '🌙'; // 切换成月亮图标
        }
        
        // 保存到本地存储（刷新后还在）
        localStorage.setItem('emotionFunnelTheme', themeName);
    },

    // --- 语言切换 ---
    toggleLang: () => {
        app.state.lang = app.state.lang === 'zh' ? 'en' : 'zh';
        
        const langBtnText = app.state.lang === 'zh' ? 'EN / 中' : '中 / EN';
        document.getElementById('lang-display').innerText = langBtnText;

        app.updateStaticText();

        // 刷新当前视图
        if (app.state.currentViewId === 'view-group') app.renderGroupQuestions();
        if (app.state.currentViewId === 'view-final') app.renderFinalChoices();
        if (app.state.currentViewId === 'view-result') app.renderResult();
    },

    updateStaticText: () => {
        const uiData = RESOURCES[app.state.lang].ui;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (uiData[key]) el.innerText = uiData[key];
        });
    },

    // --- 导航逻辑 ---
    navigate: (targetViewId, data = null) => {
        app.state.history.push(app.state.currentViewId);
        if (targetViewId === 'view-group' && data) {
            app.state.group = data;
        }
        app.changeView(targetViewId);
        if (targetViewId === 'view-group') {
            app.renderGroupQuestions();
        }
    },

    // Step 2 -> Step 3
    selectSubOption: (questionObj, qIndex) => {
        app.state.history.push(app.state.currentViewId);
        app.state.currentQuestionObj = questionObj; 
        app.state.currentQuestionIndex = qIndex;
        
        app.renderFinalChoices();
        app.changeView('view-final');
    },

    // Step 3 -> Result
    showResult: (index) => {
        app.state.history.push(app.state.currentViewId);
        app.state.subChoiceIndex = index;
        
        app.renderResult();
        app.changeView('view-result');
    },

    back: () => {
        if (app.state.history.length === 0) return;
        const prevViewId = app.state.history.pop();
        app.changeView(prevViewId);
    },

    changeView: (viewId) => {
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
        app.state.currentViewId = viewId;

        const backBtn = document.getElementById('back-btn');
        if (app.state.history.length > 0) {
            backBtn.classList.remove('hidden');
        } else {
            backBtn.classList.add('hidden');
        }

        let progress = 10;
        if (viewId === 'view-q2') progress = 25;
        if (viewId === 'view-q3' || viewId === 'view-q4') progress = 40;
        if (viewId === 'view-group') progress = 65;
        if (viewId === 'view-final') progress = 85;
        if (viewId === 'view-result') progress = 100;
        document.getElementById('progress').style.width = progress + '%';
    },

    toggleZoom: (show) => {
        const modal = document.getElementById('image-modal');
        if (show) modal.classList.add('active');
        else modal.classList.remove('active');
    },

    // --- 渲染逻辑 ---

    renderGroupQuestions: () => {
        const lang = app.state.lang;
        const groupCode = app.state.group;
        const info = RESOURCES[lang].groups[groupCode];
        
        document.getElementById('group-title').innerText = info.name;
        document.getElementById('group-title').style.color = info.color;
        
        const container = document.getElementById('group-questions');
        container.innerHTML = '';

        info.questions.forEach((q, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `<span>${index + 1}. ${q.text}</span> <span>➜</span>`;
            btn.onclick = () => app.selectSubOption(q, index);
            container.appendChild(btn);
        });
    },

    renderFinalChoices: () => {
        const lang = app.state.lang;
        const groupCode = app.state.group;
        const qIndex = app.state.currentQuestionIndex;
        
        const currentLangGroup = RESOURCES[lang].groups[groupCode];
        const questionObj = currentLangGroup.questions[qIndex];
        const ui = RESOURCES[lang].ui;

        document.getElementById('sub-title').innerText = `${ui.step3_text_prefix} “${questionObj.core}”${ui.step3_text_suffix}`;
        const container = document.getElementById('final-choices');
        container.innerHTML = '';

        questionObj.subs.forEach((subText, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `<span>${subText}</span>`;
            btn.onclick = () => app.showResult(index);
            container.appendChild(btn);
        });
    },

    renderResult: () => {
        const lang = app.state.lang;
        const groupCode = app.state.group;
        const groupInfo = RESOURCES[lang].groups[groupCode];
        
        const qIndex = app.state.currentQuestionIndex;
        const subIndex = app.state.subChoiceIndex;
        
        const questionObj = groupInfo.questions[qIndex];
        const subTextString = questionObj.subs[subIndex];
        
        const parts = subTextString.split('➔');
        const finalWord = parts[1] ? parts[1].trim() : parts[0].trim();
        const coreEmotion = questionObj.core;

        document.getElementById('result-word').innerText = finalWord;
        document.getElementById('result-word').style.color = groupInfo.color;
        document.getElementById('result-core').innerText = groupInfo.name;

        const contentContainer = document.getElementById('content-display');
        contentContainer.innerHTML = RESOURCES[lang].content[groupCode];

        const rows = contentContainer.querySelectorAll('tr');
        rows.forEach(row => {
            const key = row.getAttribute('data-key');
            if (key && (coreEmotion.includes(key) || key.includes(coreEmotion) || finalWord.includes(key))) {
                row.classList.add('highlight-row');
            }
        });
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 1. 加载语言文字
    app.updateStaticText();
    
    // 2. 加载保存的主题
    const savedTheme = localStorage.getItem('emotionFunnelTheme');
    if (savedTheme) {
        app.applyTheme(savedTheme);
    }
});