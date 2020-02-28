const toggleAbout = (ev) => {
    ev.stopPropagation(); // Stop event firing twice when users clicks inside the dialog
    if(ev.target.dataset.trigger === "aboutDialog") {
        let d = document.getElementById("aboutDialog");
        
        if(d.classList.contains("is-dialog-hidden")) {
            d.classList.remove("is-dialog-hidden")
        } else {
            d.classList.add("is-dialog-hidden")
        }
    }
}

document.querySelectorAll("[data-trigger=aboutDialog]").forEach(el => {
    el.addEventListener("click", toggleAbout);
})