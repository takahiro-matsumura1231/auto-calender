📅 Auto-Calendar: メール文から自動で予定登録
Auto-Calendar は、メール本文をもとに Google カレンダーに予定を自動登録するシステムです。

このシステムは、以下の2つのコンポーネントから構成されています：

💻 PCアプリ（フロントエンド）

☁️ GAS（Google Apps Script｜バックエンド）

🗂 システム構成図
![Mermaid Chart - Create complex, visual diagrams with text  A smarter way of creating diagrams -2025-07-19-183957](https://github.com/user-attachments/assets/c117228f-ae82-4071-8d22-b007cbc70732)# auto-calender
creating automaticaly event on my calender by scanning email text with LLM



🖥️ フロントエンド（PCアプリ）
ユーザーが メール本文 を入力

「送信」ボタンを押すとバックエンド（GAS）へ送信

結果（成功/失敗）を画面に表示

⚙️ バックエンド（GAS）
PCアプリから メール本文 を受信

受け取った本文を Google AI に渡し、

件名（タイトル）

日時

場所
を抽出するよう依頼

抽出結果をもとに Google Calendar API へ予定登録

結果（成功・失敗）をフロントエンドへ返却

🧠 Google AI（自然言語処理の専門家）
GASから渡されたメール本文を解析

カレンダー登録に必要な情報（件名・日時・場所など）を抽出

📆 Google Calendar API（実務担当）
GASの指示通りにカレンダーへ新規予定を登録

✅ 動作の流れまとめ
メール本文をPCアプリで入力・送信

GASがGoogle AIで内容解析

抽出された予定情報をGoogle Calendarに登録

登録結果をPCアプリへ通知

📝 使い方の例（今後追加予定）
PCアプリから次のようなメール本文を送信すると：

less
Copy
Edit
件名：定例ミーティング  
日時：2025年7月25日(金) 14:00〜15:00  
場所：東京本社 3F 会議室B
Googleカレンダーに自動で登録されます ✅


