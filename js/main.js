const form = document.querySelector('#form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');

// --- carregar tarefas salvas ao abrir ---
document.addEventListener("DOMContentLoaded", carregarTarefas);

function carregarTarefas() {
    const saved = localStorage.getItem("salve"); // pega do localStorage
    if (saved) {
        JSON.parse(saved).forEach(tarefas => addTexto(tarefas.text, tarefas.completed));
    }
};

form.addEventListener("submit", evento => {
    evento.preventDefault();
    const text = input.value.trim(); // remove os espaços
    if (text !== "") {               // confere se alguém digitou algo
        addTexto(text);
        input.value = "";            // limpa 
        salveLocalStore();           // salva no localStorage
    }
});

// --- função para adicionar tarefas ---
function addTexto(text, completed = false) { // recebe completed
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = text;

    if (completed) li.classList.add("completado"); // marca como concluída se necessário

    const deletar = document.createElement('span');
    deletar.textContent = "X";
    deletar.className = 'delete-btn';

    // deletar tarefa
    deletar.addEventListener('click', () => {
        li.remove();
        salveLocalStore();    // salva após remover
    });

    // marcar como completada
    li.addEventListener('click', e => {
        if (e.target !== deletar) {
            li.classList.toggle("completado");   // liga e desliga
            salveLocalStore();                    // salva após marcar/desmarcar
        }
    });

    li.appendChild(deletar);
    list.appendChild(li);
};

// --- função para salvar tarefas no localStorage ---
function salveLocalStore() {
    const salve = [];

    list.querySelectorAll('li').forEach(li => {
        salve.push({
            text: li.childNodes[0].nodeValue.trim(), // texto da tarefa
            completed: li.classList.contains("completado") // se está concluída ou não
        });
    });

    localStorage.setItem("salve", JSON.stringify(salve));
}
