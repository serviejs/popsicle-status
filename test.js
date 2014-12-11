var popsicle = require('popsicle');
var expect   = require('chai').expect;
var nock     = require('nock');
var status   = require('./');

describe('popsicle status', function () {
  describe('2xx', function () {
    beforeEach(function () {
      nock('http://example.com')
        .get('/')
        .reply(201);
    });

    it('should resolve by default', function () {
      return popsicle('http://example.com')
        .then(status());
    });

    it('should reject outside of bounds', function () {
      var rejected = false;

      return popsicle('http://example.com')
        .then(status(100, 199))
        .catch(function (err) {
          rejected = true;

          expect(err).to.be.an.instanceOf(Error);
          expect(err.status).to.equal(201);
          expect(err.popsicle).to.exist;
        })
        .then(function () {
          expect(rejected).to.be.true;
        });
    });
  });

  describe('5xx', function () {
    beforeEach(function () {
      nock('http://example.com')
        .get('/')
        .reply(500);
    });

    it('should reject by default', function () {
      var rejected = false;

      return popsicle('http://example.com')
        .then(status())
        .catch(function (err) {
          rejected = true;

          expect(err).to.be.an.instanceOf(Error);
          expect(err.status).to.equal(500);
          expect(err.popsicle).to.exist;
        })
        .then(function () {
          expect(rejected).to.be.true;
        });
    });

    it('should accept when within range', function () {
      return popsicle('http://example.com')
        .then(status(200, 599));
    });
  });
});
