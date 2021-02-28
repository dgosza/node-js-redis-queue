const Queue = require('../lib/Queue')

exports.store = async (request, response) => {

    const { name, email, password } = request.body

    const user = {
        name, email, password
    }

    //Adicionar job RegistrationMail na fila
    await Queue.add('RegistrationMail', { user })


    return response.json(user)

}