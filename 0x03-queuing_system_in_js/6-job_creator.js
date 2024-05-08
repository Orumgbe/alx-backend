import kue from 'kue';

// create queue
const queue = kue.createQueue();

// Initializing job data
const jobData = {
  phoneNumber: '4153518780',
  message: 'This is the code to verify your account',
};

// Create job
const job = queue.create('push_notification_code', jobData);
job.save((err) => {
  if (!err) {
    console.log(`Notification job created: ${job.id}`);
  }
});

queue.on('complete', () => {
  console.log('Notification job completed');
});

queue.on('failed', () => {
  console.log('Notification job failed');
});
