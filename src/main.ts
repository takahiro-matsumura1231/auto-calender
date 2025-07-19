import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 700,
        webPreferences: {
            // renderer.jsからNode.jsの機能を使わないので、セキュリティ設定はデフォルトでOK
        },
    });

    // コンパイル後のHTMLファイルを読み込む
    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});