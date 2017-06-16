'use strict';

var inherits = require('util').inherits;
var AudioTrack = require('./audiotrack');
var RemoteTrack = require('./remotetrack');

function RemoteAudioTrack(mediaStreamTrack, signaling, options) {
  if (!(this instanceof RemoteAudioTrack)) {
    return new RemoteAudioTrack(mediaStreamTrack, signaling, options);
  }
  RemoteTrack.call(this, AudioTrack, mediaStreamTrack, signaling, options);
}

inherits(RemoteAudioTrack, AudioTrack);

RemoteAudioTrack.prototype.toString = function toString() {
  return '[RemoteAudioTrack #' + this._instanceId + ': ' + this.sid + ']';
};

module.exports = RemoteAudioTrack;
