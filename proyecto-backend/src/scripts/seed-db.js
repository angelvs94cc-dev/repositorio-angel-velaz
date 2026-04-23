import { connectToDB } from '../lib/database.js';
import { User } from '../models/user-model.js';
import { Task } from '../models/task-model.js'; 

console.log("Inicializando SeedDb");
const connection = await connectToDB();

if (connection) {
    console.log(`Conectado a MongoDB: ${connection.name}`);

    await seedUsers();
    await seedTasks();

    await connection.close();
}

process.exit(0);

async function seedUsers() {
    const USERS = [
        { name: 'Joe Don', email: 'jd@kc.io', password: await User.hashPassword('1234') },
        { name: 'Admin', email: 'ad@kc.io', password: await User.hashPassword('1234') },
    ];

    const deleteResult = await User.deleteMany({});
    console.log(`Eliminados [${deleteResult.deletedCount}] User`);

    const insertedUsers = await User.insertMany(USERS);
    console.log(`Insertados [${insertedUsers.length}] User`);
}

async function seedTasks() {
    const [jd, ad] = await Promise.all([
        User.findOne({ email: 'jd@kc.io' }),
        User.findOne({ email: 'ad@kc.io' })
    ]);

    const TASKS = [
        {
            title: "Preparar la clase de asincronía",
            done: true,
            owner: jd._id
        },
        {
            title: "Revisar los ejemplos de fs/promises",
            done: false,
            owner: ad._id
        },
        {
            title: "Explicar Promise.all en directo",
            done: true,
            owner: jd._id
        },
        {
            title: "Refactorizar la función de render",
            done: false,
            owner: ad._id
        }
    ];

    const deleteResult = await Task.deleteMany({});
    console.log(`Eliminadas [${deleteResult.deletedCount}] Task`);

    const insertedTasks = await Task.insertMany(TASKS);
    console.log(`Insertados [${insertedTasks.length}] Task`);
}