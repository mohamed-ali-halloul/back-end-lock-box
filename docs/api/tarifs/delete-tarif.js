module.exports = {
    delete:{
        tags: ["Tarif Operations"],
        description: "Deleting a Tarif",
        operationId: "deleteTarif",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/Tarif/properties/id"
                },
                required:true,
                description: "Deleting a done Tarif"
            }
        ],
        responses:{
            '200':{
                description:"Tarif deleted successfully"
            },
            '404':{
                description:"Tarif not found"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}