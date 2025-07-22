function createCalendarEvent(eventData) {
  if (!eventData.title || !eventData.date || !eventData.startTime) {
    console.log("予定の作成に必要な情報（件名, 日付, 開始時刻）が不足しているため、処理を中断しました。");
    return;
  }

  const calendar = CalendarApp.getDefaultCalendar();

  // 日付と時刻を結合してDateオブジェクトを作成
  const startDateTime = new Date(`${eventData.date}T${eventData.startTime}`);
  
  // 終了時刻がない場合は、開始時刻の1時間後を仮設定
  const endDateTime = eventData.endTime 
    ? new Date(`${eventData.date}T${eventData.endTime}`)
    : new Date(startDateTime.getTime() + 60 * 60 * 1000);

  const options = {
    description: eventData.description || '',
    location: eventData.location || ''
  };

  try {
    // 1. まずイベントを作成し、イベントオブジェクトを取得する
    const event = calendar.createEvent(eventData.title, startDateTime, endDateTime, options);
    
    // 2. 抽出されたカテゴリに応じて色を設定する
    switch (eventData.category) {
      case '就活':
        event.setColor(CalendarApp.EventColor.RED);
        console.log("カテゴリ「就活」を検出したため、イベントカラーを赤に設定しました。");
        break;
      case '会議':
        event.setColor(CalendarApp.EventColor.BLUE);
        console.log("カテゴリ「会議」を検出したため、イベントカラーを青に設定しました。");
        break;
      case 'プライベート':
        event.setColor(CalendarApp.EventColor.GREEN);
        console.log("カテゴリ「プライベート」を検出したため、イベントカラーを緑に設定しました。");
        break;
      case 'その他':
        event.setColor(CalendarApp.EventColor.GRAY);
        console.log("カテゴリ「その他」を検出したため、イベントカラーを灰色に設定しました。");
        break;
      default:
        // 上記のいずれにも当てはまらない場合
        console.log("特定のカテゴリが検出されなかったため、デフォルトカラーを使用します。");
        break;
    }

    console.log(`✅ 成功: 予定「${eventData.title}」をカレンダーに登録しました。`);
  } catch (e) {
    console.error("カレンダーへの予定登録に失敗しました。", e);
  }
}