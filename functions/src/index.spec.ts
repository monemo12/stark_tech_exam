import * as request from "supertest";
import * as mocha from "mocha";
import { server } from ".";

describe('Server Status', function () {
    let test_server: any;
    beforeEach(function () {
        test_server = server;
    });
    afterEach(function () {
        test_server.close();
    });
    it('The response status of / should be 200', function testSlash(done) {
        request(test_server)
            .get('/')
            .expect(200, done);
    });
    it('The response status of anywhere else should be 404', function testPath(done) {
        request(test_server)
            .get('/not-found')
            .expect(404, done);
    });
});