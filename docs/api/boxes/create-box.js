module.exports = {
    post:{
        tags:["Box Operations"],
        description: "Create Box",
        operationId: "createBox",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/Box'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Box created successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}