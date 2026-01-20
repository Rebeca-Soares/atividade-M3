interface User {
    id: number,
    name: string,
    email: string,
    active: boolean
}

class UserClass implements User {
    id: number;
    name: string;
    email: string;
    active: boolean;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = true; 
    }

    disable() {
        this.active = false
    }

    toggleState() {
        this.active = !this.active
    }
}

let UserList: UserClass[] = [
    new UserClass(1, 'Rebeca Cerqueira', 'rsc@gmail.com'),
    new UserClass(2, 'Ana Garcia', 'acg@gmail.com'),
    new UserClass(3, 'Leandro Nogueira', 'lmg@gmail.com')
]

const listDiv = document.querySelector('.UsersList') as HTMLDivElement;
const nomeInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const addBnt = document.getElementById('addUserBtn') as HTMLButtonElement;
const info = document.getElementById('information') as HTMLSpanElement;
const filterActives = document.getElementById('filterActives') as HTMLButtonElement;
const filterDesactive = document.getElementById('filterDesactive') as HTMLButtonElement;
const contadorDesactiveSpan = document.getElementById('contadorDesactive') as HTMLSpanElement;
const contadorTotalUsers = document.getElementById('contadorTotalUsers') as HTMLSpanElement;
const contadorPercentagemUsers = document.getElementById('contadorPercentagemUsers') as HTMLSpanElement;

const userDetailsDiv = document.getElementById('userDetails') as HTMLDivElement;

const fakeData = [
    { id: 1, name: 'Paulo Coelho', email: 'pmc@gmail.com', active: true },
    { id: 2, name: 'Joana pinto', email: 'jpn@gmail.com', active: false },
    { id: 3, name: 'Caio Lacerda', email: 'clgg@gmail.com', active: true }
];

fakeData.forEach(d => {
    const user = new UserClass(d.id, d.name, d.email);
    user.active = d.active;
    UserList.push(user);
})

renderUsers();

export function renderUsers(users: UserClass[] = UserList): void {
    listDiv.innerHTML = '';

    users.forEach(u => {
        const card = document.createElement('div');
        card.className = 'userCard';

        card.innerHTML = `
            <div class="user-top">
                <div class="avatar">${getInitials(u.name)}</div>
                <div class="status ${u.active ? 'Ativo' : 'Inativo'}">
                ${u.active ? 'Ativo' : 'Inativo'}
                </div>
            </div>
            <p><i class="bi bi-person"></i> <strong>Nome:</strong> ${u.name}</p>
            <p><i class="bi bi-envelope"></i> <strong>Email:</strong> ${u.email}</p>
            <p><i class="bi bi-list-task"></i> <strong>Tarefas:</strong> 0 tarefas atribuídas</p>
            <div class="card-buttons">
                <button class="toggleStateBnt" data-id='${u.id}'>
                ${u.active ? 'Desativar' : 'Ativar'}
                </button>
                <button class="removeUser" data-id='${u.id}'>
                <i class="bi bi-trash3"></i>
                </button>
            </div>
        `;

        const removeBnt = card.querySelector('.removeUser') as HTMLButtonElement;
        removeBnt.addEventListener('click', (e) => {
            e.stopPropagation();
            removeUser(u.id);
        })


        const toggleBnt = card.querySelector('.toggleStateBnt') as HTMLButtonElement;
        toggleBnt.addEventListener('click', (e) => {
            e.stopPropagation();
            u.toggleState();
            renderUsers();
        })

        card.addEventListener('click', () => {
            showUserModal(u);
        });

        listDiv.appendChild(card);

    });

    const contadorAtivos = document.getElementById('contadorAtivos') as HTMLSpanElement;
    const contadorInativos = document.getElementById('contadorDesactive') as HTMLSpanElement;

    const ativosCount = UserList.filter(u => u.active).length;
    const inativosCount = UserList.filter(u => !u.active).length;

    contadorAtivos.textContent = ativosCount.toString();
    contadorInativos.textContent = inativosCount.toString();

    contadorTotalUsers.textContent = UserList.length.toString();
    contadorPercentagemUsers.textContent = ((ativosCount / UserList.length) * 100).toFixed(0) + '%';
}

function showMessage(message: string, type: 'error' | 'success') {
    info.textContent = message;
    info.className = 'info-message'; // limpa classes antigas
    info.classList.add(type === 'error' ? 'info-error' : 'info-success', 'info-show');
    setTimeout(() => info.classList.remove('info-show'), 3000);
}


addBnt.addEventListener('click', () => {
    const nome = nomeInput.value;
    const email = emailInput.value;

    if (!nome || !email) {
        showMessage('Preencha todos os campos!', 'error');
        return;
    } else if (!email.includes('@')) {
        showMessage('Email inválido!', 'error');
        return;
    }
    
    const newUser = new UserClass(UserList.length + 1, nome, email);
    UserList.push(newUser);
    
    showMessage('Usuário adicionado com sucesso!', 'success');

    nomeInput.value = '';
    emailInput.value = '';

    renderUsers();
})

filterActives.addEventListener('click', () => {
    const actives = UserList.filter(u => u.active);
    renderUsers(actives);
});

function removeUser(id: number): void {
    UserList = UserList.filter(u => u.id !== id);
    renderUsers();
}

const searchInputUser = document.getElementById('searchUser') as HTMLInputElement;
searchInputUser.addEventListener('input', () => {
    const query = searchInputUser.value.toLowerCase();

    const filteredUsers = UserList.filter(u => u.name.toLowerCase().includes(query));

    if (filteredUsers.length === 0) {
        listDiv.innerHTML = `<p>Usuario não encontrado </p>`
    } else {
        renderUsers(filteredUsers);
    }
});

filterDesactive.addEventListener('click', () => {
    const desactives = UserList.filter(u => !u.active);
    renderUsers(desactives);
})

const orderNameUser = document.getElementById('orderNameUser') as HTMLButtonElement;

orderNameUser.addEventListener('click', () => {
    UserList.sort((a, b) => a.name.localeCompare(b.name))
    renderUsers();
})


const modalOverlay = document.getElementById('userModal') as HTMLDivElement;
const modalContent = document.getElementById('userModalContent') as HTMLDivElement;

function showUserModal(user: UserClass): void {
    modalContent.innerHTML = `
        <button class="close-modal" id="closeUserModal">&times;</button>
        <h2>${user.name}</h2>
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Status:</strong> ${user.active ? 'Ativo' : 'Inativo'}</p>
        <p><strong>Tarefas Atribuídas:</strong> 0</p>
    `;
    modalOverlay.style.display = 'flex';

    const closeBtn = document.getElementById('closeUserModal') as HTMLButtonElement;
    
    closeBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2); 
}

renderUsers();