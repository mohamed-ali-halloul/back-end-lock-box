module.exports = {
    post:{
        security: [{bearerAuth:[]}],
        tags:["User Operations"],
        description: "Connexion User",
        operationId: "connexionUser",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/User/properties/id'
                    }, 
                    required: true
                }
            }
        },
        responses:{
            '201':{
                description: "connexion successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}