'use strict';


let jsonToString = (obj) => {
    let result = "";
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result += obj[key] + " ";
        }
    }
    return result.trim();
};

let toString = (... props) => {

    let body = "";
    props.forEach(prop => {
        body += "\n" + prop;
    });

    return body;

};

module.exports = {jsonToString, toString};