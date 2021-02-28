const Queue = require('bull')
const redisConfig = require('../../config/redis')
const jobs = require ('../jobs')

const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, redisConfig),
    name: job.key,
    handle: job.handle,
}))

exports.queues = queues

exports.add = (name, data) => {
    const queue = queues.find(queue => queue.name === name)
    return queue.bull.add(data);
}

exports.process = () => {
    queues.forEach(queue => {
        queue.bull.process(queue.handle)

        queue.bull.on('failed', (job) => {
            console.log('Job Failed', job.key, job.data)
        })

    })
}



// const RegistrationMail = require('../jobs/RegistrationMail')

// const mailQueue = new Queue(RegistrationMail.key, redisConfig)

// module.exports = mailQueue