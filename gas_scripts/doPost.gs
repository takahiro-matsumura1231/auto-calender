/**
 * 外部からのPOSTリクエストを受け取るための特別な関数
 * @param {Object} e - リクエストに関する情報を含むイベントオブジェクト
 */
function doPost(e) {
  try {
    // 1. 送信されてきたデータ（メール本文）を取得する
    const emailBody = e.postData.contents;
    
    if (!emailBody) {
      throw new Error("メール本文が空です。");
    }
    
    console.log("外部リクエストからメール本文を受信しました。");

    // 2. LLMを使って情報を抽出する（既存の関数を呼び出す）
    const eventData = extractEventInfoWithLLM(emailBody);

    // 3. カレンダーに登録する（既存の関数を呼び出す）
    if (eventData && eventData.title) {
      createCalendarEvent(eventData);
      // 成功したことを示すJSONを返す
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success', message: `予定「${eventData.title}」を登録しました。` }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error("予定情報の抽出に失敗しました。");
    }

  } catch (error) {
    console.error("エラーが発生しました:", error.message);
    // 失敗したことを示すJSONを返す
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}