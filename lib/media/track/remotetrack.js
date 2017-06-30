'use strict';

var DEFAULT_LOG_LEVEL = require('../../util/constants').DEFAULT_LOG_LEVEL;

/**
 * Construct a {@link RemoteTrack} from a MediaStreamTrack.
 * @class
 * @classdesc A {@link RemoteTrack} represents a media {@link Track} published
 * to the {@link Room} by a {@link RemoteParticipant}.
 * @param {function(MediaStreamTrack, TrackSignaling): Track} Track
 * @param {MediaStreamTrack} mediaStreamTrack
 * @param {RemoteTrackSignaling} signaling
 * @param {{log: Log}} options
 * @property {boolean} isSubscribed - Whether the {@link RemoteTrack} is
 *    subscribed by the {@link LocalParticipant}
 * @property {Track.SID} sid - The SID assigned to the {@link RemoteTrack}
 */
function RemoteTrack(Track, mediaStreamTrack, signaling, options) {
  options = Object.assign({
    logLevel: DEFAULT_LOG_LEVEL
  }, options);
  Track.call(this, mediaStreamTrack, signaling, options);

  Object.defineProperties(this, {
    isSubscribed: {
      enumerable: true,
      value: signaling.subscribed,
      writable: true
    },
    sid: {
      enumerable: true,
      value: signaling.sid
    }
  });
}

RemoteTrack.prototype.toString = function toString() {
  return '[RemoteTrack #' + this._instanceId + ': ' + this.sid + ']';
};

module.exports = RemoteTrack;
