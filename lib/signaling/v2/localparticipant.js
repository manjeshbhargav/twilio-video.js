'use strict';

var inherits = require('util').inherits;
var ParticipantSignaling = require('../participant');

/**
 * Construct a {@link LocalParticipantV2}.
 * @class
 * @extends ParticipantSignaling
 */
function LocalParticipantV2() {
  if (!(this instanceof LocalParticipantV2)) {
    return new LocalParticipantV2();
  }
  ParticipantSignaling.call(this);
  Object.defineProperties(this, {
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
