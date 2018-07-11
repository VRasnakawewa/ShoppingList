const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

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
    //quit app when closed
    mainWindow.on('closed', function () {
        app.quit();
    });

    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
})

//Handle create add window
function createAddWindow() {
    //create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add shopping list Item'
    });
    //load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    //garbage collection handle
    addWindow.on('close', function () {
        addWindow = null;
    });
}

// create menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click() {
                    createAddWindow();
                }
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