module.exports = {
    get:{
        tags:["Tarif Operations"],
        description: "Get a Tarif",
        operationId: "getTarif",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/Tarif/properties/id"
                },
                required:true,
                description: "A single Tarif id"
            }
        ],
        responses:{
            '200':{
                description:"Tarif is obtained",
                content:{
                    'application/json':{
                        schema:{
                            $ref:"#/components/schemas/Tarif"
                        }
                    }
                }
            },
            '404':{
                description: "Tarif is not found",
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