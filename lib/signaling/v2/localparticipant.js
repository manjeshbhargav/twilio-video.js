'use strict';

var inherits = require('util').inherits;
var ParticipantSignaling = require('../participant');
var PublishedTrackV2 = require('./publishedtrack');

/**
 * Construct a {@link LocalParticipantV2}.
 * @class
 * @extends ParticipantSignaling
 * @param {object} options
 * @property {number} revision
 */
function LocalParticipantV2(options) {
  if (!(this instanceof LocalParticipantV2)) {
    return new LocalParticipantV2(options);
  }

  options = Object.assign({
    PublishedTrackV2: PublishedTrackV2
  });

  ParticipantSignaling.call(this);
  Object.defineProperties(this, {
    _PublishedTrackV2: {
      value: options.PublishedTrackV2
    },
    _revision: {
      writable: true,
      value: 1
    },
    revision: {
      enumerable: true,
      get: function() {
        return this._revision;
      }
    }
  });
}

inherits(LocalParticipantV2, ParticipantSignaling);

LocalParticipantV2.prototype._createPublishedTrack = function _createPublishedTrackSignaling(localTrack) {
  return new this._PublishedTrackV2(localTrack.mediaStreamTrack);
};

LocalParticipantV2.prototype._getPublishedTrack = function _getPublishedTrack(localTrack) {
  return this.tracks.get(localTrack.id);
};

LocalParticipantV2.prototype.update = function update(localParticipantState) {
  if (this.revision !== null && localParticipantState.revision < this.revision) {
    return this;
  }

  localParticipantState.tracks.forEach(function(localTrackState) {
    var publishedTrackV2 = this.tracks.get(localTrackState.id);
    if (publishedTrackV2) {
      publishedTrackV2.update(localTrackState);
    }
  }, this);

  return this;
};

LocalParticipantV2.prototype.getState = function getState() {
  return {
    revision: this.revision,
    tracks: Array.from(this.tracks.values()).map(function(track) {
      return track.getState();
    })
  };
};

LocalParticipantV2.prototype.incrementRevision = function incrementRevision() {
  this._revision++;
  return this;
};

module.exports = LocalParticipantV2;
