# FATUM — Product Requirements Document
**AI-Powered Numerology App · MVP v1.0**
**Version 1.0 · April 2026**

---

## 1. Product Overview

Fatum 是面向英语市场的 AI 驱动数字命理 App。它将古老的数字命理算法与 Claude AI 结合，在高级深色主题体验中提供个性化神秘洞察。MVP 聚焦于 Personal Year Number 解读，辅以每日 AI Oracle 聊天。

**使命：** Make numerology personal, conversational, and unmissable — every day.

---

## 2. Target Users

### Primary Persona

英语国家灵性好奇成年用户（22–45 岁），关注占星、自我成长、正念内容，习惯为高级健康与洞察类 App 付费（Calm、Co–Star、The Pattern）。

### User Needs

- 无需深厚数字命理知识，即可获得即时个性化洞察
- 美观沉浸的体验，感觉高端且神秘
- 可对话的 AI，能回答追问
- 每日仪式感 — 每天早晨都想打开

---

## 3. User Journey & Screen Flow

| Step | Screen | Description |
|------|--------|-------------|
| 1 | Splash / Intro | 星空动画 + Fatum logo。两个 CTA：「Explore Free」和「Sign In」。无注册门槛。 |
| 2 | Intro Carousel | 3 张价值主张幻灯片：(1) 你的数字藏着答案，(2) AI 解读你的道路，(3) 每日宇宙指引。可跳过。 |
| 3 | Registration | 邮箱+密码 或 Sign in with Apple。最小摩擦 — 此时无付费墙。 |
| 4 | Profile Setup | 收集：全名、出生日期、出生城市。显示进度条。AI 计算时播放神秘加载动画。 |
| 5 | Paywall | 个人资料设置后显示。3 天免费试用 CTA 突出。月付（$6.99）和年付（$39.99 — "Best Value"）选项。允许关闭（进入免费层）。 |
| 6 | Home / Dashboard | 带 Personal Year Number 的个性化问候。今日主题卡。「Ask Fatum」聊天按钮。底部导航：Home / Report / Chat / Settings。 |
| 7 | Full Report | AI 生成的 Personal Year Number 报告。章节：今年意味着什么、爱情、事业、挑战、月度分解。订阅用户可见锁定章节预告。 |
| 8 | AI Chat | AI Oracle 人格聊天界面。免费：1 问/天。订阅：无限。为免费用户显示消息计数器。 |

---

## 4. Core Features — MVP v1.0

### 4.1 Personal Year Number Engine

计算使用：全名（转换为 Pythagorean 数值）、出生日期、出生城市（增加象征意义，展示在报告叙述中）。

**公式：**
```
(Birth Month + Birth Day + Current Year) → 缩减为单位数（或主数字 11、22）
```

**输出包含：**
- 核心数字（1–9, 11, 22）
- 年份主题标题
- AI 撰写完整报告（约 600 字）
- 月度指引预览

### 4.2 AI Report Generation

- **模型：** Claude claude-sonnet-4-6（Anthropic API）
- **人格：** "Fatum" — 睿智、温暖、神秘的 Oracle。绝不机械。
- 个人资料创建时生成一次，缓存于 Supabase
- **语言：** 仅英语（v1）
- **语气：** 第二人称、肯定性，具体至用户姓名与城市

### 4.3 Daily AI Chat

- 免费层：每天 1 条消息（UTC 0 点重置）
- 付费层：无限消息
- 上下文：AI 始终知晓用户姓名、出生数据、Personal Year Number
- 对话历史按用户存储于 Supabase（最后 20 条作为上下文发送）
- 空状态显示建议开场问题

### 4.4 Daily Home Card

- 每日由 AI 生成新消息，主题契合用户 Personal Year
- 显示在仪表盘，作为用户每天看到的第一件事
- 本地时间 8am 推送通知："Your cosmic guidance for today is ready"

---

## 5. Free vs. Paid Tiers

| Feature | Free | Subscribed |
|---------|------|-----------|
| Personal Year Number | ✓ 完整 | ✓ 完整 |
| AI Report（核心章节） | ✓ 3 个章节 | ✓ 所有章节 |
| AI Chat | 1 条/天 | 无限 |
| 月度分解 | ✗ 锁定 | ✓ 解锁 |
| 每日首页卡片 | ✓ | ✓ |
| 推送通知 | ✓ | ✓ |
| 保存/导出报告 | ✗ | ✓ |

---

## 6. Monetization

### 定价

- **月付：** $6.99/月
- **年付：** $39.99/年（约 $3.33/月 — "Best Value" 标签）
- 两个方案均提供 3 天免费试用

### 转化策略

- 个人资料设置完成后立即展示付费墙 — 用户参与度最高时最大化钩子
- 报告中的锁定章节制造明显 FOMO
- 聊天消息计数器（"今天 1 条免费消息已用 0 条"）促进升级
- 软付费墙：用户可关闭进入免费层，3 天后重新展示付费墙

---

## 7. Out of Scope — v1

- 塔罗、占星、掌纹（未来版本）
- 社交功能 / 分享
- 非英语语言
- iOS / Android App（v2，Web 验证后迭代）

---

## 8. Success Metrics

| Metric | Target（上线 30 天） |
|--------|---------------------|
| Downloads | 500+ |
| Day 7 Retention | > 30% |
| Trial → Paid Conversion | > 15% |
| Daily Active Users (DAU) | > 40% of registered users |
| App Store Rating | > 4.3 stars |
