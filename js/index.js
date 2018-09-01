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