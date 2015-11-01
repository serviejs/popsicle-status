/* global describe, it, beforeEach */

var popsicle = require('popsicle')
var expect = require('chai').expect
var nock = require('nock')
var status = require('./')

describe('popsicle status', function () {
  describe('2xx', function () {
    beforeEach(function () {
      nock('http://example.com')
        .get('/')
        .reply(201)
    })

    it('should resolve by default', function () {
      return popsicle('http://example.com')
        .use(status())
    })

    it('should reject outside of bounds', function () {
      var rejected = false

      return popsicle('http://example.com')
        .use(status(100, 199))
        .catch(function (err) {
          rejected = true

          expect(err).to.be.an.instanceOf(Error)
          expect(err.status).to.equal(201)
          expect(err.popsicle).to.exist
          expect(err.type).to.equal('EINVALIDSTATUS')
          expect(err.message).to.equal('Invalid HTTP status, 201, should be between 100 and 199')
        })
        .then(function () {
          expect(rejected).to.be.true
        })
    })

    it('should allow exact matches', function () {
      var rejected = false

      return popsicle('http://example.com')
        .use(status(200))
        .catch(function (err) {
          rejected = true

          expect(err).to.be.an.instanceOf(Error)
          expect(err.status).to.equal(201)
          expect(err.popsicle).to.exist
          expect(err.type).to.equal('EINVALIDSTATUS')
          expect(err.message).to.equal('Invalid HTTP status, 201, should equal 200')
        })
        .then(function () {
          expect(rejected).to.be.true
        })
    })
  })

  describe('5xx', function () {
    beforeEach(function () {
      nock('http://example.com')
        .get('/')
        .reply(500)
    })

    it('should reject by default', function () {
      var rejected = false

      return popsicle('http://example.com')
        .use(status())
        .catch(function (err) {
          rejected = true

          expect(err).to.be.an.instanceOf(Error)
          expect(err.status).to.equal(500)
          expect(err.popsicle).to.exist
          expect(err.type).to.equal('EINVALIDSTATUS')
          expect(err.message).to.equal('Invalid HTTP status, 500, should be between 200 and 399')
        })
        .then(function () {
          expect(rejected).to.be.true
        })
    })

    it('should accept when within range', function () {
      return popsicle('http://example.com')
        .use(status(200, 599))
    })
  })
})
