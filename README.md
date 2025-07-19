# auto-calender
creating automaticaly event on my calender by scanning email text with LLM

このシステムは、あなたのPC上で操作する**「フロントエンド（PCアプリ）」と、Googleのサーバー上で自動処理を行う「バックエンド（GAS）」**の2つの部分が連携して動いています。

システム概要図
コード スニペット

graph TD
    subgraph "ユーザー操作 (あなたのPC)"
        A[<b>PCアプリ (Electron)</b><br><i>入力と表示の担当</i>]
        A -- 1. メール本文を送信 --> B
    end

    subgraph "自動処理 (Googleのサーバー)"
        B(<b>GAS ウェブアプリ</b><br><i>全体の司令塔</i>)
        B -- 2. 予定の情報を<br>抽出するように依頼 --> C{<b>Google AI (Gemini)</b><br><i>文章解析の専門家</i>}
        C -- 3. 抽出した予定データを<br>JSON形式で返す --> B
        B -- 4. 予定データを使って<br>カレンダーに登録を命令 --> D[<b>Google Calendar API</b><br><i>カレンダー操作の担当</i>]
    end

    subgraph "最終的な結果"
        D -- 5. 予定が追加される --> E[<b>あなたのGoogleカレンダー</b>]
    end

    style A fill:#cde4ff
    style B fill:#d5e8d4
    style C fill:#fff2cc
    style D fill:#f8cecc
    style E fill:#dae8fc
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
