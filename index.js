// NAVBAR FUNCTIONS 
// toggle all collapsible elements 
function toggleCollapse( elm ){
    // toggle active on clicked btn 
    elm.classList.toggle("active");
    // toggle collapsible class
    let targetElm = document.getElementById( elm.dataset.target );
    targetElm.classList.toggle( elm.dataset.key )
}


// change filter parameters
function selectUserData(elm){
    //get all navBtn2 elements
    let navElm = document.getElementsByClassName("navBtn2");
    let navSub = Array.prototype.slice.call( navElm );
    //toggle all active elements, active selected element
    navSub.forEach(btn => {
        if( btn != elm ){
            btn.classList.remove("active");
        } else {
            if ( !btn.classList.contains("active") ) btn.classList.add("active");
        }
    });
}