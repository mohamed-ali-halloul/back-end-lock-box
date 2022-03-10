module.exports = {
    get:{
        tags: ["Cabine Operations"],
        description: "Get cabines",
        operationId: 'getCabines',
        parameters:[],
        responses:{
            '200':{
                description:"Cabines were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Cabine'
                        }
                    }
                }
            }
        }
    }
}
