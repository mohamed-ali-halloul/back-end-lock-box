module.exports = {
    post:{
        tags:["Tarif Operations"],
        description: "Create Tarif",
        operationId: "createTarif",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/Tarif'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Tarif created successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}