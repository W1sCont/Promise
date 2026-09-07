const div = document.getElementById("main");
const divPosts = document.getElementById("posts");
const button = document.getElementById("button");
const tbody = document.getElementById("tbody");

function JSONrequest(url) {
    return new Promise(function (resolve, reject) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, true);
        xmlHttp.responseType = "json";

        xmlHttp.onload = function () {
            if (xmlHttp.status === 200) {
                resolve(xmlHttp.response);
            }
            else {
                reject(new Error("Error: " + xmlHttp.status));
            }
        };

        xmlHttp.send();
    });
}
function addAuthors() {
    const url = "https://jsonplaceholder.typicode.com/users";
    JSONrequest(url)
        .then(function (data) {
            let authorName = "";

            for (let i = 0; i < data.length; i += 3) {
                let content = "";
                for (let j = i; j < i + 3 & j < data.length; j++) {
                    content += `<th>${data[j].name}</th>`;
                }
                authorName += `<tr>${content}</tr>`;
            }
            tbody.innerHTML = authorName;
        })
        .catch(function (error) {
            console.error("Error: " + error);
        });
}

function info(e) {
    let target = e.target;
    const url = "https://jsonplaceholder.typicode.com/users";

    JSONrequest(url)
        .then(function (data) {
            let user = null;
            data.map(el => {
                if (target.textContent === el.name) {
                    user = el;
                    let buttonShowInfo = document.createElement("button");
                    buttonShowInfo.id = "buttonShowInfo";
                    buttonShowInfo.textContent = "Show posts";
                    buttonShowInfo.classList = "action-btn";
                    let userId = el.id;
                    let name = "<tr><th>Name:</th>" + "<th>" + user.name + "</th>";
                    let username = "<tr><th>Username:</th>" + "<th>" + user.username + "</th>";
                    let address = "<tr><th>Name:</th>" + "<th>" + user.address.city + ", " + user.addressstreet + "</th>";
                    let email = "<tr><th>Email:</th>" + "<th>" + user.email + "</th>";
                    let phone = "<tr><th>Phone:</th>" + "<th>" + user.phone + "</th>";
                    let website = "<tr><th>Website:</th>" + "<th>" + user.website + "</th>";

                    let infoTable = "<h3>User info:</h3>" + "<table>" + `${name}${username}${address}${email}${phone}${website}` + "</table>";
                    div.innerHTML = infoTable;
                    div.appendChild(buttonShowInfo);

                    divPosts.innerHTML = "";

                    buttonShowInfo.addEventListener("click", () => {
                        const url = "https://jsonplaceholder.typicode.com/posts?";
                        const params = `userId=${userId}`;
                        JSONrequest(url + params)
                            .then(function (data) {
                                let userPosts = "";

                                for (let i = 0; i < data.length; i += 2) {
                                    let content = "";
                                    for (let j = i; j < i + 2 & j < data.length; j++) {
                                        content += 
                                            `<th>
                                            <h3>
                                            ${data[j].title}
                                            </h3>
                                            ${data[j].body}
                                            </th>`;
                                    }
                                    userPosts += `<tr>${content}</tr>`;
                                }
                                divPosts.innerHTML = "<h3>User's posts:</h3>" + "<table>" + `${userPosts}` + "</table>";
                            })
                            .catch(function (error) {
                                console.error("Error: " + error);
                            });
                    });
                }
            });
        })
        .catch(function (error) {
            console.error("Error: " + error);
        });
}

document.addEventListener("DOMContentLoaded", addAuthors);
tbody.addEventListener("click", info);