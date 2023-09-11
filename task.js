const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

const addTask = (desc) => {
  const task = {
    id: tasks.length + 1,
    desc,
    completed: false
  };
  
  tasks.push(task);
}

const completeTask = (id) => {
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
  }
} 

const deleteTask = (id) => {
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
}

const printTasks = () => {
  tasks.forEach(t => {
    console.log(`${t.id} - ${t.desc} - ${t.completed ? 'Completada' : 'Pendiente'}`);
  });
}

const main = () => {
  rl.question('Selecciona una opción (agregar/completar/eliminar/mostrar/salir): ', (answer) => {
    switch(answer) {
      case 'agregar':
        rl.question('Descripción de tarea: ', desc => {
          addTask(desc);
          main();
        });
        break;
        
      case 'completar':
        rl.question('ID de tarea: ', id => {
          completeTask(Number(id));
          main();  
        });
        break;
        
      case 'eliminar':
        rl.question('ID de tarea: ', id => {
          deleteTask(Number(id));
          main();
        });
        break;
        
      case 'mostrar':
        printTasks();
        main();
        break;
        
      case 'salir':
        rl.close();
        break;
        
      default:
        console.log('Opción inválida');
        main();  
    }
  });
}

main();