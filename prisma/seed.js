// prisma/seed.ts

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const tasks = [
        {
            title: 'Task 11',
            body: 'This task has been blocked due to dependency.',
            status: 'BLOCKED',
        },
        {
            title: 'Task 12',
            body: 'This task is awaiting review from the manager.',
            status: 'REVIEW',
        },
        {
            title: 'Task 13',
            body: 'This task is on hold until further notice.',
            status: 'ON_HOLD',
        },
        {
            title: 'Task 14',
            body: 'This task was cancelled due to a change in priorities.',
            status: 'CANCELLED',
        },
        {
            title: 'Task 15',
            body: 'This task is scheduled for next week.',
            status: 'TODO',
        },
        {
            title: 'Task 16',
            body: 'This task is in progress with team collaboration.',
            status: 'IN_PROGRESS',
        },
        {
            title: 'Task 17',
            body: 'This task was successfully completed.',
            status: 'DONE',
        },
        {
            title: 'Task 18',
            body: 'This task is blocked by another task.',
            status: 'BLOCKED',
        },
        {
            title: 'Task 19',
            body: 'This task is pending approval.',
            status: 'REVIEW',
        },
        {
            title: 'Task 20',
            body: 'This task is on hold until the budget is approved.',
            status: 'ON_HOLD',
        },
        {
            title: 'Task 21',
            body: 'This task has been cancelled due to lack of resources.',
            status: 'CANCELLED',
        },
        {
            title: 'Task 22',
            body: 'This task is to be initiated next quarter.',
            status: 'TODO',
        },
        {
            title: 'Task 23',
            body: 'This task is being developed as planned.',
            status: 'IN_PROGRESS',
        },
        {
            title: 'Task 24',
            body: 'This task has reached completion phase.',
            status: 'DONE',
        },
        {
            title: 'Task 25',
            body: 'This task is currently facing issues.',
            status: 'BLOCKED',
        },
        {
            title: 'Task 26',
            body: 'This task is under peer review.',
            status: 'REVIEW',
        },
        {
            title: 'Task 27',
            body: 'This task is paused for now.',
            status: 'ON_HOLD',
        },
        {
            title: 'Task 28',
            body: 'This task was cancelled due to low priority.',
            status: 'CANCELLED',
        },
        {
            title: 'Task 29',
            body: 'This task is in the backlog for future consideration.',
            status: 'TODO',
        },
        {
            title: 'Task 30',
            body: 'This task is being actively worked on.',
            status: 'IN_PROGRESS',
        },
    ];

    for (const task of tasks) {
        await prisma.task.create({
            data: task,
        });
    }

    console.log('Database seeded with tasks!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
