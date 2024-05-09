import kue from 'kue';

const blackListed = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  // Handles progress and send notification
  job.progress(0, 100);
  if (blackListed.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber}, with the message: ${message}`);
    done();
  }
}

const queue = kue.createQueue();

queue.process('push_notification_code_2', 2, (job, done) => {
  // Process 2 jobs at a time
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
