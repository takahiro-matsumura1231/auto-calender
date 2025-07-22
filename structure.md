graph LR
    subgraph "💻 あなたのPC"
        direction LR
        User(👤 ユーザー) -- "メール本文を<br>コピー＆ペースト" --> App["🖥️<br><b>スマートカレンダー登録アプリ</b><br>(Electron / TypeScript)"]
    end

    subgraph "☁️ Google Cloud (自動処理)"
        direction TB
        GAS["<b>GAS ウェブアプリ</b><br>(Google Apps Script)<br><i>司令塔</i>"]
        
        subgraph " "
            direction LR
            Gemini["🧠<br><b>Google AI (Gemini)</b><br><i>文章解析</i>"]
            CalendarAPI["📅<br><b>Google Calendar API</b><br><i>カレンダー操作</i>"]
        end
    end

    subgraph " "
        direction LR
        FinalCalendar[("🗓️<br><b>Googleカレンダー</b>")]
    end

    App -- "1. 情報を送信 (POSTリクエスト)" --> GAS
    GAS -- "2. 文章の解析を依頼" --> Gemini
    Gemini -- "3. 予定情報を抽出 (JSON)" --> GAS
    GAS -- "4. 予定の登録を命令" --> CalendarAPI
    CalendarAPI -- "5. 予定を書き込む" --> FinalCalendar

    %% --- スタイル定義 ---
    style User fill:#e3f2fd,stroke:#333,stroke-width:2px
    style App fill:#bbdefb,stroke:#333,stroke-width:2px
    style GAS fill:#c8e6c9,stroke:#333,stroke-width:2px
    style Gemini fill:#fff9c4,stroke:#333,stroke-width:2px
    style CalendarAPI fill:#ffcdd2,stroke:#333,stroke-width:2px
    style FinalCalendar fill:#d1c4e9,stroke:#333,stroke-width:2px