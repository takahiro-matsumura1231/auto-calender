function extractEventInfoWithLLM(emailText) {
  // 問題1: APIキーはプロパティサービスから安全に取得する
  const API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEYがスクリプトプロパティに設定されていません。");
  }

  // 修正後のコード (gemini-2.0-flash-liteを使用)
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${API_KEY}`;

  // 現在の日時をISO形式（YYYY-MM-DDTHH:MM:SS）で取得し、プロンプトに渡す
    const now = new Date();
    const currentDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const prompt = `
    # 命令
    あなたは、メールの文章から予定を抽出し、Googleカレンダーに登録するための情報を生成する優秀なアシスタントです。
    以下の「処理対象メール」の内容を解析し、「JSONスキーマ」に従って予定情報を抽出・整理してください。

    # 制約条件
    - **日付と時刻の正規化:** 「明日」「来週の火曜日」「午後3時」といった相対的な表現は、必ず「コンテキスト」の現在日時を基準に、絶対的な「YYYY-MM-DD」形式および「HH:MM」（24時間表記）形式に変換してください。
    - **JSON形式の厳守:** 出力は、解説や前置きを一切含まず、JSONオブジェクトのみを返却してください。
    - **情報が存在しない場合:** 該当する情報が見つからないキーの値は \`null\` としてください。
    - **予定が見つからない場合:** メールが予定に関する内容でない場合は、全てのキーの値を \`null\` としたJSONを返却してください。しかしユーザは予定を追加しようとして送信していることが殆どです。NULLを返すと動作が止まる恐れがあります。よほど、追加する内容がない限りNULLは使わないでください。

    # コンテキスト
    - 現在日時: ${currentDateTime}

    # JSONスキーマ
    {
      "title": "予定の件名 (string)",
      "date": "日付 (string, YYYY-MM-DD)",
      "startTime": "開始時刻 (string, HH:MM)",
      "endTime": "終了時刻 (string, HH:MM, 不明な場合は1時間後とする)",
      "location": "場所 (string, 不明な場合は自宅)",
      "description": "予定の詳細やメールの要約 ,(string)"
      "category": "予定のカテゴリ (string, '就活', '会議', 'プライベート'のいずれか)"
    }
    \`\`\`

  # 処理対象メール
  ${emailText}
  `;

  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    // レスポンスが安定しやすくなる設定を追加
    generationConfig: {
      "responseMimeType": "application/json",
    }
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  // 問題3: response変数をtryの外で宣言
  let response; 
  try {
    response = UrlFetchApp.fetch(API_URL, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();

    if (responseCode !== 200) {
      // APIからエラーが返ってきた場合
      throw new Error(`APIリクエスト失敗: ステータスコード ${responseCode}, レスポンス: ${responseText}`);
    }

        // 1. APIからの応答全体をまずJSONとして解釈する
    const apiResponseObject = JSON.parse(responseText);

    // 2. 応答オブジェクトの階層をたどって、AIが生成したテキスト部分を取り出す
    const generatedText = apiResponseObject.candidates[0].content.parts[0].text;
    
    // 3. 取り出したテキスト（これが私たちが欲しいJSON文字列）を再度JSONとして解釈する
    const eventData = JSON.parse(generatedText);

    console.log("✅ LLMによる抽出結果 (解析後):", eventData);
    return eventData;

  } catch (e) {
    console.error("LLM APIの呼び出しまたはJSONの解析に失敗しました。", e.message);
    // 失敗した場合、生レスポンスの内容を確認できるようにする
    if (response) {
      console.error("LLMからの生レスポンス:", response.getContentText());
    }
    return null;
  }
}