#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const _ = require("lodown-tdavidng811");

/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */
// Number of Males
var males = _.filter(customers, function(e, i, c) {
    return customers[i].gender === 'male';
    
});
console.log('Number of Males:' + males.length);


// Number of Females
var females = _.filter(customers, function(e, i, c) {
    return customers[i].gender === 'female';
});
console.log("Number of Females:" + females.length);

// Youngest Customer
function youngestCustomer() {
    var ages = _.pluck(customers, "age"); 
    var index;
        _.reduce(ages, function(previous, current, i) {
            if(current < previous) {
                index = i;
                    return current;
            }
        return previous;
        });
    return(customers[index]["name"] + " " + customers[index]["age"]);
}
console.log("Youngest Customer: " + youngestCustomer());

// Oldest Customer
function oldestCustomer() {
    var ages = _.pluck(customers, "age");
    var index;
        _.reduce(ages, function(previous, current, i) {
            if(current > previous) {
                index = i;
                return current;
        }
            return previous;
        });
    return(customers[index]["name"] + " " + customers[index]["age"]);
}
console.log("Oldest Customer: " + oldestCustomer());

// Average balance of all customers

function averageBalance() {
    var balances = _.pluck(customers, "balance");
        balances =  _.map(balances, function(element, i, balances) {
                        var value = element.slice(1); // removes '$' sign
                        value = value.replace(",",""); //replaces ',' with ''
                        return Number(value); //turns the 'string' value into a 'number' value
                    });
    var totalBalance = _.reduce(balances, function(previous, current) {
        return previous + current;
    });
    var averageBalance = (totalBalance / balances.length).toFixed(2); //numbers rounded to two decimals
        return averageBalance;
}
console.log("Average Balance: $" + averageBalance());

// Customer Names that Begin With 
function beginsWith(collection) {
    var array = [];
//Creates A to Z Array from ASCII Code
    for (var i = 65; i < 91; i++) {
        array.push(String.fromCharCode(i)); // "A" starts at 65 to 'Z' at 91
    }
// Runs filter on Every Letter A to Z
    for (var j = 0; j < array.length; j++) {
        var results = _.filter(collection, function(customer) {
        return customer.name.charAt(0) == array[j];
        }).length;
        if(results) {
            console.log("Customer Names that Begin with " + array[j] + ": " + results);
        }
    }
}
beginsWith(customers);

// Customer Friends Names That Being With
function customerFriendName(collection, letter) {
    var friends = _.map(collection, function(customer) {
        return customer.friends;
    });
    var merged = [].concat.apply([], friends); // adding all arrays into one
    var results = _.filter(merged, function(friend) {
        return friend.name.charAt(0) === letter;
    }).length;
    console.log("Customer Friends' Name that Begin with " + letter + ": " + results);
}
customerFriendName(customers, "R");
// Number of Customer Friends
function customerFriends() {
    var numFriends = 0;
    _.each(customers, function(customer) {
        _.each(customer.friends, function(friend) {
            _.each(customers, function(customerJ) {
                if (customerJ.name === friend.name) numFriends++;
            });
        });
    });
return numFriends;
}
console.log("Number of Customers That Are Friends: " + customerFriends());


// Top Three Tags
function topTags(amount) {
    var allTags = [];
    _.each(customers, function(customer) {
        _.each(customer.tags, function(tag){
            allTags.push(tag);
        });
    });
    var uniques = _.unique(allTags);
    var uniqueCount = [];
    _.each(uniques, function(uniqueTag) {
        var counter = 0;
        _.each(allTags, function(tag) {
            if(tag === uniqueTag) counter++;
        });
    uniqueCount.push(counter);
    });
    var results = [];
    while (results.length < amount) {
        var index = 0;
        _.reduce(uniqueCount, function(max, next, i) {
            if(max < next) {
                index = i;
                return next;
            }
            return max;
        });
        results.push(uniques[index]);
        uniques.splice(index,1);
        uniqueCount.splice(index,1);
    }
    return results;
}
console.log("Top Three Tags:", topTags(3));

// Summary of Genders
function countByGender(arr) {
    var genders = _.map(arr, function (customer) {
        return customer.gender;
    });
    return _.reduce(genders, function (gender, i, genders) {
        if (typeof gender[i] == 'undefined') {
            gender[i] = 1;
        } else {
            gender[i] += 1;
          }
        return gender;
    }, {});
}
console.log("Summary of Genders: ", countByGender(customers))
