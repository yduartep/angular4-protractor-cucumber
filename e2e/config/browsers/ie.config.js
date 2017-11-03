'use strict';

exports.config = internetExplorerConfig();

function internetExplorerConfig() {
  return {
    browserName: 'internet explorer',
    platform: 'ANY',
    version: '11'
  };
}

