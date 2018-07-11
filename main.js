const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu} = electron;

let mainWindow;

//listen for the app to be ready
app.on('ready', function () {
    //create new window
    mainWindow = new BrowserWindow({});
    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //build menu from temlate
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
})

// create menu HTMLTemplateElement
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item'
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
]