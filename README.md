![Mermaid Chart - Create complex, visual diagrams with text  A smarter way of creating diagrams -2025-07-19-183957](https://github.com/user-attachments/assets/c117228f-ae82-4071-8d22-b007cbc70732)# auto-calender
creating automaticaly event on my calender by scanning email text with LLM

このシステムは、あなたのPC上で操作する**「フロントエンド（PCアプリ）」と、Googleのサーバー上で自動処理を行う「バックエンド（GAS）」**の2つの部分が連携して動いています。

システム概要図
コード スニペット

図の解説
PCアプリ (フロントエンド)

あなたがメール本文を貼り付けて送信ボタンを押す「窓口」です。

処理が完了すると、GASから送られてきた結果（成功か失敗か）を画面に表示します。

GAS (バックエンド/司令塔)

PCアプリから送られてきたメール本文を受け取ります。

受け取った本文をGoogleのAIに渡し、「この中から『件名』『日時』『場所』などを抜き出して」と依頼します。

AIから受け取った情報を元に、Googleカレンダーに対して「この内容で新しい予定を登録して」と命令します。

Google AI (専門家)

GASから依頼された通り、日本語の文章を解析して、カレンダー登録に必要な情報だけを正確に抽出します。

Google Calendar API (実務担当)

GASからの命令通りに、あなたのカレンダーに新しい予定を書き込みます。

このように、それぞれの専門家が自分の役割をこなすことで、メールの本文を貼り付けるだけで自動的にカレンダーに予定が登録される、という便利な仕組みが実現されています。
