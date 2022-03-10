module.exports = {
    put:{
        tags:["Cabine Operations"],
        description: "Update cabine",
        operationId: "updateCabine",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                  $ref:"#/components/schemas/Cabine/properties/id"
                },
                required:true,
                description: "Id of cabine to be updated"
            }
        ],
        responses:{

            '200':{
                description: " Cabine updated successfully"
            },
            '404':{
                description: "Cabine not found"
            },
            '500':{
                description: "Server error"
            }
            
        }
    }
}
