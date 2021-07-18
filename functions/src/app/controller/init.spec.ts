import * as init from "./init";
import * as mocha from "mocha";
import * as admin from "firebase-admin";
import { expect } from "chai";

describe("Setup firebase-admin", () => {
    it("firebase-admin is ready", () => {
        expect(admin.app.length).to.above(0);
    });
})
