module.exports = {
    put:{
        tags:["Box Operations"],
        description: "Update box",
        operationId: "updateBox",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/Box/properties/id"
                },
                required:true,
                description: "Id of box to be updated"
            }
        ],
        responses:{

            '200':{
                description: " Box updated successfully"
            },
            '404':{
                description: "Box not found"
            },
            '500':{
                description: "Server error"
            }
            
        }
    }
}
