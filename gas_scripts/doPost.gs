/**
 * 外部サービスからの POST を受け取り、
 * メール本文を解析して Google カレンダーに予定を登録する。
 *
 * @param {GoogleAppsScript.Events.DoPost} e
 * @return {GoogleAppsScript.Content.TextOutput}
 */
function doPost(e) {
  try {
    /* 1️⃣ リクエスト本文の取り出し */
    const contentType = e.postData.type;
    let emailBody = '';

    if (contentType === 'application/json') {
      const payload = JSON.parse(e.postData.contents || '{}');
      emailBody = payload.email_body || '';
    } else { // text/plain 等
      emailBody = e.postData.contents || '';
    }

    if (!emailBody) {
      return buildResponse(400, 'email_body が空です。');
    }

    /* 2️⃣ LLM でイベント情報抽出（既存関数） */
    const eventData = extractEventInfoWithLLM(emailBody);

    /* 3️⃣ カレンダー登録（既存関数） */
    if (eventData) {
      createCalendarEvents(eventData);
      return buildResponse(200, 'イベントを作成しました。');
    } else {
      return buildResponse(200, '登録対象のイベントが見つかりませんでした。');
    }
  } catch (err) {
    console.error(err);
    return buildResponse(500, `サーバエラー：${err.message}`);
  }
}

/**
 * JSON レスポンスを生成する簡易ヘルパ
 *
 * @param {number} statusCode
 * @param {string} message
 * @return {GoogleAppsScript.Content.TextOutput}
 */
function buildResponse(statusCode, message) {
  const output = ContentService.createTextOutput(
    JSON.stringify({ status: statusCode, message })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
