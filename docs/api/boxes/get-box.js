module.exports = {
    get:{
        tags:["Box Operations"],
        description: "Get a box",
        operationId: "getBox",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/Box/properties/id"
                },
                required:true,
                description: "A single box id"
            }
        ],
        responses:{
            '200':{
                description:"Box is obtained",
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
        }
    }
}