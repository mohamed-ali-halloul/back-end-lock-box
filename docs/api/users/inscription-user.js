module.exports = {
    post:{
        tags:["User Operations"],
        description: "inscription User",
        operationId: "inscriptionUser",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/User'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: " Inscription  User successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}