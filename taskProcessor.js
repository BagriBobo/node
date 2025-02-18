import { EventEmitter } from 'events';

const emitter = new EventEmitter();

// Array inicial de tarefas
const tasks = [
  { id: 1, descricao: 'Tarefa 1', status: 'trabalhando' },
  { id: 2, descricao: 'Tarefa 2', status: 'aguardando' },
  { id: 3, descricao: 'Tarefa 3', status: 'aguardando' }
  // ...existing tasks...
];

// Listeners para cada evento
emitter.on('finalizado', (info) => {
  console.log(`Finalizado: Tarefa ${info.task.id} finalizada. Random: ${info.random.toFixed(2)}`);
});

emitter.on('trabalhando', (info) => {
  console.log(`Trabalhando: Tarefa ${info.task.id} está trabalhando.${info.random !== null ? ' Random: ' + info.random.toFixed(2) : ''}`);
});

emitter.on('aguardando', (info) => {
  const ids = info.tasks.map(t => t.id).join(', ');
  console.log(`Aguardando: Tarefas ${ids} aguardando.`);
});

const processTasks = () => {
  // Localizar índice da tarefa com status "trabalhando"
  const currentIdx = tasks.findIndex(t => t.status === 'trabalhando');
  if (currentIdx === -1) {
    console.log('Nenhuma tarefa em processamento.');
    return;
  }

  const currentTask = tasks[currentIdx];
  const randomNumber = Math.random();

  if (randomNumber > 0.7) {
    // Atualiza tarefa atual para finalizada
    currentTask.status = 'finalizada';
    emitter.emit('finalizado', { task: currentTask, random: randomNumber });

    // Procura próxima tarefa com status "aguardando" e inicia
    const nextTask = tasks.find(t => t.status === 'aguardando');
    if (nextTask) {
      nextTask.status = 'trabalhando';
      emitter.emit('trabalhando', { task: nextTask, random: null });
    }
  } else {
    emitter.emit('trabalhando', { task: currentTask, random: randomNumber });
  }

  const waitingTasks = tasks.filter(t => t.status === 'aguardando');
  if (waitingTasks.length > 0) {
    emitter.emit('aguardando', { tasks: waitingTasks });
  }

  console.log('Estado atual das tarefas:', tasks);
};

console.log('Inicializando o processador de tarefas...');
setInterval(processTasks, 5000);
