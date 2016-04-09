const electron = window.require('electron');
const remote = electron.remote;
const fs = remote.require('fs');
const path = remote.require('path');
const readline = remote.require('readline');
const google = remote.require('googleapis');
const googleAuth = remote.require('google-auth-library');

import * as actions from 'actions';
import moment from 'moment';

// If modifying these scopes, delete your previously saved credentials
let SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
let TOKEN_DIR = path.join(remote.app.getAppPath(), '/.credentials/');
let TOKEN_PATH = TOKEN_DIR + 'calendar.json';

let credentials;
function withCredentials(cb) {
  // load the credentials if not loaded
  if(!credentials) {
    // Load client secrets from a local file.
    fs.readFile(path.join(remote.app.getAppPath(), '.client_secret.json'), (err, content) => {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }

      // save it
      credentials = JSON.parse(content);

      cb(credentials);
    });
  } else {
    cb(credentials);
  }
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 */
function authorize(callback) {
  withCredentials((credentials) => {
    let clientSecret = credentials.installed.client_secret;
    let clientId = credentials.installed.client_id;
    let redirectUrl = credentials.installed.redirect_uris[0];
    let auth = new googleAuth();
    let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 */
function getNewToken(oauth2Client, callback) {
  let authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  // create a new window
  let authWin = new remote.BrowserWindow({width: 600, height: 400});
  authWin.loadURL(authUrl);
  authWin.show();
  authWin.webContents.on('did-navigate', (e) => {
    console.log(e);
    let title = authWin.getTitle();
    let matches = /Success code=([^\s]*)/.exec(title);
    if(matches) {
      // regardless of success, close the window
      authWin.close();

      let code = matches[1];
      oauth2Client.getToken(code, (err, token) => {
        if (err) {
          console.error('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
      });
    }
  });
}

/**
 * Store token to disk be used in later program executions.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {}
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

function loadTodaysEvents(auth, callback) {
  let calendar = google.calendar('v3');

  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: moment().toISOString(),
    timeMax: moment().endOf('day').toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    callback(response.items);
  });
}

export function load(cb) {
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize((auth) => loadTodaysEvents(auth, cb));
}

export function subscribe(cb, interval=10*60*1000) {
  // initial load
  load(cb);

  // update every 10 minutes
  window.setInterval(() => load(cb), interval);
}
