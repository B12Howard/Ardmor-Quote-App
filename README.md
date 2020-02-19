## Ardmor Inc Quotation System

This was built using [Enuchi's Excellent React Google Apps Script ](https://github.com/enuchi/React-Google-Apps-Script).
These are instructions for whomever wants to fix bugs or add features to this app.

## Installation

1.  Clone the sample project and install dependencies:

```
> git clone https://github.com/B12Howard/Ardmor-Quote-App.git
> cd Ardmor-Quote-App-master
> npm install
```

2. Enable the Google Apps Script API [(script.google.com/home/usersettings)](https://script.google.com/home/usersettings):
   ![Enable Google Apps Script](https://i.imgur.com/PxuNbP3.png "enable the Google Apps Script API")

3. Log in to `clasp` to manage your Google Apps Scripts from the command line:

```
> npm run login
```

4. Create a new Google Sheets file and a bound Google Scripts project for your React project:

```
> npm run setup
Created new Google Sheet: https://drive.google.com/open?id=1lVQUPZ*************************************
Created new Google Sheets Add-on script: https://script.google.com/d/1K7MPtCH*************************************-**/edit
```

You've created a new Sheet and attached Script file! (But they're still empty for now.) See the notes below if you want to use an existing Google Sheet and Script instead of creating a new one.

5. Build the app and deploy!

```
> npm run deploy
```

You can now visit your Google Sheet and see your new React app.
