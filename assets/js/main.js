const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-nova-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
  const li = document.createElement('li');
  return li;
}

inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
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
  div.appendChild(checkbox);

  
}

/* tarefas.addEventListener("DOMNodeInserted", teste)

function teste(){
  const inputs = document.querySelectorAll('.div-tarefa input');
  console.log(inputs[1])
  const input1 = inputs[1]
  input1.addEventListener('change', function() {
    if (this.checked) {
      console.log('checkbox is checked..');
    } else {
      console.log('checkbox is not checked');
    }
  });  
}
  inputs.addEventListener('change', () => {
    if (this.checked) {
      console.log('checkbox is checked..');
    } else {
      console.log('checkbox is not checked');
    }
  }); 
 */
 
  

/* function adicionaEventListenerCheckbox() {
  const checkbox = document.querySelector('.checkbox');

    checkbox.addEventListener('change', function() {
    if (this.checked) {
      console.log('checkbox is checked..');
    } else {
      console.log('checkbox is not checked');
    }
  }); 
}
 */

function criaDivTarefas(){
  const div = document.createElement('div');
  criaCheckbox(div);
  div.setAttribute('class', 'div-tarefa');
  return div;
}


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

function riscarTarefa() {
  const li = document.querySelector('li')
  li.setAttribute('class', 'tarefa-feita');
};

/* function tarefaFeitaProFinal() {
  const tarefaFeita = document.querySelector('.tarefa-feita');



};
 */

function tirarRiscoTarefa(){
  const li = document.querySelector('li');
  li.classList.remove("tarefa-feita");
};

//const checkbox = document.querySelectorAll(".checkbox");

document.querySelectorAll('.checkbox').forEach(item => {
  item.addEventListener('change', function() {
    //handle click
    if (this.checked) {
      console.log('checkbox is checked..');
      riscarTarefa();
    } else {
      console.log('checkbox is not checked');
      tirarRiscoTarefa()
  
    }
  })
})

/* checkbox.addEventListener('change', function() {
  if (this.checked) {
    console.log('checkbox is checked..');
    riscarTarefa();
  } else {
    console.log('checkbox is not checked');
    tirarRiscoTarefa()

  }
});
 */






btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

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
