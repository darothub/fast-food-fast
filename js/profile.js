let arrow = document.getElementById("arrow")

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