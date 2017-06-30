'use strict';

var inherits = require('util').inherits;
var LocalTrackSignaling = require('../localtrack');

/**
 * Construct a {@link LocalTrackV2}.
 * @class
 * @extends LocalTrackSignaling
 * @param {MediaStreamTrack} mediaStreamTrack
 */
function LocalTrackV2(mediaStreamTrack) {
  if (!(this instanceof LocalTrackV2)) {
    return new LocalTrackV2(mediaStreamTrack);
  }
  LocalTrackSignaling.call(this, mediaStreamTrack);
}

inherits(LocalTrackV2, LocalTrackSignaling);

/**
 * Get the {@link LocalTrackV2#Representation} of a given {@link TrackSignaling}.
 * @param {TrackSignaling} track
 * @returns {LocalTrackV2#Representation} - without the SID
 */
LocalTrackV2.getState = function getState(track) {
  return {
    enabled: track.isEnabled,
    id: track.id,
    kind: track.kind
  };
};

/**
 * Compare the {@link LocalTrackV2} to a {@link LocalTrackV2#Representation} of itself
 * and perform any updates necessary.
 * @param {LocalTrackV2#Representation} track
 * @returns {this}
 * @fires TrackSignaling#updated
 */
LocalTrackV2.prototype.update = function update(track) {
  this.setSid(track.sid);
  return this;
};

/**
 * The Room Signaling Protocol (RSP) representation of a {@link LocalTrackV2}
 * @typedef {object} LocalTrackV2#Representation
 * @property {boolean} enabled
 * @property {Track.ID} id
 * @property {string} kind
 * @property {Track.SID} sid
 */

module.exports = LocalTrackV2;
