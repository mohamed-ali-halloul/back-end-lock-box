module.exports={
    post : {
        tags: ["Mobile serive Operations"],
        description: "Render Box",
        operationId: "renderBox",
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
                    $code:'#/components/schemas/MobileService/properties/code'
                }
            }
        }
    },
        responses:{
            '200':{
                description:"box is rendered",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Box"
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
