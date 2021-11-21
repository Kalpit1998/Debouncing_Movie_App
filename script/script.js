// ======================================================================
// fetching data from API
// ======================================================================


function search(val){


    if(val == ''){
        document.getElementById("search").style.display="none";
        return;
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=62f9c457a57a9fcb72e64ad3850b51ef&language=en-US&page=1&include_adult=false&query=${val}`)

    .then((res)=>{
        return res.json();
    })
    .then((res)=>{
        // console.log(res.results);

        showData(res.results);
    })
    .catch((err)=>{
        console.log(err);
    })
}

// ======================================================================
// Appending data to DOM
// ======================================================================


function showData(items){

    let container = document.getElementById("search");

    if(items.length === 0){
        container.style.display = "none";
    }
    else{
        container.style.display = "flex"
    }

    container.innerHTML = null;

    items.forEach((item)=>{

        container.scrollTop = 0;

        let div = document.createElement("div");

        div.setAttribute("class","item-wrapper");

        div.onclick = ()=>{
            showDetail(item);
        }

        let poster = document.createElement("img");

        poster.src = "https://image.tmdb.org/t/p/w500/" + item.poster_path;

        let text_div = document.createElement("div");

        text_div.setAttribute("class", "text_div");

        let name = document.createElement("p");

        name.innerText = item.title;

        let language = document.createElement("p");

        language.innerText = item.original_language;

        text_div.append(name, language)

        div.append(poster, text_div);

        container.append(div);
    })
}


// ======================================================================
// debouncing function
// ======================================================================

let interval;


function main(){

    let val = document.getElementById("form1").value;
    
    if(interval){
        clearInterval(interval);
    }

    interval = setTimeout(() => {
        search(val);
    }, 1000); 
}

// ======================================================================
// showing movie detail
// ======================================================================

let detail_parent = document.getElementById("search_box");


function showDetail(item){
    // console.log(item)

    detail_parent.innerHTML = null;

    document.getElementById("form1").value = "";

    document.getElementById("search").style.display = "none";

    let img_div = document.createElement("div");

    let poster = document.createElement("img");

    poster.src = "https://image.tmdb.org/t/p/w500/" + item.poster_path;

    img_div.append(poster);

    let text_div = document.createElement("div");

    let title = document.createElement("h1");

    title.innerText = item.title;

    let overview = document.createElement("p");

    overview.innerText = " " + item.overview;

    let rating = document.createElement("p");

    rating.innerText = " " + item.vote_average;

    let language = document.createElement("p");

    language.innerText = " " + item.original_language;

    text_div.append(title, overview, rating, language);

    detail_parent.append(img_div,text_div)
}