/*exported Person, chai*/
/*globals describe:true, it:true*/
var Person = require("./person.js"),
    chai = require("chai").should();
describe("TEST1", function () {
    "use strict";
    var p1 = new Person("Tommy"),
        p2 = new Person("Bob3"),
        p3 = new Person("Bob");
    it("says hi", function () {
        p1.greet(p2).should.equal("Hello Bob3");
    });
    it("says hi again", function () {
        p1.greet(p3).should.equal("Hi Bob");
    });
});