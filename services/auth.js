var bcryptjs = require('bcryptjs')
var jwt = require('jsonwebtoken')

var authService = {
    signUser: function(user, type = 'user') {  // create token  incoding 
        const token = jwt.sign({
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            type: type
        }, '54IK?Vz/,RT]%,$', {
            expiresIn: '1000h'
        })
        return token
    },
    verifyToken: (token) => {  // decoding token
        try {
            const decodedData = jwt.verify(token, '54IK?Vz/,RT]%,$')
            return (decodedData?.id) ? decodedData : false
        } catch(e) {
            return false
        }
        
    },
    hashPassword: function(plainPassword) {  // incodeing password 
        var salt = bcryptjs.genSaltSync(10)
        var hashedPassword = bcryptjs.hashSync(plainPassword, salt)
        return hashedPassword
    },
    comparePasswords: function(plainPassword, hashedPassword) { // decoding password
        return bcryptjs.compareSync(plainPassword, hashedPassword)
    }
}

module.exports = authService