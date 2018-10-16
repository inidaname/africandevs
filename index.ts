// var gh = new GitHub({
//     token: 'b4eff74db53c9f3279ab41df31aafc90a8fdc9cc'
//   });


//   const podcast = gh.getRepo('inidaname', 'podcast');

//   podcast.getContributors()
//   console.log(podcast.getCollaborators())

let broadcast: Array<string>;
let frequency: Array<string>;

const myRequest = new Request('./data/people.json');

let categories: Promise<Array<any>> = new Promise((resolve: any, reject:any) => {
    fetch(myRequest)
        .then(function (response:Response) {
            return response.json();
        })
        .then(function (response: any[]) {
            let newCategory: any = [];
            let finalCategory: any = [];
            response.map((obj: any) => {
                let cat = obj.stack.split(',').map((v: string) => v.trim().toLowerCase());
                    newCategory.push(...cat);
            });

            newCategory.map((v:string) => {
                if (v.length !== 0 && finalCategory.indexOf(v) < 0){
                    finalCategory.push(v);
                }
            });

            let podCastList: Array<any> = [finalCategory];

            if(podCastList){
                return resolve({podCastList, response});
            } else {
                return reject('Empty Pod cast')
            }
        });
});

categories.then((res: any) => {
    let re = res.podCastList;

    //pupolating categories
    let category: Node = document.createElement('ul')
        re[0].map((v: any, i: number) => {
            let theChildren = document.createElement('li')
            theChildren.appendChild(document.createTextNode(v.toUpperCase()));
            theChildren.setAttribute('class', 'subMenu');
            theChildren.addEventListener('click', (event) => {
                console.log(event)
            })
            return category.appendChild(theChildren);
        }).join(' ')
        let cat: any = document.getElementById('category');
        cat.appendChild(category);

    const contents: Array<object> = res.response;
    let podcastEl: HTMLUListElement = document.createElement('ul');
    podcastEl.classList.add('podcast')
    contents.map((v: any, i: number) => {
        console.log(v);
        
        let mainURL = (v.url !== undefined && v.url.substring(0, 4) !== 'http')? `http://${v.url}` : v.url;
        let listBe = `
        <a href="${mainURL}" target="_blank">
            <li class="podList">
                <div>
                    <h3> ${v.name} </h3>
                    <img src="${v.logo}" alt="${v.name}">
                    <ul>
                        <li>
                            <strong>Country of Resident:</strong> <br> ${v.country}
                        </li>
                        <li>
                            <strong>Origin Country:</strong> <br> ${v.resident}
                        </li>
                        <li>
                            <span><strong>Gender:</strong>${v.gender}</span>
                        </li>
                        <li>
                            <strong>Stack:</strong> <br> ${v.stack}
                        </li>
                        <li>
                            <strong>Profession:</strong> <br> ${v.profession}
                        </li>
                    </ul>
                </div>
            </li>
        </a>
        `
        return podcastEl.append(document.createRange().createContextualFragment(listBe));
    }).join(' ');
    let mainList: any = document.getElementById('mainList');
    mainList.appendChild(podcastEl);
})

const listMenu: NodeListOf<Element> = document.querySelectorAll('#sideContent li');
let nullMe: boolean;
let listTrig: boolean;
listMenu.forEach((el: Element) => {
    el.addEventListener('click', (ev: any) => {
        listMenu.forEach((e: any) => {
            if (e.getAttribute('id') !== ev.target.attributes.getNamedItem('id').value) {
                    e.style.opacity = '0';
                    e.children[0].style.opacity = '0';
                    e.children[0].style.height = '0px';
                    e.children[0].style.overFlow = 'none';
                    e.classList.remove('checkMe');
            } else {
                if (e.classList.contains('checkMe')) {
                    e.classList.remove('checkMe');
                    el.style.opacity = '1';
                    e.children[0].style.opacity = '0';
                    e.children[0].style.overFlow = 'none';
                    e.children[0].style.height = '0px';
                } else {
                    e.classList.add('checkMe');
                    e.style.opacity = '1';
                    e.children[0].style.opacity = '1';
                    e.children[0].style.height = '400px';
                    e.children[0].style.overFlow = 'block';
                }
            }
        })
    })
})

// open nav effect
 function openNav(): void {
     console.log();
    //  if (!document.body.classList.contains('menuMoved')) {
    //     document.body.classList.add('menuMoved');
    //     let sideBar: any = document.getElementById('sideBar');
    //     sideBar.style.width = "300px";
    //     let main: any = document.getElementById('main');
    //     main.style.marginLeft = "300px";
    //     main.style.width = "calc(100% - 300px)"
    //  } else {
    //     let sideBar: any = document.getElementById('sideBar');
    //     sideBar.style.width = "0px";
    //     let main: any = document.getElementById('main');
    //     main.style.marginLeft = "0px";
    //     main.style.width = "100%";
    //     document.body.classList.remove('menuMoved');
    // }
 }
