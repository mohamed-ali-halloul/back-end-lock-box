module.exports = {
    post:{
        tags:["User Operations"],
        description: "Create User",
        operationId: "createUser",
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
                description: "User created successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}