
type Category = 'Trabalho' | 'Pessoal' | 'Estudo';

interface Tasks {
    id: number;
    title: string;
    completed: boolean;
    dateConclusion?: Date;
    category: Category;
}

class TasksClass implements Tasks {
    id: number;
    title: string;
    completed: boolean;
    dateConclusion?: Date;
    category: Category;

    constructor(id: number, title: string, category:Category) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.completed = false;
    }

    markCompleted() {
        this.completed = !this.completed;
        if(this.completed) {
            this.dateConclusion = new Date();
        } else {
            this.dateConclusion = undefined;
        }
    }
}

let TasksList: TasksClass[] = [
    new TasksClass(1, "Estudar TypeScript", 'Estudo'),
    new TasksClass(2, "Fazer Exercícios", 'Pessoal'),
    new TasksClass(3, "Revisar Código", 'Trabalho')
];

const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;
const input = document.getElementById("taskInput") as HTMLInputElement;
const button = document.getElementById("addBtn") as HTMLButtonElement;
const list = document.getElementById("list") as HTMLUListElement;
const contador = document.getElementById("counterTasks") as HTMLDivElement;
const taskError = document.getElementById("taskError") as HTMLSpanElement;


export function renderTasks(tasks: TasksClass[] = TasksList) {
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
        titleRow.appendChild(span);   // agora podemos usar span
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

        bntCompleted.classList.remove('bnt-done', 'bnt-undone')
        if (task.completed) {
            bntCompleted.textContent = 'Desfazer';
            bntCompleted.classList.add('btn-undone'); 
        } else {
            bntCompleted.textContent = 'Concluir';
            bntCompleted.classList.add('btn-done'); 
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

let errorTimeout: number;

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

    const category = categorySelect.value as Category;

    const newTask = new TasksClass(Date.now(), text, category);
    TasksList.push(newTask);

    input.value = "";
    renderTasks();
});

function formatData(data: Date): string {
    return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
}

const orderName = document.getElementById('orderNameTask') as HTMLButtonElement;

orderName.addEventListener('click', () => {
    TasksList.sort((a, b) => a.title.localeCompare(b.title))
    renderTasks();
});


const clearCompleted = document.getElementById('clearCompleted') as HTMLButtonElement;
clearCompleted.addEventListener('click', () => {
    TasksList = TasksList.filter(task => !task.completed);
    renderTasks();
});

const searchInput = document.getElementById('searchTask') as HTMLInputElement;

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    const filteredTasks = TasksList.filter(task => task.title.toLowerCase().includes(query));

    renderTasks(filteredTasks);
});
const categoryDropdownBtn = document.getElementById('categoryDropdownBtn') as HTMLButtonElement;
const categoryDropdownMenu = document.getElementById('categoryDropdownMenu') as HTMLDivElement;

let activeCategory: Category | 'All' = 'All';

categoryDropdownBtn.addEventListener('click', () => {
    categoryDropdownMenu.style.display = categoryDropdownMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
    if (!categoryDropdownBtn.contains(e.target as Node) && !categoryDropdownMenu.contains(e.target as Node)) {
        categoryDropdownMenu.style.display = 'none';
    }
});

categoryDropdownMenu.addEventListener('click', (e) => {
    const target = e.target as HTMLButtonElement;
    const category = target.dataset.category as Category | 'All';
    if (!category) return;

    activeCategory = category;
    categoryDropdownBtn.innerHTML = `<i class="bi bi-funnel"></i>  ${category}  <i class="bi bi-chevron-down"></i>`;

    const filteredTasks = activeCategory === 'All'
        ? TasksList
        : TasksList.filter(task => task.category === activeCategory);

    renderTasks(filteredTasks);

    categoryDropdownMenu.style.display = 'none';
});

const editTaskModal = document.getElementById('editTaskModal') as HTMLDivElement;
const editTaskInput = document.getElementById('editTaskInput') as HTMLInputElement;
const editTaskCategory = document.getElementById('editTaskCategory') as HTMLSelectElement;
const saveEditTaskBtn = document.getElementById('saveEditTaskBtn') as HTMLButtonElement;
const closeModalBtn = document.getElementById('closeEditTaskModal') as HTMLSpanElement;

let taskBeingEdited: TasksClass | null = null;

function openEditModal(task: TasksClass) {
    taskBeingEdited = task;
    editTaskInput.value = task.title;
    editTaskCategory.value = task.category;
    editTaskModal.classList.add('show');
}

function closeEditModal() {
    editTaskModal.classList.remove('show');
}

closeModalBtn.onclick = closeEditModal;

window.onclick = function(event) {
    if (event.target === editTaskModal) {
        closeEditModal();
    }
}

saveEditTaskBtn.onclick = () => {
    if (taskBeingEdited) {
        const newTitle = editTaskInput.value.trim();
        if (newTitle.length > 0) taskBeingEdited.title = newTitle;
        taskBeingEdited.category = editTaskCategory.value as Category;
        renderTasks();
        closeEditModal();
    }
};

renderTasks();
