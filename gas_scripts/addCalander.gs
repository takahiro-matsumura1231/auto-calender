/**
 * 複数の予定データを受け取り、それぞれをGoogleカレンダーに登録する関数
 * @param {Array<Object>} eventsData - 登録したい予定情報の配列
 */
function createCalendarEvents(eventsData) {
  // 入力が配列でない場合はエラーを出力して終了
  if (!Array.isArray(eventsData)) {
    console.error("入力データが配列形式ではありません。処理を中断しました。");
    return;
  }

  const calendar = CalendarApp.getDefaultCalendar();

  // 配列内の各予定に対して処理を実行
  eventsData.forEach(eventData => {
    // 必須項目（件名, 日付, 開始時刻）のチェック
    if (!eventData.title || !eventData.date || !eventData.startTime) {
      console.log(`件名「${eventData.title || '(不明)'}」の予定は、情報（件名, 日付, 開始時刻）が不足しているためスキップしました。`);
      return; // forEach内で次のループに移る
    }

    // 日付と時刻を結合してDateオブジェクトを作成
    const startDateTime = new Date(`${eventData.date}T${eventData.startTime}`);
    
    // 終了時刻がない場合は、開始時刻の1時間後を仮設定
    const endDateTime = eventData.endTime 
      ? new Date(`${eventData.date}T${eventData.endTime}`)
      : new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1時間後

    const options = {
      description: eventData.description || '',
      location: eventData.location || ''
    };

    try {
      // 1. カレンダーにイベントを作成
      const event = calendar.createEvent(eventData.title, startDateTime, endDateTime, options);
      
      // 2. カテゴリに応じて色を設定
      switch (eventData.category) {
        case '就活':
          event.setColor(CalendarApp.EventColor.RED);
          break;
        case '会議':
          event.setColor(CalendarApp.EventColor.BLUE);
          break;
        case 'プライベート':
          event.setColor(CalendarApp.EventColor.GREEN);
          break;
        case 'その他':
          event.setColor(CalendarApp.EventColor.GRAY);
          break;
        default:
          // 特定のカテゴリに該当しない場合はデフォルトカラーのまま
          break;
      }
      console.log(`✅ 成功: 予定「${eventData.title}」をカレンダーに登録しました。`);

    } catch (e) {
      console.error(`❌ 失敗: 予定「${eventData.title}」の登録に失敗しました。エラー:`, e);
    }
  });
  
  console.log("すべての予定の処理が完了しました。");
}