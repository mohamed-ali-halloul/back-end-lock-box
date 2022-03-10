module.exports = {
    get:{
        tags: ["Box Operations"],
        description: "Get boxes",
        operationId: 'getBoxes',
        parameters:[],
        responses:{
            '200':{
                description:"Boxes were obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Box'
                        }
                    }
                }
            }
        }
    }
}
