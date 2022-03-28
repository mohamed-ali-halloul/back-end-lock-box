module.exports = {
    get:{
        tags: ["Tarif Operations"],
        description: "Get Tarifs",
        operationId: 'getTarifs',
        parameters:[],
        responses:{
            '200':{
                description:"Tarifs were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Tarif'
                        }
                    }
                }
            }
        }
    }
}
