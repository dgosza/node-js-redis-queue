const Mail = require('../lib/Mail')

module.exports = {
    key: 'RegistrationMail',
    async handle({ data }) {
        const { user } = data

        await Mail.sendMail({
            from: 'Queue Test <queue@queuetest.com.br>',
            to: `${user.name} <${user.email}>`,
            subject: 'Cadastro de usuário',
            html: `Hello, ${user.name}, welcome to the queue system.`
        })
    }
}
