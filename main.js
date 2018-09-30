const { app, BrowserWindow } = require('electron')

let win
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
        label: 'Rainbow',
    }]
});

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      allowRunningInsecureContent: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
