# FATUM — Technical Specification
**Version 1.1 · April 2026 · Web MVP**

> 策略：Web 优先。后端（Supabase）架构设计时保留 iOS App 扩展口，未来 App 直接复用后端。

---

## 1. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| UI Framework | Next.js 15 (App Router) | Web 前端，SSR + 静态优化 |
| Styling | Tailwind CSS + shadcn/ui | 快速构建深色宇宙主题 UI |
| AI / LLM | Anthropic API (claude-sonnet-4-6) | 报告生成 + 聊天 Oracle |
| Auth + Database | Supabase | 用户档案、聊天记录、报告缓存 |
| Subscriptions | Stripe + Stripe Webhook | 订阅管理、试用期、付费墙 |
| Email | Resend | 每日洞察邮件（替代推送通知） |
| Hosting | Vercel | Next.js 最佳部署平台 |
| AI Coding Tool | Claude Code (CLI) | 主要开发工具 |
| Analytics | Vercel Analytics / PostHog | 页面访问 + 事件追踪 |

---

## 2. Supabase Database Schema

### `users` 表

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | Supabase auth user ID |
| full_name | text | 用户填写的全名 |
| date_of_birth | date | YYYY-MM-DD |
| birth_city | text | 用户填写的城市 |
| personal_year_number | int2 | 注册时计算（1–9, 11, 22） |
| report_text | text | 缓存的 AI 生成报告全文 |
| daily_messages_used | int2 | 每日 UTC 0 点重置 |
| last_message_date | date | 用于执行每日限制 |
| is_subscribed | bool | 由 Stripe Webhook 同步 |
| stripe_customer_id | text | Stripe Customer ID |
| created_at | timestamptz | 自动设置 |

### `chat_messages` 表

| Column | Type | Description |
|--------|------|-------------|
| id | uuid (PK) | 自动生成 |
| user_id | uuid (FK) | 引用 users.id |
| role | text | `'user'` 或 `'assistant'` |
| content | text | 消息文本 |
| created_at | timestamptz | 自动设置 |

---

## 3. Numerology Algorithm

### Personal Year Number 公式

```
Personal Year Number = reduce(Birth Month + Birth Day + Current Year)
```

**缩减规则：** 反复对各位数字求和，直至得到单位数。例外：11 或 22（主数字）时停止。

**示例：**
- 出生日：6 月 15 日 → Month=6, Day=1+5=6
- 当前年份：2026 → 2+0+2+6=10 → 1+0=1
- 求和：6+6+1=13 → 1+3=**4**
- Personal Year Number：**4**

### Name Numerology（Pythagorean）

每个字母映射到 1–9：A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=1...
用于丰富 AI 报告叙述，MVP 阶段不作为主要数字。

---

## 4. Claude API Integration

### 报告生成 Prompt

- System prompt 定义 Fatum 人格（详见 `fatum_prompts.md`）
- User message 提供：姓名、出生日期、出生城市、Personal Year Number、当前年份
- 每个用户生成一次，结果缓存至 Supabase `report_text` 字段

### Chat System Prompt（精简版）

```
You are Fatum, a wise and mystical oracle specializing in numerology.
The user's name is {name}, born on {dob} in {city}.
Their Personal Year Number for {year} is {number}.
Respond in a warm, mystical, second-person tone.
Keep answers concise (under 120 words). Never break character.
```

### 每日限制执行

- 客户端：页面加载时检查（比对 `last_message_date` 与今日）
- 服务端：Supabase RLS 策略在插入 `chat_messages` 前强制检查
- 已订阅用户（`is_subscribed=true`）跳过限制检查

---

## 5. Stripe Setup

- **Products：** `fatum_monthly`（$6.99/月）、`fatum_annual`（$39.99/年）
- **Trial：** Stripe 订阅 `trial_period_days: 3`
- **Webhook 事件处理：**
  - `customer.subscription.created` → 更新 `is_subscribed=true`
  - `customer.subscription.deleted` → 更新 `is_subscribed=false`
  - `invoice.payment_failed` → 发提醒邮件
- 每次页面加载时服务端验证订阅状态（via Stripe API 或 Supabase 缓存）

---

## 6. Project File Structure

```
fatum/
  app/
    (auth)/           ← 登录 / 注册页
    (onboarding)/     ← Profile Setup 流程
    (app)/
      dashboard/      ← 首页 / 每日卡片
      report/         ← Personal Year 报告
      chat/           ← AI Oracle 聊天
      settings/       ← 账户、订阅管理
    api/
      report/         ← 生成报告（Claude API）
      chat/           ← 聊天（Claude API streaming）
      stripe/         ← Webhook 处理
  components/
    ui/               ← shadcn/ui 组件
    fatum/            ← 业务组件（ReportCard, ChatBubble 等）
  lib/
    supabase/         ← 客户端 & 服务端 client
    stripe/           ← Stripe 工具函数
    numerology/       ← 计算引擎（纯 TypeScript）
    claude/           ← Claude API 调用封装
  styles/             ← 全局样式、主题变量
```

---

## 7. 每日洞察邮件（替代推送通知）

- 工具：Resend（邮件发送）+ Vercel Cron Job
- 时机：每日 UTC 8:00 批量发送（用户本地时间近似处理）
- 内容：当日 AI 生成的个人年份洞察 + 「Open Fatum」按钮
- 用户可在 Settings 关闭邮件订阅

---

## 8. Development Workflow

1. `npx create-next-app@latest fatum` 初始化项目
2. 配置 Supabase、Stripe、Resend 环境变量
3. 所有功能开发使用 Claude Code（终端）
4. 本地用 `stripe listen --forward-to localhost:3000/api/stripe` 测试 Webhook
5. 推送至 GitHub → Vercel 自动部署预览分支
6. 生产发布：merge to `main` → Vercel 自动上线
