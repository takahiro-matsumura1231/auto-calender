# 🗕 Auto-Calendar - メール文本から予定を自動登録！

**Auto-Calendar** は、メール文本を貼り付けるだけで、Google カレンダーに予定を自動登録できるアプリケーションです。  
自然な日本語の文章から「件名」「日時」「場所」を自動で抽出し、予定をカレンダーに登録します。

---

## 📚 目次

- [🚀 特長](#-特長)
- [🧩 システム構成図](#-システム構成図)
- [🖥 フロントエンド：PCアプリ](#-フロントエンドpcアプリ)
- [☁️ バックエンド：Google Apps Script（GAS）](#-バックエンドgoogle-apps-scriptgas)
- [🧠 Google AI：自然言語処理の専門家](#-google-ai自然言語処理の専門家)
- [📆 Google Calendar API：実務担当](#-google-calendar-api実務担当)
- [🔁 全体の流れまとめ](#-全体の流れまとめ)
- [📝 入力例](#-入力例)
- [⚙️ 技術構成](#-技術構成)
- [📌 今後の展望（Ideas）](#-今後の展望ideas)
- [📄 ライセンス](#-ライセンス)


## 🚀 特長

- ✨ メールの文章を貼り付けるだけ
- 🤖 Google AIで文章を自動解析
- 📆 Google カレンダーに自動で予定を登録
- 💻 PCアプリ＋☁️ Google Apps Script（GAS）の連携

---
🗂 システム構成図
![Mermaid Chart - Create complex, visual diagrams with text  A smarter way of creating diagrams -2025-07-19-183957](https://github.com/user-attachments/assets/c117228f-ae82-4071-8d22-b007cbc70732)# auto-calender
creating automaticaly event on my calender by scanning email text with LLM


---

## 🖥 フロントエンド：PCアプリ

- ユーザーがメール文本を入力し、「送信」ボタンをクリック
- バックエンド（GAS）へ文本を送信
- 処理結果（成功／失敗）を画面に表示

---

## ☁️ バックエンド：Google Apps Script（GAS）

- PCアプリから文本を受信
- Google AI に自然言語処理を依頼
- 抽出した「件名・日時・場所」で予定を生成
- Google Calendar API を通じてカレンダーに登録
- 結果をフロントエンドに返却

---

## 🤖 Google AI：自然言語処理の専門家

- GASから依頼されたメール文本を解析
- 件名、日時、場所などの必要情報を抽出

---

## 📆 Google Calendar API：実務担当

- 抽出された情報をもとに、Googleカレンダーに新規予定を作成

---

## 🔁 全体の流れまとめ

1. ユーザーがPCアプリでメール文本を入力
2. GASがGoogle AIへ自然言語解析を依頼
3. 抽出情報をもとにGoogle Calendarへ予定登録
4. 処理結果をPCアプリへ返却

---

## 📝 入力例

```text
件名：定例ミーティング  
日時：2025年7月25日（金） 14:00〜15:00  
場所：東京本社3階 会議室B
```

→ この内容が自動的にGoogleカレンダーへ登録されます ✅

---

## ⚙️ 技術構成

| 機能 | 使用技術 |
|------|-----------|
| フロントエンド | Python / Electron 
| バックエンド | Google Apps Script (GAS) |
| AI解析 | Google AI Gemini 2.5Pro
| カレンダー操作 | Google Calendar API |

---

## 📌 今後の展望（Ideas）

- Gmailと自動連携し、受信メールから自動抽出
- スマートフォンアプリ版の開発

---

## 📄 ライセンス

MIT License

---
