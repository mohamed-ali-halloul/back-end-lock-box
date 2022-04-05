module.exports={
    post : {
        tags: ["Door Operations"],
        description: "Gerer Door",
        operationId: "gererDoor",
        parameters:[ {
            name:"id",
            in:"path",
            schema:{
                $ref:"#/components/schemas/Box/properties/id"
            },
            required:true,
            description: "A single box id"
        }
    ],requestBody: {
        content:{
            'application/json': {
                schema:{
                    $code:'#/components/schemas/Door/properties/code'
                }
            }
        }
    },
        responses:{
            '200':{
                description:"Code has been send",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Door"
                        }
                    }
                }
            },
            '404':{
                description: "Box is not found",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Error',
                            example:{
                                message:"We can't find the User",
                                internal_code:"Invalid id"
                            }
                        }
                    }
                }
            }
}}}
