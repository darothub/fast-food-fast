let close = document.getElementById("close")
let slideIndex  = 1;

const showSlide = (n) =>{

    let i;
    
    let slides = document.getElementsByClassName("slides");
    
    if (n > slides.length) { slideIndex = 1};
    
    if (n < 1) { slideIndex = slides.length};
    
    for (i=0;i<slides.length;i++) {
    
    slides[i].style.display = "none";
    
    };
    slides[slideIndex-1].style.display = "block";
}

showSlide(slideIndex);

const plusSlides = (n) =>{
    showSlide(slideIndex+=n)
}
const currentSlide = (n) =>{
    showSlide(slideIndex = n)
}


close.addEventListener("click", (e)=>{
    let menuList = document.getElementById("menu-lists")
    menuList.style.display = "none";
    e.preventDefault()
})

const showList=()=>{
    let menuList = document.getElementById("menu-lists")
    if(menuList.style.display === "block"){
        menuList.style.display = "none"
        return false
    }
    menuList.style.display = "block";
    return false
}

