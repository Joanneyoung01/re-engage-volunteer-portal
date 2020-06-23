let mongoose = require("mongoose");
require("../mongodb_helper");
let Admin = require("../../models/admin.js");

describe("Admin model", function () {
  beforeEach(function (done) {
    mongoose.connection.collections.admins.drop(function () {
      done();
    });
  });

  it("has a userName", function () {
    let admin = new Admin({ userName: "admin" });
    expect(admin.userName).toEqual("admin");
  });

  it("has a password", function () {
    let admin = new Admin({ password: "1234" });
    expect(admin.password).toEqual("1234");
  });

  it("is storing data inside users table", function (done) {
    let admin = new Admin({ userName: "makers", password: "0000" });

    admin.save(function (err) {
      expect(err).toBeNull();
      Admin.find(function (err, admins) {
        expect(err).toBeNull();
        expect(admins[0].userName).not.toEqual("maker");
        expect(admins[0].password).not.toEqual("000");
        expect(admins[0].userName).toEqual("makers");
        expect(admins[0].password).toEqual("0000");

        done();
      });
    });
  });
});