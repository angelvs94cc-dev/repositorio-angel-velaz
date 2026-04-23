import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs'; 

export async function getTasks() {
    const fileUrl = new URL('./tasks.json', import.meta.url);
    const fileContents = await readFile(fileUrl); 
    return JSON.parse(fileContents);
}

export async function countPendingTasks() {
    const tasks = await getTasks();
    return tasks.filter(task => task.done === false).length;
}