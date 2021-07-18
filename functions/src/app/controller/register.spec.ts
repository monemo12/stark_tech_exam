const init = require("./init");
import * as mocha from "mocha";
import { expect} from "chai";
import { register } from "./register";
import sionon = require("sinon");
import chai = require("chai")
import { user } from "./user";
chai.use(require('chai-as-promised'))

describe("Register", function() {
    this.timeout(20 * 1000);
    this.afterEach(() => {
        sionon.restore();
    });
    it("If the email is not exist in database, it shoud not throw error", async () => {
        sionon.stub(user, "is_email_exist").callsFake(async (email: string) => false);
        sionon.stub(user, "add").callsFake(async (email: string, pass: string) => 'user_id');
        expect(await register("test@gmail.com", "")).to.be.a.string;
    });

    it("If the email is exist in database, it shoud throw the error with `The email is exist.`", async () => {     
        sionon.stub(user, "is_email_exist").callsFake(async (email: string) => true);
        await expect(register("test@gmail.com", "")).to.be.rejectedWith(Error);
    });
});