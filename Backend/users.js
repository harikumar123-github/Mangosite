import bcrypt from 'bcryptjs'

export const users = [
    {
        name: 'Hari',
        email: 'hari@gmail.com',
        password: bcrypt.hashSync('1234',12),
        isAdmin: true
    },
    {
        name: 'def',
        email: 'cdsaasx@gmail.com',
        password: bcrypt.hashSync('1234',12),
        isAdmin: false
    }
]
