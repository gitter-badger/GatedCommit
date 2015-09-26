(function () {
    "use strict";
    var Person = function (nm) {
        this.name = nm;
    };
    Person.prototype.greet = function (person) {
        if(person.name === "Bob"){
            return "Hi " + person.name;
        }
        
        return "Hello " + person.name;
    };
    module.exports = Person;
}());