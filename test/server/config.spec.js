describe('config object -> ', function() {
  var config = require('../../config.example.json');

  describe('mode -> ', function() {

    it('should have a mode property', function() {
      expect(config.mode).not.toBeUndefined();
    });

  });

  describe('app -> ', function() {

    it('should have an app property', function() {
      expect(config.app).not.toBeUndefined();
    });

    it('should have an app.host property', function() {
      expect(config.app.host).not.toBeUndefined();
    });

    it('should have an app.port property', function() {
      expect(config.app.port).not.toBeUndefined();
    });

    it('should have an app.session_secret property', function() {
      expect(config.app.session_secret).not.toBeUndefined();
    });

  });

  describe('db -> ', function() {

    it('should have a db property', function() {
      expect(config.db).not.toBeUndefined();
    });

    describe('prod -> ', function() {

      it('should have a db.prod property', function() {
        expect(config.db.prod).not.toBeUndefined();
      });

      it('should have a db.prod.host property', function() {
        expect(config.db.prod.host).not.toBeUndefined();
      });

      it('should have a db.prod.port property', function() {
        expect(config.db.prod.port).not.toBeUndefined();
      });

      it('should have a db.prod.user property', function() {
        expect(config.db.prod.user).not.toBeUndefined();
      });

      it('should have a db.prod.pw property', function() {
        expect(config.db.prod.pw).not.toBeUndefined();
      });

      it('should have a db.prod.name property', function() {
        expect(config.db.prod.name).not.toBeUndefined();
      });

    });

    describe('dev -> ', function () {

      it('should have a db.dev property', function() {
        expect(config.db.dev).not.toBeUndefined();
      });

      it('should have a db.dev.host property', function() {
        expect(config.db.dev.host).not.toBeUndefined();
      });

      it('should have a db.dev.port property', function() {
        expect(config.db.dev.port).not.toBeUndefined();
      });

      it('should have a db.dev.user property', function() {
        expect(config.db.dev.user).not.toBeUndefined();
      });

      it('should have a db.dev.pw property', function() {
        expect(config.db.dev.pw).not.toBeUndefined();
      });

      it('should have a db.dev.name property', function() {
        expect(config.db.dev.name).not.toBeUndefined();
      });

    });

    describe('test -> ', function() {

      it('should have a db.test property', function() {
        expect(config.db.test).not.toBeUndefined();
      });

      it('should have a db.test.host property', function() {
        expect(config.db.test.host).not.toBeUndefined();
      });

      it('should have a db.test.port property', function() {
        expect(config.db.test.port).not.toBeUndefined();
      });

      it('should have a db.test.user property', function() {
        expect(config.db.test.user).not.toBeUndefined();
      });

      it('should have a db.test.pw property', function() {
        expect(config.db.test.pw).not.toBeUndefined();
      });

      it('should have a db.test.name property', function() {
        expect(config.db.test.name).not.toBeUndefined();
      });

    });

  });

});