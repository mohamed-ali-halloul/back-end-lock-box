module.exports = {
    get:{
        tags:["Cabine Operations"],
        description: "Get a cabine",
        operationId: "getCabine",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/Cabine/properties/id"
                },
                required:true,
                description: "A single cabine id"
            }
        ],
        responses:{
            '200':{
                description:"Cabine is obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Cabine"
                        }
                    }
                }
            },
            '404':{
                description: "Cabine is not found",
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