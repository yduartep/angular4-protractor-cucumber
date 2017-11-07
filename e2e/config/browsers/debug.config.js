'use strict';

exports.config = debugConfig();

function debugConfig() {
  return {
    browserName: 'chrome',
    chromeOptions: {
      args: ['disable-infobars'],
      prefs: {
        'credentials_enable_service': false,
        'profile': {
          'password_manager_enabled': false
        }
      }
    },
    maxInstances: 5
  };
}
