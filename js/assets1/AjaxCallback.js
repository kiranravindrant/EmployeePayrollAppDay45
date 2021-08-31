let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs: " + date.getMinutes() + "Mins: " + date.getSeconds() + "secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // console.log(methodType+" State Changed Called at:"+showTime()+" Ready State: "+xhr.readyState+" Status:"+xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 Client Error or 500 Server Error at: " + showTime());
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else
        xhr.send();
    console.log(methodType + " request sent to the server at : " + showTime());
}

const getURL = "http://localhost:3000/employees/17";
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to Server at : " + showTime());
function getUserDetails(data) {
    console.log("Get User Data at : " + showTime() + " data: " + data);
}

const deleteURL = "http://localhost:3000/employees/6";
function UserDeleted(data) {
    console.log("User Deleted at: " + showTime() + "data: " + data);
}
makeAJAXCall("DELETE", deleteURL, UserDeleted, false,);
console.log("Made DELETE AJAX Call to Server at : " + showTime());




const postURL = "http://localhost:3000/employees/";
const emplData = { "name": "Harry1", "salary": "5000" };
function UserAdded(data) {
    console.log("User Added at: " + showTime() + " data: " + data);
}
makeAJAXCall("POST", postURL, UserAdded, true, emplData);
console.log("Made POST AJAX Call to Server at : " + showTime());