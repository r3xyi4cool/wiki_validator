console.log("Script connected!");
let currentArticle = "";
let categoryName = "";
let yesArticles = [];
let noArticles = [];

async function loadCategory(params) {
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
}

function loadArticle(title){
    currentArticle = title;
    frame.src = 
    `https://en.m.wikipedia.org/wiki/${encodeURIComponent(title)}`;
}

function markYes(){

}
function markNo(){

}

function copy(){
    const data = 
    `Category: ${categoryName}
    Yes - [${yesArticles.join(", ")}]
    No - [${noArticles.join(", ")}]
    `;
    navigator.clipboard.writeText(data).then(()=> {console.log("Copied")}).catch(err => {console.error("Err : ",err)});
}