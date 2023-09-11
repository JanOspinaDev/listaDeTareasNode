const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

//...

function addTask() {
  return new Promise((resolve, reject) => {
    rl.question('Ingresa el indicador:', async indicator => {
      rl.question('Ingresa la descripción:', async description => {
        tasks.push({
          indicator,
          description,
          completed: false  
        });
        resolve();
      });
    }); 
  });
}

function removeTask() {
  return new Promise((resolve, reject) => {
    rl.question('Ingresa el indicador a eliminar:', async indicator => {
      const index = tasks.findIndex(t => t.indicator === indicator);
      if (index === -1) {
        reject('No encontrado');  
      } else {
        tasks.splice(index, 1);
        resolve();
      }
    });
  });
} 

async function main() {

  console.log('¿Qué deseas hacer? [agregar/eliminar/completar/salir]');
  
  const answer = await rl.questionAsync();
  
  switch(answer) {
    case 'agregar':
      await addTask();
      break;

    case 'eliminar':
      await removeTask().catch(err => {
        console.log(err);
      });
      break;
  }
}

main();

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