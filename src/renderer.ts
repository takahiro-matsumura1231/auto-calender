// ------------------------------
// 型定義とグローバル変数
// ------------------------------
type MessageStatus = 'sending' | 'success' | 'error';
interface Message {
    id: number;
    content: string;
    status: MessageStatus;
    resultMessage: string;
}

const GAS_URL = "https://script.google.com/macros/s/AKfycbySuZ-iUSj7voDVz-lsRY1pY7dkAKwVbWoLgmjPp5kac-fb_DZ8To4F4FN0CbzJPtuU/exec";
let messages: Message[] = [];

const historyContainer = document.getElementById('historyContainer')!;
const emailBody = document.getElementById('emailBody') as HTMLTextAreaElement;
const sendButton = document.getElementById('sendButton') as HTMLButtonElement;

// ------------------------------
// UIを更新する関数
// ------------------------------
function renderHistory() {
    historyContainer.innerHTML = ''; // 履歴を一度クリア
    
    // messages配列の各要素を元にUI要素を再構築
    [...messages].reverse().forEach(msg => {
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        const contentP = document.createElement('p');
        contentP.textContent = msg.content;
        
        const statusP = document.createElement('p');
        statusP.className = 'message-status';
        statusP.textContent = msg.resultMessage;
        
        // ステータスに応じて色を変えるクラスを追加
        if (msg.status === 'success') statusP.classList.add('status-success');
        if (msg.status === 'error') statusP.classList.add('status-error');
        if (msg.status === 'sending') statusP.classList.add('status-sending');
        
        bubble.appendChild(contentP);
        bubble.appendChild(statusP);
        historyContainer.appendChild(bubble);
    });
}

// ------------------------------
// メインの実行ロジック
// ------------------------------
async function handleSend() {
    const content = emailBody.value;
    if (!content.trim()) return;

    // 1. 新しいメッセージオブジェクトを作成し、リストに追加
    const newMessage: Message = {
        id: Date.now(), // ユニークなIDとして現在時刻を使用
        content: content,
        status: 'sending',
        resultMessage: '送信中...'
    };
    messages.push(newMessage);

    // 2. UIを即座に更新し、入力欄をクリア
    renderHistory();
    emailBody.value = '';
    emailBody.style.height = '40px'; // 高さをリセット

    // 3. 非同期でGASにデータを送信
    try {
        const response = await fetch(GAS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: content,
        });
        const result = await response.json();

        // 4. 結果に応じてメッセージの状態を更新
        const targetMsg = messages.find(m => m.id === newMessage.id)!;
        if (response.ok && result.status === 200) {
            targetMsg.status = 'success';
            targetMsg.resultMessage = `✅ ${result.message}`;
        } else {
            targetMsg.status = 'error';
            targetMsg.resultMessage = `❌ エラー: ${result.message}`;
        }
    } catch (error) {
        // 4. 通信エラーの場合も状態を更新
        const targetMsg = messages.find(m => m.id === newMessage.id)!;
        targetMsg.status = 'error';
        targetMsg.resultMessage = `❌ 通信エラー`;
    }

    // 5. 最終的な結果を反映するために再度UIを更新
    renderHistory();
}

// ------------------------------
// イベントリスナーの設定
// ------------------------------
sendButton.addEventListener('click', handleSend);
// Enterキーでも送信できるようにする (Shift+Enterで改行)
emailBody.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // デフォルトの改行動作をキャンセル
        handleSend();
    }
});
// 入力内容に応じてテキストエリアの高さを自動調整
emailBody.addEventListener('input', () => {
    emailBody.style.height = 'auto';
    emailBody.style.height = `${emailBody.scrollHeight}px`;
});