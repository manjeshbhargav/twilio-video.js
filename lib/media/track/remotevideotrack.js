'use strict';

var inherits = require('util').inherits;
var RemoteTrack = require('./remotetrack');
var VideoTrack = require('./videotrack');

function RemoteVideoTrack(mediaStreamTrack, signaling, options) {
  if (!(this instanceof RemoteVideoTrack)) {
    return new RemoteVideoTrack(mediaStreamTrack, signaling, options);
  }
  RemoteTrack.call(this, VideoTrack, mediaStreamTrack, signaling, options);
}

inherits(RemoteVideoTrack, VideoTrack);

RemoteVideoTrack.prototype.toString = function toString() {
  return '[RemoteVideoTrack #' + this._instanceId + ': ' + this.sid + ']';
};

module.exports = RemoteVideoTrack;
