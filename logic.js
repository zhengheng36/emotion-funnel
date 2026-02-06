const app = {
    // 状态
    state: {
        currentViewId: 'view-q1',
        history: [],
        group: null,            // 例如 'A'
        currentQuestionObj: null, // 当前选中的核心问题对象
        subChoiceIndex: null,   // 【改动】记录最终选项的索引 (0, 1...)
        lang: 'zh'
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
        // 保存当前的核心问题对象，以及它在数组中的索引
        app.state.currentQuestionObj = questionObj; 
        app.state.currentQuestionIndex = qIndex; // 新增：保存核心问题的索引
        
        app.renderFinalChoices();
        app.changeView('view-final');
    },

    // Step 3 -> Result
    // 【改动】这里不再传字符串，而是传 index
    showResult: (index) => {
        app.state.history.push(app.state.currentViewId);
        app.state.subChoiceIndex = index; // 记录你选了第几个
        
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
            // 传入 q 对象和 index
            btn.onclick = () => app.selectSubOption(q, index);
            container.appendChild(btn);
        });
    },

    renderFinalChoices: () => {
        const lang = app.state.lang;
        const groupCode = app.state.group;
        
        // 【关键】从当前的语言库里，重新获取正确的问题对象
        // 这样即使语言切换了，显示的也是新语言的选项
        const qIndex = app.state.currentQuestionIndex;
        const currentLangGroup = RESOURCES[lang].groups[groupCode];
        const questionObj = currentLangGroup.questions[qIndex];
        const ui = RESOURCES[lang].ui;

        document.getElementById('sub-title').innerText = `${ui.step3_text_prefix} “${questionObj.core}”${ui.step3_text_suffix}`;
        const container = document.getElementById('final-choices');
        container.innerHTML = '';

        questionObj.subs.forEach((subText, index) => {
            // subText 格式: "描述 ➔ 词汇"
            // 我们还是只显示 text，但点击时传 index
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `<span>${subText}</span>`;
            // 【改动】点击传递索引 index
            btn.onclick = () => app.showResult(index);
            container.appendChild(btn);
        });
    },

    renderResult: () => {
        const lang = app.state.lang;
        const groupCode = app.state.group;
        
        // 1. 获取当前语言的组信息
        const groupInfo = RESOURCES[lang].groups[groupCode];
        
        // 2. 获取当前语言的最终词汇
        // 路径: Group -> Questions[index] -> Subs[index] -> split拿到后半部分
        const qIndex = app.state.currentQuestionIndex;
        const subIndex = app.state.subChoiceIndex;
        
        const questionObj = groupInfo.questions[qIndex];
        const subTextString = questionObj.subs[subIndex];
        
        // 解析 "Description ➔ Word"
        const parts = subTextString.split('➔');
        const finalWord = parts[1] ? parts[1].trim() : parts[0].trim();
        const coreEmotion = questionObj.core; // 用于表格高亮匹配

        document.getElementById('result-word').innerText = finalWord;
        document.getElementById('result-word').style.color = groupInfo.color;
        document.getElementById('result-core').innerText = groupInfo.name;

        // 3. 渲染内容表格
        const contentContainer = document.getElementById('content-display');
        contentContainer.innerHTML = RESOURCES[lang].content[groupCode];

        // 4. 表格高亮 (模糊匹配 Core 或 FinalWord)
        const rows = contentContainer.querySelectorAll('tr');
        rows.forEach(row => {
            const key = row.getAttribute('data-key');
            if (key && (coreEmotion.includes(key) || key.includes(coreEmotion) || finalWord.includes(key))) {
                row.classList.add('highlight-row');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.updateStaticText();
});