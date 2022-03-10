module.exports = {
    delete:{
        tags: ["Box Operations"],
        description: "Deleting a box",
        operationId: "deleteBox",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/Box/properties/id"
                },
                required:true,
                description: "Deleting a done box"
            }
        ],
        responses:{
            '200':{
                description:"box deleted successfully"
            },
            '404':{
                description:"box not found"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}