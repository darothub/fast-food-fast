const showSignUp=()=>{
    let form2 = document.getElementById("form-wrap2")
    let form1 = document.getElementById("form-wrap1")
    if(form2.style.display === "block"){
        form2.style.display = "none"
        form1.style.display = "block"
        return false
    }
    form2.style.display = "block";
    form1.style.display = "none"
    return false
}

const showLogin=()=>{
    let form2 = document.getElementById("form-wrap2")
    let form1 = document.getElementById("form-wrap1")
    if(form1.style.display === "block"){
        form1.style.display = "none"
        form2.style.display = "block"
        return false
    }
    form1.style.display = "block";
    form2.style.display = "none"
    return false
}