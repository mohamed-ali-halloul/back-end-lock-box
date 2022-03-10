module.exports = {
    post:{
        tags:["Cabine Operations"],
        description: "Create Cabine",
        operationId: "createCabine",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/Cabine'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Cabine created successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}