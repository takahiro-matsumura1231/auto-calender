// この関数をトリガーで実行するか、手動で実行する
function processEmailForCalendar() {
  // 例として、受信トレイの最初の未読メールを処理対象とする
  // const threads = GmailApp.getInboxThreads(0, 1);
  // if (threads.length === 0) {
  //   console.log("処理対象のメールがありません。");
  //   return;
  // }
  // const message = threads[0].getMessages()[0]; // 最新のメールを取得
  const emailBody = `
夏季海外研修参加のみなさま(中長期含む)
 
 
こんにちは、グローバル推進課です。
本日、MoodleのGateway内に書類格納場所を作成しました。
各期限までに提出の程よろしくお願いいたします。
 
OSSMA登録完了画面のアップロード
Gatewayの授業内でも説明があったと思いますが、各自安否確認システムOSSMAの
登録をお願いいたします。登録が完了しましたらmoodleの該当箇所にアップロード
してください。期限7/31(木)23：59
 
たびレジ登録完了画面のアップロード
次回のGateway内で説明があると思いますが、外務省のたびレジの登録を
お願いいたします。
　　たびレジ🔗→https://www.ezairyu.mofa.go.jp/tabireg/index.html
　　登録が完了しましたらmoodleの該当箇所にアップロードをしてください。
　　期限7/31(木)23：59
 
学研災付帯海外留学保険被保険者証のアップロード
以前学研災のformに入力いただいたメールアドレス宛に保険会社から付帯海外の案内が来ます。
手続き終了後、保険者証を受け取りましたらmoodleの該当箇所にアップロードを
してください。期限8/10(日)23：59
 
 
★別途JASSO受給者には今後の流れと提出書類の案内メールを送信いたします。
　振込に関わりますので必ず期限内に対応をお願いいたします。
    `;

  // ステップ2の関数を呼び出す
  const eventData = extractEventInfoWithLLM(emailBody);

  // ステップ3の関数を呼び出す
  if (eventData) {
    createCalendarEvents(eventData);
  }
}