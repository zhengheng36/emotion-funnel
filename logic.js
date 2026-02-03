// 状态管理与核心逻辑
const app = {
    // 状态
    state: {
        currentViewId: 'view-q1',
        history: [], // 存储历史 viewId 的栈
        group: null,
        subChoice: null,
        finalWord: null
    },

    // 导航函数：进入新页面
    navigate: (targetViewId, data = null) => {
        // 1. 保存当前页面到历史记录
        app.state.history.push(app.state.currentViewId);
        
        // 2. 更新数据状态 (如果有)
        if (targetViewId === 'view-group' && data) {
            app.state.group = data;
        }
        
        // 3. 切换视图
        app.changeView(targetViewId);
        
        // 4. 如果需要，渲染动态内容
        if (targetViewId === 'view-group') {
            app.renderGroupQuestions();
        }
    },

    // 专门处理子选项的选择 (从 Step 2 -> Step 3)
    selectSubOption: (questionObj) => {
        app.state.history.push(app.state.currentViewId); // 保存 step 2
        app.state.subChoice = questionObj.core;
        
        app.renderFinalChoices(questionObj);
        app.changeView('view-final');
    },

    // 专门处理最终结果 (从 Step 3 -> Result)
    showResult: (finalWord) => {
        app.state.history.push(app.state.currentViewId); // 保存 step 3
        app.state.finalWord = finalWord;
        
        app.renderResult();
        app.changeView('view-result');
    },

    // 核心：返回上一步
    back: () => {
        if (app.state.history.length === 0) return;

        // 弹出上一个视图 ID
        const prevViewId = app.state.history.pop();
        
        // 切换回上一个视图
        app.changeView(prevViewId);
    },

    // 视图切换底层逻辑
    changeView: (viewId) => {
        // 隐藏所有视图
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        
        // 显示目标视图
        document.getElementById(viewId).classList.add('active');
        app.state.currentViewId = viewId;

        // 控制返回按钮的显示/隐藏
        const backBtn = document.getElementById('back-btn');
        if (app.state.history.length > 0) {
            backBtn.classList.remove('hidden');
        } else {
            backBtn.classList.add('hidden');
        }

        // 更新进度条 (简单映射)
        let progress = 10;
        if (viewId === 'view-q2') progress = 25;
        if (viewId === 'view-q3' || viewId === 'view-q4') progress = 40;
        if (viewId === 'view-group') progress = 65;
        if (viewId === 'view-final') progress = 85;
        if (viewId === 'view-result') progress = 100;
        document.getElementById('progress').style.width = progress + '%';
    },

    // --- 渲染逻辑 ---

    renderGroupQuestions: () => {
        const groupCode = app.state.group;
        // 注意：groupsData 来自 data.js
        const info = groupsData[groupCode];
        
        document.getElementById('group-title').innerText = info.name;
        document.getElementById('group-title').style.color = info.color;
        
        const container = document.getElementById('group-questions');
        container.innerHTML = ''; // 清空旧内容

        info.questions.forEach((q, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `<span>${index + 1}. ${q.text}</span> <span>➜</span>`;
            btn.onclick = () => app.selectSubOption(q);
            container.appendChild(btn);
        });
    },

    renderFinalChoices: (questionObj) => {
        document.getElementById('sub-title').innerText = `核心感受是“${questionObj.core}”，具体表现为？`;
        const container = document.getElementById('final-choices');
        container.innerHTML = '';

        questionObj.subs.forEach(subText => {
            const parts = subText.split('➔');
            const desc = parts[0].trim();
            const word = parts[1] ? parts[1].trim() : desc;

            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `<span>${subText}</span>`;
            btn.onclick = () => app.showResult(word);
            container.appendChild(btn);
        });
    },

    renderResult: () => {
        const groupCode = app.state.group;
        const groupInfo = groupsData[groupCode];
        const coreEmotion = app.state.subChoice;

        document.getElementById('result-word').innerText = app.state.finalWord;
        document.getElementById('result-word').style.color = groupInfo.color;
        document.getElementById('result-core').innerText = groupInfo.name;

        // 注意：contentLibrary 来自 data.js
        const contentContainer = document.getElementById('content-display');
        contentContainer.innerHTML = contentLibrary[groupCode];

        // 高亮逻辑
        const rows = contentContainer.querySelectorAll('tr');
        rows.forEach(row => {
            const key = row.getAttribute('data-key');
            if (key && (coreEmotion.includes(key) || key.includes(coreEmotion))) {
                row.classList.add('highlight-row');
            }
        });
    }
};