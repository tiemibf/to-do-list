const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-nova-tarefa');
const tarefas = document.querySelector('.tarefas');



//limpa input depois de criar uma tarefa

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

//cria novos elementos com inserção de tarefas

function criaLi() {
  const li = document.createElement('li');
  return li;
}

function criaBotaoApagar(div) {
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  div.appendChild(botaoApagar);
}

function criaCheckbox(div){
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('class', 'checkbox');
  checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      riscarTarefa(event.currentTarget.parentElement);
       } else {
      tirarRiscoTarefa(event.currentTarget.parentElement);
    }
  })
  div.appendChild(checkbox);
  
}

function criaDivTarefas(){
  const div = document.createElement('div');
  criaCheckbox(div);
  div.setAttribute('class', 'div-tarefa');
  return div;
}

//imprime div que contém a checkbox e a li da tarefa

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  const div = criaDivTarefas();
  div.appendChild(li);
  tarefas.appendChild(div);
  

  limpaInput();
  criaBotaoApagar(div);
  salvarTarefas();
}

//marca e desmarca tarefas

function riscarTarefa(tarefaDiv) {
  const li = tarefaDiv.querySelector('li')
  li.setAttribute('class', 'tarefa-feita');
};

function tirarRiscoTarefa(tarefaDiv){
  const li = tarefaDiv.querySelector('li');
  li.classList.remove("tarefa-feita");
};

//captura eventos do botão de criar nova tarefa

btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

//captura evento do botão de apagar tarefa

document.addEventListener('click', function(e) {
  const el = e.target;
  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

//persistindo dados na localStorage

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas) {
  criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
