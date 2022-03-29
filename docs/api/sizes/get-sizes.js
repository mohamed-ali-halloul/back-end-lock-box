module.exports = {
    get:{
        tags: ["Size Operations"],
        description: "Get sizes",
        operationId: 'getSizes',
        parameters:[],
        responses:{
            '200':{
                description:"Sizes were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Size'
                        }
                    }
                }
            }
        }
    }
}