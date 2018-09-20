let arrow = document.getElementById("arrow")
let landingPageLink = document.getElementById("landP");
let orderPageLink = document.getElementById("orderP");

const showDiv=()=>{
    let listEdit = document.getElementById("page-edit1")
    let listhead1 = document.getElementById("listhed1")
        if (listEdit.style.display === "grid" && listhead1.style.display === "block"){
            listEdit.style.display = "none";
            listhead1.style.display = "none"
          } else {
            listEdit.style.display = "grid";
            listhead1.style.display = "block"
            
        }
    

}


const showOrderDiv=()=>{
    let listEdit = document.getElementsByClassName("list-details-wrapper-edit");
    let listhead2 = document.getElementById("listhed2")
    for(let i=1; i<listEdit.length; i++){
        if (listEdit[1].style.display === "grid" && listhead2.style.display === "block"){
            listEdit[1].style.display = "none";
            listhead2.style.display = "none"
          } else {
            listEdit[1].style.display = "grid";
            listhead2.style.display = "block"
            
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