import {expect} from 'chai';
import {App} from './../../src/app.js';

describe('App Tests', function() {
    var app;

    beforeEach(function() {
        app = new App();
    });

    it('constructor', function() {
        expect(app).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => App()).to.throw("Cannot call a class as a function");
    });

    it('configureRouter', function() {
        let configuredMap = [];
        const router = {};
        const config = {
            title: "",
            map(map) {
                configuredMap = map;
            }
        };

        app.configureRouter(config, router);

        expect(app.router).to.be.equal(router);
        expect(config.title).to.be.equal('Pragma Products', 'expected config title to be "Pragma Products"');
        expect(configuredMap.length).to.be.equal(1, 'expected config map to contain 1 item');

        describe('testing routes', function() {
           it ('Welcome', function() {
               expect(configuredMap[0].title === "Welcome");
               expect(configuredMap[0].nav === "true");
               expect(configuredMap[0].moduleId === "views/welcome/welcome");
               expect(configuredMap[0].name === "welcome");
           });
        });
    });
});