import { createQueue } from 'kue';

// Array of job data object
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account',
  },
];

const queue = createQueue();

for (const jobData in jobs) {
  if (jobData) {
    const job = queue.create('push_notification_code_2', jobData);
    job.save((err) => {
      if (!err) console.log(`Notification job created: ${job.id}`);
    });
  }
}

queue.on('complete', (job) => {
  console.log(`Notification job ${job.id} completed`);
});

queue.on('failed', (job, err) => {
  console.log(`Notification job ${job.id} failed: ${err.message}`);
});

queue.on('progress', (job) => {
  console.log(`Notification job ${job.progress}% complete`);
});
