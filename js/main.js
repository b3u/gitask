const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
}

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

document.getElementById('addTask').addEventListener("click", () => addTask("Text goes here"))

const addTask = (text) => {
    const id = generateId();
    const ul = document.getElementById("tasklist");
    const contents = `
        <input type="checkbox" name="c_${id}" id="c_${id}"/>
        <label for="c_${id}">${text}</label>`;
    let li = document.createElement("li");
    li.innerHTML = contents;

    ul.appendChild(li);
}
