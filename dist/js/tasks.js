class TasksClass {
    constructor(id, title, category) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.completed = false;
    }
    markCompleted() {
        this.completed = !this.completed;
        if (this.completed) {
            this.dateConclusion = new Date();
        }
        else {
            this.dateConclusion = undefined;
        }
    }
}
let TasksList = [
    new TasksClass(1, "Estudar TypeScript", 'Estudo'),
    new TasksClass(2, "Fazer Exercícios", 'Pessoal'),
    new TasksClass(3, "Revisar Código", 'Trabalho')
];
const categorySelect = document.getElementById('categorySelect');
const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("list");
const contador = document.getElementById("counterTasks");
const taskError = document.getElementById("taskError");
export function renderTasks(tasks = TasksList) {
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = task.title;
        span.classList.add('task-title');
        if (task.completed) {
            span.classList.add("concluida");
        }
        const badge = document.createElement("span");
        badge.textContent = task.category;
        badge.classList.add("badge", task.category.toLowerCase());
        const titleRow = document.createElement("div");
        titleRow.classList.add('title-row');
        titleRow.appendChild(span); // agora podemos usar span
        titleRow.appendChild(badge);
        const textContainer = document.createElement("div");
        textContainer.appendChild(titleRow);
        if (task.completed && task.dateConclusion) {
            const small = document.createElement("small");
            small.textContent = `Concluída em: ${formatData(task.dateConclusion)}`;
            small.style.fontStyle = 'italic';
            textContainer.appendChild(small);
        }
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('actions-container');
        const bntCompleted = document.createElement('button');
        bntCompleted.classList.remove('bnt-done', 'bnt-undone');
        if (task.completed) {
            bntCompleted.textContent = 'Desfazer';
            bntCompleted.classList.add('btn-undone'); // classe rosa claro
        }
        else {
            bntCompleted.textContent = 'Concluir';
            bntCompleted.classList.add('btn-done'); // classe verde claro
        }
        bntCompleted.onclick = () => {
            task.markCompleted();
            renderTasks();
        };
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn-edit");
        btnEditar.onclick = () => openEditModal(task);
        const btnRemove = document.createElement("button");
        btnRemove.textContent = "Remover";
        btnRemove.classList.add("btn-remove");
        btnRemove.innerHTML = '<i class="bi bi-trash3"></i>';
        btnRemove.onclick = () => {
            TasksList = TasksList.filter(t => t.id !== task.id);
            renderTasks();
        };
        actionsContainer.appendChild(bntCompleted);
        actionsContainer.appendChild(btnEditar);
        actionsContainer.appendChild(btnRemove);
        li.appendChild(textContainer);
        li.appendChild(actionsContainer);
        list.appendChild(li);
    });
    const pending = tasks.filter(t => !t.completed);
    contador.textContent = `Tarefas pendentes: ${pending.length}`;
    const hasCompleted = tasks.some(task => task.completed);
    clearCompleted.style.display = hasCompleted ? 'inline-block' : 'none';
}
let errorTimeout;
button.addEventListener("click", () => {
    const text = input.value;
    if (text.length < 3) {
        taskError.textContent = "O título da tarefa deve ter pelo menos 3 caracteres.";
        taskError.classList.add("show");
        clearTimeout(errorTimeout);
        errorTimeout = window.setTimeout(() => {
            taskError.classList.remove("show");
        }, 3000);
        return;
    }
    taskError.textContent = "";
    const category = categorySelect.value;
    const newTask = new TasksClass(Date.now(), text, category);
    TasksList.push(newTask);
    input.value = "";
    renderTasks();
});
function formatData(data) {
    return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
}
const orderName = document.getElementById('orderNameTask');
orderName.addEventListener('click', () => {
    TasksList.sort((a, b) => a.title.localeCompare(b.title));
    renderTasks();
});
const clearCompleted = document.getElementById('clearCompleted');
clearCompleted.addEventListener('click', () => {
    TasksList = TasksList.filter(task => !task.completed);
    renderTasks();
});
const searchInput = document.getElementById('searchTask');
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    // Filtra as tarefas pelo título
    const filteredTasks = TasksList.filter(task => task.title.toLowerCase().includes(query));
    renderTasks(filteredTasks);
});
const categoryDropdownBtn = document.getElementById('categoryDropdownBtn');
const categoryDropdownMenu = document.getElementById('categoryDropdownMenu');
let activeCategory = 'All';
// Toggle do menu
categoryDropdownBtn.addEventListener('click', () => {
    categoryDropdownMenu.style.display = categoryDropdownMenu.style.display === 'block' ? 'none' : 'block';
});
// Fecha o menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!categoryDropdownBtn.contains(e.target) && !categoryDropdownMenu.contains(e.target)) {
        categoryDropdownMenu.style.display = 'none';
    }
});
// Seleção de categoria
categoryDropdownMenu.addEventListener('click', (e) => {
    const target = e.target;
    const category = target.dataset.category;
    if (!category)
        return;
    activeCategory = category;
    categoryDropdownBtn.innerHTML = `<i class="bi bi-funnel"></i>  ${category}  <i class="bi bi-chevron-down"></i>`;
    // Filtra tarefas
    const filteredTasks = activeCategory === 'All'
        ? TasksList
        : TasksList.filter(task => task.category === activeCategory);
    renderTasks(filteredTasks);
    // Fecha o menu
    categoryDropdownMenu.style.display = 'none';
});
const editTaskModal = document.getElementById('editTaskModal');
const editTaskInput = document.getElementById('editTaskInput');
const editTaskCategory = document.getElementById('editTaskCategory');
const saveEditTaskBtn = document.getElementById('saveEditTaskBtn');
const closeModalBtn = document.getElementById('closeEditTaskModal');
let taskBeingEdited = null;
// Abre o modal
function openEditModal(task) {
    taskBeingEdited = task;
    editTaskInput.value = task.title;
    editTaskCategory.value = task.category;
    editTaskModal.classList.add('show');
}
// Fecha o modal
function closeEditModal() {
    editTaskModal.classList.remove('show');
}
// Fecha ao clicar no X
closeModalBtn.onclick = closeEditModal;
// Fecha ao clicar fora do conteúdo
window.onclick = function (event) {
    if (event.target === editTaskModal) {
        closeEditModal();
    }
};
// Salvar alterações
saveEditTaskBtn.onclick = () => {
    if (taskBeingEdited) {
        const newTitle = editTaskInput.value.trim();
        if (newTitle.length > 0)
            taskBeingEdited.title = newTitle;
        taskBeingEdited.category = editTaskCategory.value;
        renderTasks();
        closeEditModal();
    }
};
renderTasks();
