console.log("Script connected!");
let currentArticle = "";
let yesArticles = [];
let noArticles = [];
const articleList = document.getElementById("articleList");
const yesList = document.getElementById("yesList");
const noList = document.getElementById("noList");
const articleViewer = document.getElementById("articleViewer");

async function loadCategory() {
    articleList.innerHTML = "";
    yesList.innerHTML = "";
    noList.innerHTML = "";
    yesArticles = [];
    noArticles = [];
    
    const input = document.getElementById("categoryInput")
    const categoryName = input.value.trim();

    if(!categoryName){
        alert("Category Name not found")
        return;
    }
    const url =
    `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers` +
    `&cmtitle=Category:${encodeURIComponent(categoryName)}` +
    `&cmlimit=50&format=json&origin=*`;

    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Response was not ok");
    }
    const data = await response.json();
    data.query.categorymembers.forEach(ar => {
        let article = ar.title;
        const li = document.createElement("li");
        li.textContent = article;   
        li.onclick = () => loadArticle(article);
        articleList.appendChild(li)  
    });
}

function loadArticle(title){
    currentArticle = title;
    
    articleViewer.src = 
    `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}

function markYes(){
    if(!currentArticle || yesArticles.includes(currentArticle)) return;
    if(noArticles.includes(currentArticle)){
        noArticles = removeList(noList,noArticles,currentArticle)
    }
    yesArticles.push(currentArticle);
    addToList(yesList,currentArticle);
}
function markNo(){
    if(!currentArticle || noArticles.includes(currentArticle)) return;
    if(yesArticles.includes(currentArticle)){
       yesArticles = removeList(yesList,yesArticles,currentArticle)
    }
    noArticles.push(currentArticle);
    addToList(noList,currentArticle);
}

function addToList(list, title) {
  const li = document.createElement("li");
  li.textContent = title;
  list.appendChild(li);
}

function removeList(listelement,arr,title){
    const newArr = arr.filter(item => item !== title);
    Array.from(listelement.children).forEach(li => {
        if (li.textContent === title) {
            li.remove();
        }
    });
    return newArr;
}

function copy(){
    const criteria = document.getElementById("criteriaInput").value;
    const data = 
    `
    Criteria - ${criteria}

    Yes - [${yesArticles.join(", ")}]
    No - [${noArticles.join(", ")}]
    `;
    navigator.clipboard.writeText(data).then(()=> {console.log("Copied")}).catch(err => {console.error("Err : ",err)});
}  