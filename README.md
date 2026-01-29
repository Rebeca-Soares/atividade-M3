# Projeto de Gestão de Tarefas

## Autor
- Nome: Rebeca Luiza Soares Cerqueira - Aluno nº 224

## Repositório GitHub
- [[Link do repositório](https://github.com/Rebeca-Soares/atividade-M3)]
- [[Link do GitHub Pages](https://rebeca-soares.github.io/atividade-M3/)] 

## Descrição
Aplicação web de gestão de tarefas que permite:

- Adicionar, editar e remover tarefas.
- Marcar tarefas como concluídas ou não concluídas.
- Filtrar tarefas por categoria (Trabalho, Pessoal, Estudo).

Aplicação web de gestão de Utilizadores que permite:
- Gestão de diferentes usuários, permitindo a visualização da respetivas informações;
- Filtrar e atualizar Usuarios por Ativo e Inativo;
- Funcionalidade de adicionar novo usuário;

O layout é **responsivo**, funcionando bem em desktops e dispositivos móveis.

## Passos para executar a página

1. Clone o repositório:
   ```bash
   git clone https://github.com/rebeca-cerqueira/atividade-M3.git


## Principais decisões e justificações

### 1. Layout responsivo
- Uso de **flexbox** e **media queries** para adaptar inputs, botões e cards de tarefas.  
- **Justificação:** garante boa experiência em dispositivos móveis sem comprometer desktop.

### 2. Categorias com badges coloridos
- Cada categoria possui cor distinta para identificação rápida.  
- **Justificação:** facilita organização visual das tarefas.

### 3. Botões de ação intuitivos
- Botões de **editar, concluir, remover e filtrar** com cores e estilos distintos.  
- **Justificação:** aumenta a usabilidade e reduz erros do usuário.

### 4. Validação de inputs
- Mensagem de erro próxima ao input para impedir criação de tarefas vazias ou menores que três letras.  
- **Justificação:** mantém integridade dos dados e confirmação que não haverá enganos.

### 5. Gestão de usuários
- Cada usuário possui suas próprias tarefas visíveis, que serão atualizadas no futuro.  
- **Justificação:** permite múltiplos perfis, garantindo privacidade e organização individual.

### 6. Código limpo e modular
- CSS organizado e HTML simplificado para manutenção e futuras extensões.  
- **Justificação:** facilita adição de funcionalidades sem comprometer o layout ou lógica existente.

## 7. Separação das pastas

Separação clara por responsabilidade:

- models/ → Classes ou tipos de dados (Tasks, Users, etc.)
- services/ → Lógica de negócio, manipulação de listas, CRUD
- ui/ → Tudo relacionado à interface (renderização, eventos, modais)
   '- ui/dom/ → Seletores DOM
   '- ui/modal/ → Funções de modal
- utils/ → Funções auxiliares, helpers, formatação
- assets/ → CSS, imagens, ícones
- main.ts / index.ts → Entrada principal da aplicação


