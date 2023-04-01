// ecrire un text lettre par lettre

function typeWrite(element,text,speed){
   let i = 0
   const type = ()=>{
      if(i<text.length){
         element.innerHTML +=text[i];
         i++; 
         setTimeout(type,speed)
      }
   };
   type()
}
const text = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. amet consectetur adipisicing elit Aliquam incidunt accusamus in obcaecati delectus alias deserunt maiores.";
typeWrite(document.querySelector(".target"),text,50);

//********************************************************************************
//check if There's local storage color option
let mainColors = localStorage.getItem("color_option")
if(mainColors!==null){
   document.documentElement.style.setProperty("--main-color",mainColors)  
   // check for Active Class 
   document.querySelectorAll(".colors-list li").forEach((li)=>{

      li.classList.remove("active")

      // ADD active classe on Element with Data-color 
      if(li.dataset.color === mainColors){
         //add active classe
         li.classList.add("active")
      }
   })
}
//********************************************* */

//background Random?

// Random Background option 
let backgroundoption = true;
//variable To control  The Interval
let backgroundInterval ;



//check if There's local storage bg option
let bgLocalItems = localStorage.getItem("background_option");
if(bgLocalItems!==null){
   // check for Active Class
   if(bgLocalItems==='true'){

      backgroundoption = true;
      document.querySelector(".no").classList.remove("active")
      document.querySelector(".yes").classList.add("active")


   }else{
      document.querySelector(".no").classList.add("active")
      document.querySelector(".yes").classList.remove("active")

      backgroundoption = false;

   }
   
}

let  spanRandom =  document.querySelectorAll(".random-background span")

spanRandom.forEach((span)=>{
   // click on every Span
   span.addEventListener("click",(e)=>{
      //remove Class ACtive From All Span

      e.target.parentElement.querySelectorAll(".active").forEach((element)=>{
         element.classList.remove("active")
      })
      e.target.classList.add("active")
      if(e.target.dataset.background ==='yes'){
         backgroundoption = true;
         randomaizeImgs()
         localStorage.setItem("background_option",true)

      }else{
         backgroundoption = false;
         clearInterval(backgroundInterval)
         window.localStorage.setItem("background_option",false)

      }
   })

})


randomaizeImgs()



//toggle Spin class on Icon
let settingSection = document.querySelector(".settings-box");

let settingbut = document.querySelector(".toggle-settings .fa-gear");

settingbut.onclick =(e)=> {
   e.stopPropagation()
   e.target.classList.toggle("fa-spin");
   settingSection.classList.toggle("open");
}
//remove classes(Settings) If on click in Page



// click Anywhere outSIDe Menu Toggle Button 

document.addEventListener("click",(e)=>{

   if(e.target!==settingbut && e.target!==settingSection){
   settingSection.classList.remove("open")
   settingbut.classList.remove("fa-spin")

   }
})
settingSection.onclick = (e)=>{
   e.stopPropagation()
}



//Switch color
const colorsLi = document.querySelectorAll(".colors-list li")
colorsLi.forEach((li)=>{
   // click on every list items 
   li.addEventListener("click", (e)=>{
      // set color In Root 
      document.documentElement.style.setProperty("--main-color",e.target.dataset.color) 
      localStorage.setItem("color_option",e.target.dataset.color)

      //remove Active class from All children
      colorsLi.forEach((liRemove)=>{
         liRemove.classList.remove("active")
      })
      // add active class on Self 
      e.target.classList.add("active")
   })
})


//landing random Background Image

let landingPage = document.querySelector(".landing-page")
//Array of Images
let images = ["img0.jpg","img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg"]

function randomaizeImgs(){
   
   if(backgroundoption==true){

      backgroundInterval = setInterval(()=>{
         let random = Math.floor(Math.random() * images.length)
         landingPage.style.backgroundImage = `url("img/${images[random]}")`
         localStorage.setItem("image",images[random])
      },10000)
   }
}


//Select SKills Selectors  !important...
let ourskills = document.querySelector(".skills")

window.onscroll = function(){
   //skills Offset Top
   let skillsOFsetTop =ourskills.offsetTop; //height total - offsetheight

   //outer height 
   let skillsOuterHeight = ourskills.offsetHeight; //height of Skills

   // window height 
   let windoHeight = this.innerHeight;  //height of the Window

   // window scroll top 
   let windowScrollTop = this.pageYOffset;

   if(windowScrollTop > (skillsOuterHeight + skillsOFsetTop - windoHeight)){
      let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
      allSkills.forEach((skill) => {
         skill.style.width = skill.dataset.progress;
      })
   }
}

// Create pop-up with the  Image 

let ourgallery = document.querySelectorAll(".gallery img")

ourgallery.forEach((img)=>{

   img.addEventListener("click",(e)=>{

      // Create Overlay Element
      let overlay = document.createElement("div");
      
      //add class to everlay
      overlay.classList.add("popup-overlay");

      //append overlay to body
      document.body.appendChild(overlay);

      //Create The Pop-up box
      let popupBox = document.createElement("div")

      // add class to the popup box 
      popupBox.classList.add("popup-box")

      // Create Image 
      let popupImage = document.createElement("img");

      // set image source 
      popupImage.src = img.src;

      //Create title for the Popup      
      if(img.alt !==null){

         //Create Heading
         let imgHeading = document.createElement("h3")

         //create Text  For Heading
         let textHeading = document.createTextNode(img.alt)

         //append The Text To The Heading
         imgHeading.appendChild(textHeading)

         // append the heading to the popup box 
         popupBox.appendChild(imgHeading)

      }

      // add to popup box 
      popupBox.appendChild(popupImage)

      // append the popup box to body 
      document.body.appendChild(popupBox)

      //Create The Close Span
      let closebutton = document.createElement("span")

      //Create The Text Close Span
      let closebuttontext = document.createTextNode("X")

      // append The Text Close  to The Close Span
      closebutton.appendChild(closebuttontext)

      // add class To Close button 
      closebutton.classList.add("close-button")
      console.log(closebutton)

      // add the Close button  to popup box
      popupBox.appendChild(closebutton)

   })

})

// close Popup 
document.addEventListener("click",function(e){
if(e.target.className =="close-button"){

   //remove The Current Popup
   e.target.parentElement.remove()

   //remove OVerlay
   document.querySelector(".popup-overlay").remove();
}
})



// Select All Bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet")
scrolltoSomewhere(allBullets)

// Select All links 
const alllinks = document.querySelectorAll(".links li")
scrolltoSomewhere(alllinks)






function scrolltoSomewhere(elements){

elements.forEach((element) =>{
      element.addEventListener("click",(e)=>{
      e.preventDefault()
   //scroll for section
   document.querySelector(e.target.dataset.section).scrollIntoView({  
      behavior:"smooth"
   })
})
})
}

let bulletspan = document.querySelectorAll(".bullets-option span")

let bulletscontiner = document.querySelector(".nav-bullets")

let bulletlocal = localStorage.getItem("bullets_option")
if(bulletlocal !==null){

   bulletspan.forEach(span =>{
      span.classList.remove("active")
   });

   if(bulletlocal ==="block"){
      bulletscontiner.style.display = "block"


      document.querySelector(".bullets-option span.yes").classList.add("active")


   }else{
      bulletscontiner.style.display = "none"
      document.querySelector(".bullets-option span.no").classList.add("active")
   }

}


bulletspan.forEach((span)=>{

   span.addEventListener("click",(e)=>{

      if(span.dataset.display === "show"){
         bulletscontiner.style.display = "block"
         localStorage.setItem("bullets_option","block")
      }else{
         bulletscontiner.style.display = "none"
         localStorage.setItem("bullets_option","none")

      }
      bulletspan.forEach((sp)=>{
         sp.classList.remove("active")
      })
      // add active class on Self 
      e.target.classList.add("active")
   })

})


//reset Button
document.querySelector(".reset-options").onclick = ()=>{
   // if local storage has Item in localStorage  Not include in Setting section

   localStorage.removeItem("bullets_option")
   localStorage.removeItem("color_option")
   localStorage.removeItem("background_option")
   //relaod Window
   window.location.reload()
   
   // localStorage.clear();

}

//toggle menu

let toggleBtn = document.querySelector(".toggle-menu")

let tlinks = document.querySelector(".links")

toggleBtn.onclick = function(e){
   // stop Propagation 
   e.stopPropagation()
   //toggle class "menu-active" on links
   this.classList.toggle("menu-active")

   // toggle class "open" on links
   tlinks.classList.toggle("open")
}

// click Anywhere outSIDe Menu Toggle Button 

document.addEventListener("click",(e)=>{

   if(e.target!==toggleBtn && e.target!==tlinks){
   tlinks.classList.remove("open")
   toggleBtn.classList.remove("menu-active")

   }
})
// stop propagation on menu !!!!!! important
tlinks.onclick = (e)=>{
e.stopPropagation() // stop events on tlinks and his children
}