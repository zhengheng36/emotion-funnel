// 双语资源库
const RESOURCES = {
    // --- 中文数据 ---
    zh: {
        ui: {
            btn_back: "⬅ 返回",
            btn_back_prev: "⬅ 返回刚才的位置",
            btn_restart: "🔄 重新测试",
            btn_image: "🔍 查看完整情绪识别轮盘",
            btn_image_compare: "🔍 对照完整情绪轮盘",
            
            step1_title: "第一步：大方向判断",
            q1_text: "问题 1：你现在的感觉大体上是舒服的，还是难受的？",
            q1_opt1: "🟢 舒服 / 积极",
            q1_opt2: "🔴 难受 / 消极",
            q1_opt3: "⚪ 惊讶 / 意外",

            q2_text: "问题 2：你的身体能量状态如何？",
            q2_opt1: "🔥 能量高 (心跳快、想动、肌肉紧绷)",
            q2_opt2: "💧 能量低 (身体沉重、不想动、无力)",
            q2_opt3: "🤢 排斥感 (想吐、皱眉、想推开)",

            q3_text: "问题 3：这种高能量的方向是？",
            q3_opt1: "⚔️ 对外 / 攻击 (想反击、想破坏)",
            q3_opt2: "🛡️ 对内 / 躲避 (想逃跑、想钻地洞)",

            q4_text: "问题 4：这种无力感的主要来源是？",
            q4_opt1: "💔 情感上的痛 (失去感、想哭)",
            q4_opt2: "🔋 生理/心理的累 (过载、死机)",

            step2_title: "第二步：精准定位",
            step2_subtitle: "请选择最符合你当下情况的描述：",
            
            step3_title: "第三步：确认细微差别",
            step3_text_prefix: "核心感受是",
            step3_text_suffix: "，具体表现为？",

            result_intro: "你当前的情绪定位是：",
            result_group_prefix: "",
            result_group_suffix: "", // 中文显示：属于 A组 组 (有点怪，不过A组本身带组字，可以接受，或者这里留空)
            result_analysis_title: "📖 情绪解析与解药",
            result_analysis_intro: "这是你的情绪机制拆解。_高亮行_是你当前的状态。",
            
            img_title: "情绪识别轮盘",
            img_hint: "提示：点击图片可查看高清大图。",
            zoom_hint: "再次点击任意处关闭"
        },
        groups: {
            'A': { name: 'A组：愤怒 😠', color: '#e74c3c', questions: [
                { text: "因为别人背信弃义或辜负了你？", core: "被辜负", subs: ["彻底的背叛 ➔ 背叛", "长期的怨气 ➔ 愤恨"] },
                { text: "因为自尊心受损，感到丢脸？", core: "耻辱", subs: ["觉得委屈想哭 ➔ 委屈", "觉得羞愧又恼火 ➔ 羞恼"] },
                { text: "觉得不仅愤怒，还有一种说不出的苦味？", core: "苦涩", subs: ["深刻的恨意 ➔ 愤恨", "边界被踩踏 ➔ 被侵犯"] },
                { text: "因为彻底失控，想要毁灭一切？", core: "发狂", subs: ["因别人拥有而我没有 ➔ 嫉妒", "纯粹的怒火爆发 ➔ 暴怒"] },
                { text: "你现在的姿态想要攻击别人？", core: "咄咄逼人", subs: ["因为被挑衅了 ➔ 被激怒", "天然带有敌意 ➔ 充满敌意"] },
                { text: "因为事情没做好，对自己或环境感到灰心？", core: "沮丧", subs: ["单纯的气恼 ➔ 气恼", "后悔没做好 ➔ 懊恼"] },
                { text: "因为愤怒到了极点，反而不想说话，关闭了？", core: "冷漠", subs: ["向后退 ➔ 退缩", "没感觉了 ➔ 麻木"] },
                { text: "因为有火发不出，憋在心里？", core: "窝火", subs: ["不相信对方 ➔ 怀疑", "看不起对方 ➔ 轻蔑"] }
            ]},
            'B': { name: 'B组：恐惧 😨', color: '#8e44ad', questions: [
                { text: "是当下的、立刻发生的危险？", core: "惊恐", subs: ["完全没法动 ➔ 无助", "单纯的怕 ➔ 害怕"] },
                { text: "是对未来不确定性的预想？", core: "焦虑", subs: ["脑子里一直想 ➔ 担忧", "心慌意乱 ➔ 恐慌"] },
                { text: "是觉得自不如人？", core: "自卑", subs: ["觉得做起来好难 ➔ 吃力", "看不起自己 ➔ 自轻自贱"] },
                { text: "是觉得力量对比悬殊，自己太小？", core: "弱小", subs: ["像蚂蚁一样 ➔ 渺小", "觉得自己没用 ➔ 无价值"] },
                { text: "是觉得社交上被排斥？", core: "被嫌弃", subs: ["大家不带我玩 ➔ 被排挤", "大家针对我 ➔ 受迫害"] },
                { text: "是觉得外部环境有具体的威胁？", core: "受威胁", subs: ["心里不踏实 ➔ 不安", "吓得发抖 ➔ 心惊胆战"] }
            ]},
            'C': { name: 'C组：悲伤 😢', color: '#3498db', questions: [
                { text: "重心在“担心未来”？", core: "忧心", subs: ["神经紧绷 ➔ 敏感", "心凉了 ➔ 心寒"] },
                { text: "重心在“胸口堵着慌”？", core: "郁闷", subs: ["心里没东西 ➔ 空虚", "觉得自己差 ➔ 差劲"] },
                { text: "重心在“都是我的错”？", core: "内疚", subs: ["没脸见人 ➔ 羞耻", "后悔不已 ➔ 懊悔"] },
                { text: "重心在“彻底没希望”？", core: "绝望", subs: ["痛彻心扉 ➔ 哀痛", "手足无措 ➔ 无能为力"] },
                { text: "重心在“我很脆弱”？", core: "易受伤", subs: ["一碰就碎 ➔ 脆弱", "觉得总有人害我 ➔ 感到被迫害"] },
                { text: "重心在“只有我一个人”？", core: "孤独", subs: ["物理上的隔绝 ➔ 孤立", "情感上的丢弃 ➔ 被抛弃"] }
            ]},
            'D': { name: 'D组：惊讶 😮', color: '#f39c12', questions: [
                { text: "偏向积极/期待？", core: "兴奋", subs: ["热切", "积极向上"] },
                { text: "中性/纯粹的好奇？", core: "惊奇", subs: ["惊叹", "愕然"] },
                { text: "偏向消极/不懂？", core: "困惑", subs: ["不知所措", "幻灭"] },
                { text: "偏向消极/吓到？", core: "吃惊", subs: ["震惊", "惊慌"] }
            ]},
            'E': { name: 'E组：糟糕 😓', color: '#95a5a6', questions: [
                { text: "体现在身体机能上？", core: "疲惫", subs: ["想睡觉 ➔ 昏昏欲睡", "无法集中 ➔ 分心"] },
                { text: "体现在精神重压上？", core: "压抑", subs: ["控制不住了 ➔ 失控", "背不动了 ➔ 不堪重负"] },
                { text: "体现在节奏太快上？", core: "忙乱", subs: ["紧迫感 ➔ 压力", "慌里慌张 ➔ 仓促"] },
                { text: "体现在对世界没兴趣上？", core: "无聊", subs: ["冷冰冰 ➔ 冷淡", "事不关己 ➔ 漠不关心"] }
            ]},
            'F': { name: 'F组：厌恶 🤢', color: '#27ae60', questions: [
                { text: "理智上的不赞同？", core: "反对", subs: ["对他要求高 ➔ 苛刻", "处境难堪 ➔ 尴尬"] },
                { text: "预期落空的感觉？", core: "失望", subs: ["吓到了 ➔ 惊骇", "单纯讨厌 ➔ 反感"] },
                { text: "极度的生理性反胃？", core: "恶劣", subs: ["恨+厌 ➔ 憎恶", "想吐 ➔ 恶心"] },
                { text: "想要推开的动作？", core: "排斥", subs: ["不想向前 ➔ 犹豫", "发抖的怕 ➔ 震悚"] }
            ]},
            'G': { name: 'G组：开心 😄', color: '#2ecc71', questions: [
                { text: "源于对未来的看法？", core: "乐观", subs: ["富有灵感", "有望"] },
                { text: "源于人际关系？", core: "信任/被接纳", subs: ["信任 (亲密)", "被接纳 (受尊重)"] },
                { text: "源于内心的状态？", core: "平静/满足", subs: ["平静 (感恩)", "满足 (自在)"] },
                { text: "源于自身的能力/评价？", core: "有力量/自豪", subs: ["有力量 (勇敢)", "自豪 (有成就感)"] },
                { text: "源于外部事物/活动？", core: "感兴趣/快活", subs: ["感兴趣 (好奇)", "快活 (激昂)"] }
            ]}
        },
        content: {
            'A': `
                <p><strong>😠 核心机制：战斗 (Fight)</strong>。当边界被侵犯或感到不公时，愤怒是保护性能量。</p>
                <table><thead><tr><th>次级情绪</th><th>具体感受</th><th>机制与原理</th><th>解药 (Action)</th></tr></thead><tbody>
                <tr data-key="被辜负"><td>被辜负</td><td>背叛、愤恨</td><td><strong>信任崩塌</strong>。预期与现实严重不符。</td><td><strong>重建边界</strong>。降低预期，明确表达底线。</td></tr>
                <tr data-key="耻辱"><td>耻辱</td><td>委屈、羞恼</td><td><strong>防御受损</strong>。愤怒转向自我，觉得丢脸。</td><td><strong>自我慈悲</strong>。告诉自己“被伤害不是我的错”。</td></tr>
                <tr data-key="苦涩"><td>苦涩</td><td>愤恨、被侵犯</td><td><strong>反刍</strong>。压抑的愤怒变成了持久的怨气。</td><td><strong>宣泄与饶恕</strong>。写愤怒信(不寄出)，高强度运动。</td></tr>
                <tr data-key="发狂"><td>发狂</td><td>嫉妒、暴怒</td><td><strong>能量过载</strong>。理性暂时下线。</td><td><strong>物理降温</strong>。离开现场，冷水洗脸。</td></tr>
                <tr data-key="咄咄逼人"><td>咄咄逼人</td><td>被激怒、敌意</td><td><strong>防御性攻击</strong>。先发制人以避免受伤。</td><td><strong>探究脆弱</strong>。问自己“我在保护什么？”</td></tr>
                <tr data-key="沮丧"><td>沮丧</td><td>气恼、懊恼</td><td><strong>目标受阻</strong>。努力了但没结果的无力感。</td><td><strong>调整策略</strong>。接受现状，寻找微小的成功。</td></tr>
                <tr data-key="冷漠"><td>冷漠</td><td>退缩、麻木</td><td><strong>隔离(Dissociation)</strong>。愤怒太大，系统切断感受。</td><td><strong>重新连接</strong>。从小事开始表达真实观点。</td></tr>
                <tr data-key="窝火"><td>窝火</td><td>怀疑、轻蔑</td><td><strong>道德优越感</strong>。通过贬低对方来缓解愤怒。</td><td><strong>换位思考</strong>。用“描述事实”代替“评判人品”。</td></tr>
                </tbody></table>`,
            'B': `
                <p><strong>😨 核心机制：逃跑 (Flight)</strong>。皮质醇分泌，用于预警危险。</p>
                <table><thead><tr><th>次级情绪</th><th>具体感受</th><th>机制与原理</th><th>解药 (Action)</th></tr></thead><tbody>
                <tr data-key="惊恐"><td>惊恐</td><td>无助、害怕</td><td><strong>急性应激</strong>。感觉核心自我受到威胁。</td><td><strong>着陆技术</strong>。5-4-3-2-1法，回到当下。</td></tr>
                <tr data-key="焦虑"><td>焦虑</td><td>担忧、恐慌</td><td><strong>对未来的恐惧</strong>。大脑进行灾难化演练。</td><td><strong>区分现实</strong>。制定具体计划(Plan B)。</td></tr>
                <tr data-key="自卑"><td>自卑</td><td>吃力、自轻</td><td><strong>社会比较</strong>。害怕被群体排斥。</td><td><strong>成长型思维</strong>。关注自己的进步而非比较。</td></tr>
                <tr data-key="弱小"><td>弱小</td><td>渺小、无价值</td><td><strong>习得性无助</strong>。缺乏正反馈。</td><td><strong>微小胜利</strong>。完成极低门槛的任务。</td></tr>
                <tr data-key="被嫌弃"><td>被嫌弃</td><td>排挤、受迫害</td><td><strong>归属感缺失</strong>。社交疼痛与物理疼痛同源。</td><td><strong>建立连接</strong>。主动做利他的小事，重建价值。</td></tr>
                <tr data-key="受威胁"><td>受威胁</td><td>不安、心惊胆战</td><td><strong>持续警觉</strong>。环境缺乏安全感。</td><td><strong>构建安全岛</strong>。寻找或想象绝对安全空间。</td></tr>
                </tbody></table>`,
            'C': `
                <p><strong>😢 核心机制：求救与修复</strong>。能量回收，处理丧失。</p>
                <table><thead><tr><th>次级情绪</th><th>具体感受</th><th>机制与原理</th><th>解药 (Action)</th></tr></thead><tbody>
                <tr data-key="忧心"><td>忧心</td><td>空虚、差劲</td><td><strong>多巴胺低迷</strong>。失去动力，感觉到缺失。</td><td><strong>行为激活</strong>。强迫自己动起来(如整理)。</td></tr>
                <tr data-key="内疚"><td>内疚</td><td>羞耻、懊悔</td><td><strong>超我惩罚</strong>。认为自己破坏了标准。</td><td><strong>弥补与翻篇</strong>。道歉，或原谅当时的自己。</td></tr>
                <tr data-key="绝望"><td>绝望</td><td>哀痛、无力</td><td><strong>放弃反应</strong>。认为痛苦是永久的。</td><td><strong>接纳与求助</strong>。允许自己暂停，寻求帮助。</td></tr>
                <tr data-key="易受伤"><td>易受伤</td><td>脆弱</td><td><strong>防御失效</strong>。心理皮肤变薄，极度敏感。</td><td><strong>自我安抚</strong>。像照顾孩子一样照顾自己。</td></tr>
                <tr data-key="孤独"><td>孤独</td><td>孤立、被抛弃</td><td><strong>依恋缺失</strong>。渴望连接的信号。</td><td><strong>深度交流</strong>。哪怕只和一个理解你的人聊天。</td></tr>
                </tbody></table>`,
            'E': `
                <p><strong>😓 核心机制：系统过载 (Burnout)</strong>。</p>
                <table><thead><tr><th>次级情绪</th><th>具体感受</th><th>机制与原理</th><th>解药 (Action)</th></tr></thead><tbody>
                <tr data-key="疲惫"><td>疲惫</td><td>昏睡、分心</td><td><strong>能量耗尽</strong>。身体强制要求关机修复。</td><td><strong>深度休息</strong>。睡眠、冥想，而非刷手机。</td></tr>
                <tr data-key="压抑"><td>压抑</td><td>失控、重负</td><td><strong>调节崩溃</strong>。输入压力 > 处理能力。</td><td><strong>做减法</strong>。只做最重要的那一件事。</td></tr>
                <tr data-key="忙乱"><td>忙乱</td><td>压力、仓促</td><td><strong>交感神经兴奋</strong>。一直处于“赶时间”模式。</td><td><strong>慢下来</strong>。单任务处理，一次做一件事。</td></tr>
                <tr data-key="无聊"><td>无聊</td><td>冷淡、漠视</td><td><strong>低唤起</strong>。缺乏刺激或意义感。</td><td><strong>寻找心流</strong>。找一件有挑战性的小事做。</td></tr>
                </tbody></table>`,
            'F': `
                <p><strong>🤢 核心机制：拒绝与排斥</strong>。保护自己免受“有毒”事物的侵害。</p>
                <table><thead><tr><th>次级情绪</th><th>具体感受</th><th>机制与原理</th><th>解药 (Action)</th></tr></thead><tbody>
                <tr data-key="反对"><td>反对</td><td>苛刻、犹豫</td><td><strong>心理边界</strong>。价值观不符。</td><td><strong>尊重差异</strong>。意识到不同不等于有毒。</td></tr>
                <tr data-key="失望"><td>失望</td><td>惊骇、反感</td><td><strong>形象破灭</strong>。现实不符合预期。</td><td><strong>接受现实</strong>。承认这才是真实的样子。</td></tr>
                <tr data-key="恶劣"><td>恶劣</td><td>憎恶、恶心</td><td><strong>防御性排斥</strong>。触发了深层厌恶。</td><td><strong>物理隔离</strong>。离开这个环境或人。</td></tr>
                </tbody></table>`,
            'G': `
                <p><strong>😄 核心机制：奖赏回路</strong>。多巴胺、血清素、催产素的协奏曲。</p>
                <p>保持这种状态的关键是：<strong>觉察并分享</strong>。当你能命名这种快乐，并将其转化为行动或分享给他人时，快乐会倍增。</p>
                <p>建议：<strong>记录下来</strong>。这是你的心理能量储备。</p>`,
            'D': `
                <p><strong>😮 核心机制：定向反射</strong>。预期与现实不符。</p>
                <p>惊讶是中性的连接桥梁。解药是<strong>“保持好奇”</strong>：</p>
                <ul>
                    <li>如果是惊喜 -> 转化为 <strong>创造力</strong>。</li>
                    <li>如果是困惑 -> 转化为 <strong>探索欲</strong> (搜集信息)。</li>
                    <li>如果是惊吓 -> 进行 <strong>着陆练习</strong> (确认安全)。</li>
                </ul>`
        }
    },

    // --- English Data ---
    en: {
        ui: {
            btn_back: "⬅ Back",
            btn_back_prev: "⬅ Back to previous",
            btn_restart: "🔄 Start Over",
            btn_image: "🔍 View Full Emotion Wheel",
            btn_image_compare: "🔍 Compare with Emotion Wheel",
            
            step1_title: "Step 1: General Direction",
            q1_text: "Q1: How do you feel generally?",
            q1_opt1: "🟢 Comfortable / Positive",
            q1_opt2: "🔴 Uncomfortable / Negative",
            q1_opt3: "⚪ Surprised / Unexpected",

            q2_text: "Q2: How is your body energy?",
            q2_opt1: "🔥 High Energy (Fast heart, tense muscles)",
            q2_opt2: "💧 Low Energy (Heavy, lethargic)",
            q2_opt3: "🤢 Repulsion (Nausea, frowning)",

            q3_text: "Q3: What is the direction of this high energy?",
            q3_opt1: "⚔️ Outward / Attack (Want to fight back)",
            q3_opt2: "🛡️ Inward / Avoid (Want to flee/hide)",

            q4_text: "Q4: What is the source of this low energy?",
            q4_opt1: "💔 Emotional Pain (Loss, want to cry)",
            q4_opt2: "🔋 Physiological/Mental Exhaustion (Overload)",

            step2_title: "Step 2: Precise Positioning",
            step2_subtitle: "Choose the description that fits best:",
            
            step3_title: "Step 3: Nuance Confirmation",
            step3_text_prefix: "Core feeling is",
            step3_text_suffix: ", specifically?",

            result_intro: "Your current emotion is:",
            result_group_prefix: "", // 英文里不需要"Group Group"重复，留空即可
            result_group_suffix: "", // 英文里不需要"Group"后缀
            result_analysis_title: "📖 Analysis & Antidote",
            result_analysis_intro: "Here is the mechanism of your emotion. _Highlighted_ row is your state.",
            
            img_title: "Emotion Wheel",
            img_hint: "Tip: Click image to zoom in.",
            zoom_hint: "Click anywhere to close"
        },
        groups: {
            'A': { name: 'Group A: Anger 😠', color: '#e74c3c', questions: [
                { text: "Betrayed or let down by someone?", core: "Betrayed", subs: ["Complete betrayal ➔ Betrayal", "Long-term resentment ➔ Resentment"] },
                { text: "Self-esteem damaged, loss of face?", core: "Humiliated", subs: ["Wronged & want to cry ➔ Wronged", "Ashamed & annoyed ➔ Ashamed"] },
                { text: "Anger mixed with bitterness/offense?", core: "Bitter", subs: ["Deep hatred ➔ Hatred", "Boundaries crossed ➔ Violated"] },
                { text: "Out of control, want to destroy?", core: "Mad", subs: ["Envy others ➔ Jealous", "Pure rage ➔ Furious"] },
                { text: "Posturing to attack others?", core: "Aggressive", subs: ["Provoked ➔ Provoked", "Naturally hostile ➔ Hostile"] },
                { text: "Failed at something, discouraged?", core: "Frustrated", subs: ["Simple annoyance ➔ Annoyed", "Regret not doing well ➔ Remorseful"] },
                { text: "Anger peaked, shut down?", core: "Distant", subs: ["Backing off ➔ Withdrawn", "No feeling ➔ Numb"] },
                { text: "Anger stuck inside?", core: "Critical", subs: ["Distrust ➔ Skeptical", "Look down on ➔ Dismissive"] }
            ]},
            'B': { name: 'Group B: Fear 😨', color: '#8e44ad', questions: [
                { text: "Immediate danger?", core: "Scared", subs: ["Frozen ➔ Helpless", "Simple fear ➔ Frightened"] },
                { text: "Uncertainty about the future?", core: "Anxious", subs: ["Overthinking ➔ Worried", "Panic attack ➔ Panicked"] },
                { text: "Feeling inferior to others?", core: "Insecure", subs: ["Hard to do ➔ Struggling", "Self-loathing ➔ Inferior"] },
                { text: "Feeling small vs big power?", core: "Weak", subs: ["Like an ant ➔ Insignificant", "Useless ➔ Worthless"] },
                { text: "Socially rejected?", core: "Rejected", subs: ["Left out ➔ Excluded", "Targeted ➔ Persecuted"] },
                { text: "Environmental threat?", core: "Threatened", subs: ["Uneasy ➔ Nervous", "Terrified ➔ Terrified"] }
            ]},
            'C': { name: 'Group C: Sadness 😢', color: '#3498db', questions: [
                { text: "Worrying about future?", core: "Apprehensive", subs: ["Tense ➔ Sensitive", "Cold heart ➔ Disheartened"] },
                { text: "Chest feels blocked?", core: "Depressed", subs: ["Empty inside ➔ Empty", "I am bad ➔ Lacking"] },
                { text: "It's all my fault?", core: "Guilty", subs: ["Can't face others ➔ Ashamed", "Regret ➔ Remorseful"] },
                { text: "No hope left?", core: "Despair", subs: ["Deep pain ➔ Grieving", "Can't do anything ➔ Powerless"] },
                { text: "Feeling fragile?", core: "Vulnerable", subs: ["Break easily ➔ Fragile", "Victimized ➔ Victimized"] },
                { text: "I am all alone?", core: "Lonely", subs: ["Physically alone ➔ Isolated", "Emotionally dropped ➔ Abandoned"] }
            ]},
            'D': { name: 'Group D: Surprise 😮', color: '#f39c12', questions: [
                { text: "Positive / Expecting?", core: "Excited", subs: ["Eager", "Energetic"] },
                { text: "Neutral / Curiosity?", core: "Amazed", subs: ["Awed", "Astonished"] },
                { text: "Negative / Don't understand?", core: "Confused", subs: ["Lost", "Disillusioned"] },
                { text: "Negative / Scared?", core: "Startled", subs: ["Shocked", "Dismayed"] }
            ]},
            'E': { name: 'Group E: Bad/Stressed 😓', color: '#95a5a6', questions: [
                { text: "Physical exhaustion?", core: "Tired", subs: ["Sleepy ➔ Sleepy", "Can't focus ➔ Distracted"] },
                { text: "Mental pressure?", core: "Stressed", subs: ["Losing control ➔ Out of control", "Too heavy ➔ Overwhelmed"] },
                { text: "Pace is too fast?", core: "Busy", subs: ["Urgency ➔ Pressured", "Rushing ➔ Rushed"] },
                { text: "No interest in the world?", core: "Bored", subs: ["Cold ➔ Indifferent", "Don't care ➔ Apathetic"] }
            ]},
            'F': { name: 'Group F: Disgust 🤢', color: '#27ae60', questions: [
                { text: "Intellectual disagreement?", core: "Disapproval", subs: ["High standards ➔ Judgmental", "Awkward situation ➔ Embarrassed"] },
                { text: "Expectation failed?", core: "Disappointed", subs: ["Shocked ➔ Appalled", "Simple dislike ➔ Revolted"] },
                { text: "Physical revulsion?", core: "Awful", subs: ["Hate+Disgust ➔ Loathing", "Vomit ➔ Nauseated"] },
                { text: "Want to push away?", core: "Avoidance", subs: ["Hesitant ➔ Hesitant", "Trembling ➔ Horrified"] }
            ]},
            'G': { name: 'Group G: Happy 😄', color: '#2ecc71', questions: [
                { text: "About the future?", core: "Optimistic", subs: ["Inspired", "Hopeful"] },
                { text: "Relationship based?", core: "Trusting", subs: ["Intimate", "Sentimental"] },
                { text: "Inner state?", core: "Peaceful", subs: ["Thankful", "Satisfied"] },
                { text: "Self ability/eval?", core: "Powerful", subs: ["Creative", "Proud"] },
                { text: "External activity?", core: "Playful", subs: ["Curious", "Alive"] }
            ]}
        },
        content: {
            'A': `
                <p><strong>😠 Core: Fight</strong>. Anger is protective energy.</p>
                <table><thead><tr><th>Emotion</th><th>Mechanism</th><th>Antidote</th></tr></thead><tbody>
                <tr data-key="Betrayed"><td>Betrayed</td><td>Broken trust.</td><td><strong>Rebuild boundaries.</strong> Lower expectations.</td></tr>
                <tr data-key="Humiliated"><td>Humiliated</td><td>Defending damaged ego.</td><td><strong>Self-compassion.</strong> "It's not my fault."</td></tr>
                <tr data-key="Bitter"><td>Bitter</td><td>Anger ruminating.</td><td><strong>Express & Forgive.</strong> Write it out, exercise.</td></tr>
                <tr data-key="Mad"><td>Mad</td><td>Energy overload.</td><td><strong>Cool down.</strong> Leave the scene, deep breaths.</td></tr>
                <tr data-key="Aggressive"><td>Aggressive</td><td>Pre-emptive strike.</td><td><strong>Explore vulnerability.</strong> What are you protecting?</td></tr>
                <tr data-key="Frustrated"><td>Frustrated</td><td>Blocked goals.</td><td><strong>Adjust strategy.</strong> Find small wins.</td></tr>
                <tr data-key="Distant"><td>Distant</td><td>Dissociation.</td><td><strong>Reconnect.</strong> Express real views.</td></tr>
                <tr data-key="Critical"><td>Critical</td><td>Moral superiority.</td><td><strong>Empathy.</strong> Describe facts, don't judge.</td></tr>
                </tbody></table>`,
            'B': `
                <p><strong>😨 Core: Flight</strong>. Cortisol warns of danger.</p>
                <table><thead><tr><th>Emotion</th><th>Mechanism</th><th>Antidote</th></tr></thead><tbody>
                <tr data-key="Scared"><td>Scared</td><td>Acute stress.</td><td><strong>Grounding.</strong> 5-4-3-2-1 technique.</td></tr>
                <tr data-key="Anxious"><td>Anxious</td><td>Fear of future.</td><td><strong>Plan B.</strong> Distinguish fact from imagination.</td></tr>
                <tr data-key="Insecure"><td>Insecure</td><td>Social comparison.</td><td><strong>Growth mindset.</strong> Focus on your own progress.</td></tr>
                <tr data-key="Weak"><td>Weak</td><td>Learned helplessness.</td><td><strong>Small wins.</strong> Do something very easy.</td></tr>
                <tr data-key="Rejected"><td>Rejected</td><td>Lack of belonging.</td><td><strong>Connect.</strong> Find your tribe.</td></tr>
                <tr data-key="Threatened"><td>Threatened</td><td>Hyper-vigilance.</td><td><strong>Safe space.</strong> Find a physical safe zone.</td></tr>
                </tbody></table>`,
            'C': `
                <p><strong>😢 Core: Recovery</strong>. Processing loss.</p>
                <table><thead><tr><th>Emotion</th><th>Mechanism</th><th>Antidote</th></tr></thead><tbody>
                <tr data-key="Apprehensive"><td>Apprehensive</td><td>Low dopamine.</td><td><strong>Action.</strong> Move your body.</td></tr>
                <tr data-key="Guilty"><td>Guilty</td><td>Self-punishment.</td><td><strong>Make amends.</strong> Apologize or forgive self.</td></tr>
                <tr data-key="Despair"><td>Despair</td><td>Giving up.</td><td><strong>Acceptance.</strong> Seek help.</td></tr>
                <tr data-key="Vulnerable"><td>Vulnerable</td><td>Defense down.</td><td><strong>Self-soothe.</strong> Hug yourself.</td></tr>
                <tr data-key="Lonely"><td>Lonely</td><td>Need connection.</td><td><strong>Deep talk.</strong> Talk to one person.</td></tr>
                </tbody></table>`,
            'D': `
                <p><strong>😮 Core: Surprise</strong>. Unexpected reality.</p>
                <p>Antidote: <strong>Curiosity</strong>.</p>
                <ul><li>Positive -> Creativity</li><li>Negative -> Information Seeking</li></ul>`,
            'E': `
                <p><strong>😓 Core: Burnout</strong>. System overload.</p>
                <table><thead><tr><th>Emotion</th><th>Antidote</th></tr></thead><tbody>
                <tr data-key="Tired"><td>Tired</td><td><strong>Deep Rest.</strong> Sleep, not scrolling.</td></tr>
                <tr data-key="Stressed"><td>Stressed</td><td><strong>Subtract.</strong> Do less.</td></tr>
                <tr data-key="Busy"><td>Busy</td><td><strong>Slow down.</strong> Single-tasking.</td></tr>
                <tr data-key="Bored"><td>Bored</td><td><strong>Find Flow.</strong> Find a challenge.</td></tr>
                </tbody></table>`,
            'F': `
                <p><strong>🤢 Core: Rejection</strong>. Protecting from toxicity.</p>
                <table><thead><tr><th>Emotion</th><th>Mechanism</th><th>Antidote</th></tr></thead><tbody>
                <tr data-key="Disapproval"><td>Disapproval</td><td>Value conflict.</td><td><strong>Respect.</strong> Different is not toxic.</td></tr>
                <tr data-key="Disappointed"><td>Disappointed</td><td>Expectation failed.</td><td><strong>Acceptance.</strong> See reality as it is.</td></tr>
                <tr data-key="Awful"><td>Awful</td><td>Physical revulsion.</td><td><strong>Distance.</strong> Physical/Mental separation.</td></tr>
                <tr data-key="Avoidance"><td>Avoidance</td><td>Defensive pushing.</td><td><strong>Boundaries.</strong> Say no firmly.</td></tr>
                </tbody></table>`,
            'G': `
                <p><strong>😄 Core: Reward</strong>.</p>
                <p>Action: <strong>Share and Record it</strong>.</p>`
        }
    }
};