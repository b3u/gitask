// Util
const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
}

// About
const toggleAbout = (ev) => {
    ev.stopPropagation(); // Stop event firing twice when users clicks inside the dialog
    if(ev.target.dataset.trigger === "aboutDialog") {
        let d = document.getElementById("aboutDialog");
        
        if(d.classList.contains("c-is-dialog-hidden")) {
            d.classList.remove("c-is-dialog-hidden")
        } else {
            d.classList.add("c-is-dialog-hidden")
        }
    }
}

document.querySelectorAll("[data-trigger=aboutDialog]").forEach(el => {
    el.addEventListener("click", toggleAbout);
})


const handleAdd = () => {
    const id = "task_" + generateId();
    const ul = document.getElementById("tasklist");
    
    let li = document.getElementById("taskitem").content.cloneNode(true);
    li.firstElementChild.dataset.id = id;
    
    let input = li.querySelector("input");
    input.name = id;
    input.id = id;
    
    let label = li.querySelector("label");
    label.addEventListener("blur", () => {label.contentEditable = false})
    label.addEventListener("keydown", evt => {
        if(evt.code == 'Enter') {
            evt.preventDefault();
            label.blur();
            label.contentEditable = false;
        }
    })
    
    let btnEdit = li.querySelector(".c-js-btn--edit");
    btnEdit.addEventListener("click", () => handleEdit(id));
    
    let btnRemove = li.querySelector(".c-js-btn--remove");
    btnRemove.addEventListener("click", () => handleRemove(id));
    
    ul.appendChild(li);
}

const handleRemove = id => {
    document.querySelector(`[data-id=${id}]`).remove();
}

const handleEdit = id => {
    let label = document.querySelector(`[data-id=${id}] label`);
    label.contentEditable = true;
    label.focus();
}

document.getElementById('addTask').addEventListener("click", handleAdd)