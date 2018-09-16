// let foodLink = document.getElementsByClassName("foodlink")
let close = document.getElementById("close")

const orderPopUp=()=>{
    let orderpop = document.getElementById("orderpop")
    if(orderpop.style.display === "block"){
        orderpop.style.display = "none"
        return false
    }
    orderpop.style.display = "block";
    return false
}

// foodLink[0].addEventListener("click", (e)=>{
//     let orderpop = document.getElementById("orderpop")
//     if(orderpop.style.display === "block"){
//         orderpop.style.display = "none"
//         return false
//     }
//     orderpop.style.display = "block";
//     e.preventDefault()
// })

close.addEventListener("click", (e)=>{
    let orderpop = document.getElementById("orderpop")
    orderpop.style.display = "none";
    e.preventDefault()
})