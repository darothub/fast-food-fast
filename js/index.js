let arrow = document.getElementById("arrow")
let signUp = document.getElementById("signuplink")


arrow.addEventListener('click', (e)=>{
    
    let sidebar = document.getElementById("sidebar")

    if(sidebar.style.display === "block"){
        sidebar.style.display = "none"
        return false
    }
    sidebar.style.display = "block";
    e.preventDefault()
});

signUp.addEventListener('click', (e)=>{
    let signUpForm = document.getElementById("signupform")
    let bannerDiv = document.getElementById("image")

    if(signUpForm.style.display === "block"){
        bannerDiv.style.display = "none"
        return false
    }
    bannerDiv.style.display = "none";
    signUpForm.style.display = "block"
    e.preventDefault()
});

