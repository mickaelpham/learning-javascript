/**
 * Simple ZSet implementation in JavaScript.
 * @author John Henry <john.henry@zuora.com>
 */

var ZSet = function () {
    this.members = [];
}

// Will return true if an element is in the array, false otherwise.
ZSet.prototype.contains = function (element) {
    return this.members.indexOf(element) != -1;
}

// Will add an element if and only if it's not already in the array.
ZSet.prototype.add = function (element) {
    if (!this.contains(element)) {
        this.members.push(element);
    }
}

// Will return an array with all the members.
ZSet.prototype.list = function () {
    // Return a shallow copy to avoid the outside gaining access to
    // the direct reference.
    return this.members.slice();
}

// Will remove an element if it's in the array.
ZSet.prototype.remove = function (element) {
    for (var i = 0; i < this.members.length; i++) {
        if (this.members[i] == element) {
            return this.members.splice(i, 1);
        }
    }
}

// Remove all elements from the set.
ZSet.prototype.clear = function () {
    this.members = [];
}