
// first type of mothod
module.exports.getDate = getDate;

function getDate(){
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var today = new Date();
    return today.toLocaleDateString("en-US", options);
}

// another method with anonymous
// we dont need to write moduele as well
exports.getDay = function() {
    var options = {
        weekday: "long",
    };

    var today = new Date();
    return today.toLocaleDateString("en-US", options);
};