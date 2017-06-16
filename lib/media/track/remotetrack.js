'use strict';

var DEFAULT_LOG_LEVEL = require('../../util/constants').DEFAULT_LOG_LEVEL;

function RemoteTrack(Track, mediaStreamTrack, signaling, options) {
  options = Object.assign({
    logLevel: DEFAULT_LOG_LEVEL
  }, options);
  Track.call(this, mediaStreamTrack, signaling, options);

  Object.defineProperties(this, {
    isSubscribed: {
      value: signaling.subscribed,
      enumerable: true,
      writable: true
    },
    sid: {
      value: signaling.sid,
      enumerable: true
    }
  });
}

RemoteTrack.prototype.toString = function toString() {
  return '[RemoteTrack #' + this._instanceId + ': ' + this.sid + ']';
};

module.exports = RemoteTrack;
