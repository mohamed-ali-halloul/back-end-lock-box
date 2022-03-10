module.exports = {
    delete:{
        tags: ["Cabine Operations"],
        description: "Deleting a cabine",
        operationId: "deleteCabine",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/Cabine/properties/id"
                },
                required:true,
                description: "Deleting a done cabine"
            }
        ],
        responses:{
            '200':{
                description:"cabine deleted successfully"
            },
            '404':{
                description:"cabine not found"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}