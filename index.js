"use strict";
var broadcast;
var frequency;
var myRequest = new Request('./data/people.json');
var categories = new Promise(function (resolve, reject) {
    fetch(myRequest)
        .then(function (response) {
        return response.json();
    })
        .then(function (response) {
        var newCategory = [];
        var finalCategory = [];
        response.map(function (obj) {
            var cat = obj.stack.split(',').map(function (v) { return v.trim().toLowerCase(); });
            newCategory.push.apply(newCategory, cat);
        });
        newCategory.map(function (v) {
            if (v.length !== 0 && finalCategory.indexOf(v) < 0) {
                finalCategory.push(v);
            }
        });
        var podCastList = [finalCategory];
        if (podCastList) {
            return resolve({ podCastList: podCastList, response: response });
        }
        else {
            return reject('Empty Pod cast');
        }
    });
});
categories.then(function (res) {
    var re = res.podCastList;
    var category = document.createElement('ul');
    re[0].map(function (v, i) {
        var theChildren = document.createElement('li');
        theChildren.appendChild(document.createTextNode(v.toUpperCase()));
        theChildren.setAttribute('class', 'subMenu');
        theChildren.addEventListener('click', function (event) {
            console.log(event);
        });
        return category.appendChild(theChildren);
    }).join(' ');
    var cat = document.getElementById('category');
    cat.appendChild(category);
    var contents = res.response;
    var podcastEl = document.createElement('ul');
    podcastEl.classList.add('podcast');
    contents.map(function (v, i) {
        var mainURL = (v.url !== undefined && v.url.substring(0, 4) !== 'http') ? "http://" + v.url : v.url;
        var listBe = "\n        <a href=\"" + mainURL + "\" target=\"_blank\">\n            <li class=\"podList\">\n                <div>\n                    <h3> " + v.name + " </h3>\n                    <img src=\"" + v.logo + "\" alt=\"" + v.name + "\">\n                    <ul>\n                        <li>\n                            <strong>Country of Resident:</strong> <br> " + v.country + "\n                        </li>\n                        <li>\n                            <strong>Origin Country:</strong> <br> " + v.resident + "\n                        </li>\n                        <li>\n                            <span><strong>Gender:</strong>" + v.gender + "</span>\n                        </li>\n                        <li>\n                            <strong>Stack:</strong> <br> " + v.stack + "\n                        </li>\n                        <li>\n                            <strong>Profession:</strong> <br> " + v.profession + "\n                        </li>\n                    </ul>\n                </div>\n            </li>\n        </a>\n        ";
        return podcastEl.append(document.createRange().createContextualFragment(listBe));
    }).join(' ');
    var mainList = document.getElementById('mainList');
    mainList.appendChild(podcastEl);
});
var listMenu = document.querySelectorAll('#sideContent li');
var nullMe;
var listTrig;
listMenu.forEach(function (el) {
    el.addEventListener('click', function (ev) {
        listMenu.forEach(function (e) {
            if (e.getAttribute('id') !== ev.target.attributes.getNamedItem('id').value) {
                e.style.opacity = '0';
                e.children[0].style.opacity = '0';
                e.children[0].style.height = '0px';
                e.children[0].style.overFlow = 'none';
                e.classList.remove('checkMe');
            }
            else {
                if (e.classList.contains('checkMe')) {
                    e.classList.remove('checkMe');
                    el.style.opacity = '1';
                    e.children[0].style.opacity = '0';
                    e.children[0].style.overFlow = 'none';
                    e.children[0].style.height = '0px';
                }
                else {
                    e.classList.add('checkMe');
                    e.style.opacity = '1';
                    e.children[0].style.opacity = '1';
                    e.children[0].style.height = '400px';
                    e.children[0].style.overFlow = 'block';
                }
            }
        });
    });
});
function openNav() {
    console.log();
}
