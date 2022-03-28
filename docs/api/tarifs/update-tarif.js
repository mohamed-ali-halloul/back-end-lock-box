module.exports = {
    put:{
        tags:["Tarif Operations"],
        description: "Update Tarif",
        operationId: "updateTarif",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                  $ref:"#/components/schemas/Tarif/properties/id"
                },
                required:true,
                description: "Id of Tarif to be updated"
            }
        ],
        responses:{

            '200':{
                description: " Tarif updated successfully"
            },
            '404':{
                description: "Tarif not found"
            },
            '500':{
                description: "Server error"
            }
            
        }
    }
}
