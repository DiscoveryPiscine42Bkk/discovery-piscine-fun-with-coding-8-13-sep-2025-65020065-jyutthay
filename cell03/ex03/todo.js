const list = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

window.onload = () => {
    const saved = getCookie("todos");
    if (saved) {
        const todos = JSON.parse(saved);
        todos.forEach(todo => addTodo(todo, false));
    }
};

newBtn.addEventListener("click", () => {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
        addTodo(text.trim(), true);
    }
});

function addTodo(text, save) {
    const div = document.createElement("div");
    div.innerText = text;

    div.addEventListener("click", () => {
        if (confirm("Do you want to remove this TO DO?")) {
            list.removeChild(div);
            saveTodos();
        }
    });

    list.insertBefore(div, list.firstChild);

    if (save) saveTodos();
}

function saveTodos() {
    const todos = [];
    list.querySelectorAll("div").forEach(div => {
        todos.push(div.innerText);
    });
    setCookie("todos", JSON.stringify(todos), 7);
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decoded = decodeURIComponent(document.cookie);
    const ca = decoded.split(';');
    for (let c of ca) {
        c = c.trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}
