let arrow = document.getElementById("arrow")
let landingPageLink = document.getElementById("landP");
let orderPageLink = document.getElementById("orderP");

const showDiv=()=>{
    let listEdit = document.getElementsByClassName("list-details-wrapper-edit");
    let listheader = document.getElementById("listheader");
    for(let i=0; i<listEdit.length; i++){
        if (listEdit[1].style.display === "grid"){
            listEdit[0].style.display = "none";
          } else {
            listEdit[0].style.display = "grid";
            listEdit[1].style.display = "none";
        }
    }

}

const showOrderDiv=()=>{
    let listEdit = document.getElementsByClassName("list-details-wrapper-edit");
    let listheader = document.getElementById("listheader");
    for(let i=0; i<listEdit.length; i++){
        if (listEdit[0].style.display === "grid"){
            listEdit[1].style.display = "none";
          } else {
            listEdit[1].style.display = "grid";
            listEdit[0].style.display = "none";
        }
    }

}



arrow.addEventListener('click', (e)=>{
    
    let sidebar = document.getElementById("sidebar")

    if(sidebar.style.display === "block"){
        sidebar.style.display = "none"
        return false
    }
    sidebar.style.display = "block";
    e.preventDefault()
});

const myChecked=()=> {
    let checkBox = document.getElementsByClassName("myCheck");
    let text = document.getElementsByClassName("text");
    for(let i=0; i<checkBox.length; i++){
        if (checkBox[i].checked === true){
            text[i].style.display = "block";
          } else {
            text[i].style.display = "none";
        }
    }
   
}