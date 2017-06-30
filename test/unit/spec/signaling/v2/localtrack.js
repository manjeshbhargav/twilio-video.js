'use strict';

const assert = require('assert');
const LocalTrackV2 = require('../../../../../lib/signaling/v2/localtrack');
const { makeUUID } = require('../../../../../lib/util');
const { FakeMediaStreamTrack } = require('../../../../lib/fakemediastream');

describe('LocalTrackV2', () => {
  // LocalTrackV2
  // ------------

  describe('constructor', () => {
    [ true, false ].forEach(shouldUseNew => {
      context(`when called with${shouldUseNew ? '' : 'out'} "new"`, () => {
        let localTrackV2;
        let mediaStreamTrack;

        before(() => {
          mediaStreamTrack = new FakeMediaStreamTrack(makeKind());
          mediaStreamTrack.enabled = makeEnabled();
          localTrackV2 = shouldUseNew
            ? new LocalTrackV2(mediaStreamTrack)
            : LocalTrackV2(mediaStreamTrack);
        });

        it('should return a LocalTrackV2', () => {
          assert(localTrackV2 instanceof LocalTrackV2);
        });

        it('should set .mediaStreamTrack', () => {
          assert.equal(localTrackV2.mediaStreamTrack, mediaStreamTrack);
        });

        it('should set .sid to null', () => {
          assert.equal(localTrackV2.sid, null);
        });

        [
          [ 'id', 'id' ],
          [ 'kind', 'kind' ],
          [ 'isEnabled', 'enabled' ]
        ].forEach(([ ltProp, mstProp ]) => {
          it(`should set .${ltProp} to MediaStreamTrack's ${mstProp}`, () => {
            assert.equal(localTrackV2[ltProp], mediaStreamTrack[mstProp]);
          });
        });
      });
    });

    describe('#getState', () => {
      let localTrackV2;
      let mediaStreamTrack;
      let state;

      before(() => {
        mediaStreamTrack = new FakeMediaStreamTrack(makeKind());
        mediaStreamTrack.enabled = makeEnabled();
        localTrackV2 = new LocalTrackV2(mediaStreamTrack);
        state = LocalTrackV2.getState(localTrackV2);
      });

      context('should return an object whose', () => {
        [
          [ 'id', 'id' ],
          [ 'kind', 'kind' ],
          [ 'enabled', 'isEnabled' ]
        ].forEach(([ stateProp, ltProp ]) => {
          it(`.${stateProp} is equal to the LocalTrackV2's ${ltProp}`, () => {
            assert.equal(state[stateProp], localTrackV2[ltProp]);
          });
        });
      });
    });
  });

  // TrackSignaling
  // --------------

  describe('#getSid', () => {
    context('when called before #setSid', () => {
      let localTrackV2;
      let sid;

      before(() => {
        const mediaStreamTrack = new FakeMediaStreamTrack(makeKind());
        sid = makeSid();
        localTrackV2 = new LocalTrackV2(mediaStreamTrack);
      });

      it('should return a Promise that is resolved with the value passed to #setSid when it is eventually called', async () => {
        const promise = localTrackV2.getSid();
        localTrackV2.setSid(sid);
        const _sid = await promise;
        assert.equal(_sid, sid);
      });
    });

    context('when called after #setSid', () => {
      let localTrackV2;
      let sid;

      before(() => {
        const mediaStreamTrack = new FakeMediaStreamTrack(makeKind());
        sid = makeSid();
        localTrackV2 = new LocalTrackV2(mediaStreamTrack);
        localTrackV2.setSid(sid);
      });

      it('should return a Promise that is resolved with the value passed to #setSid', async () => {
        const _sid = await localTrackV2.getSid();
        assert.equal(_sid, sid);
      });
    });
  });

  describe('#setSid', () => {
    let localTrackV2;
    let ret;
    let sid;
    let updated;

    before(() => {
      const mediaStreamTrack = new FakeMediaStreamTrack(makeKind());
      sid = makeSid();
      localTrackV2 = new LocalTrackV2(mediaStreamTrack);
      localTrackV2.once('updated', () => updated = true);
      ret = localTrackV2.setSid(sid);
    });

    context('when .sid is null', () => {
      it('should set .sid to the value passed to it', () => {
        assert.equal(localTrackV2.sid, sid);
      });

      it('should emit "updated"', () => {
        assert(updated);
      });
    });

    context('when .sid is non-null', () => {
      let ret1;
      let sid1;
      let updated1;

      before(() => {
        sid1 = makeSid();
        localTrackV2.once('updated', () => updated1 = true);
        ret1 = localTrackV2.setSid(sid1);
      });

      it('should not set .sid to the value passed to it', () => {
        assert.equal(localTrackV2.sid, sid);
      });

      it('should not emit "updated"', () => {
        assert(!updated1);
      });
    });

    it('should return the LocalTrackV2', () => {
      assert.equal(ret, localTrackV2);
    });
  });
});

function makeEnabled() {
  return (Math.random() < 0.5);
}

function makeKind() {
  return ['audio', 'video'][Number(Math.random() > 0.5)];
}

function makeSid() {
  return makeUUID();
}
