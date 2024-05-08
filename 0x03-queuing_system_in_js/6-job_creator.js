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

job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', () => {
  console.log('Notification job failed');
});
