module.exports = {
    get:{
        tags:["Mobile serive Operations"],
        description: "Get all box by id cabine",
        operationId: "getAllBoxbyIdCabine",
        parameters:[
            {
                name:"id ",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/Box/properties/idcabine"
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