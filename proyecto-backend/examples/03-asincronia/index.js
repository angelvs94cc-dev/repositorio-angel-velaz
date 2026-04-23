import { readFile } from 'node:fs/promises';
// const readFile = require('node:fs').readFile; // import de commonJs
import { setTimeout as wait } from 'node:timers/promises'


async function loadTasks() {
    // Leer el archivo tasks.json
    const fileUrl = new URL('./tasks.json', import.meta.url); // en common js seria __dirname
    const fileContents = await readFile(fileUrl, 'utf-8');
    // console.log(fileContents);
    // Devolver ese archivo como Objeto
    return JSON.parse(fileContents);
}

// Función que enriquezca las tareas (añadir propiedades)
async function enrichTask(task) {
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(
    //             {
    //                 ...task,
    //                 summary: `${task.title} · ${task.done ? 'hecha' : 'pendiente'}`
    //             }
    //         )
    //     }, 200);
    // });
    // Ambas aproximaciones hacen lo mismos:
    //// Nos esperamos 200ms y devolvemos la tarea con el summary

    await wait(200);
    return {
        ...task,
        summary: `${task.title} · ${task.done ? 'hecha' : 'pendiente'}`
    }
}

// TODO: Ejecutar en serie
async function enrichInSerie(tasks) {
    const result = [];

    for (const task of tasks) {
        result.push(await enrichTask(task));
    }
    return result;
};

// Ejecutar en paralelo
async function enrichInParallel(tasks) {
    return Promise.all(tasks.map(enrichTask));
}


console.log("Orden de ejecución sincrona y asincrona:");
console.log('A');
setTimeout(() => {
    console.log('D -> Microtask de setTimeot');
}, 0);
Promise.resolve().then(() => console.log('C -> Microtask de Promise'));

const tasks = await loadTasks();
console.log('Tareas cargadas:');
console.table(tasks);

console.time('Serie');
const serieTasks = await enrichInSerie(tasks);
console.timeEnd('Serie');

console.time('Parallel');
const parallelTasks = await enrichInParallel(tasks);
console.timeEnd('Parallel');
console.table(parallelTasks);

console.log('B');
