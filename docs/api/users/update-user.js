module.exports = {
    put:{
        tags:["User Operations"],
        description: "Update user",
        operationId: "updateUser",
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/User/properties/id"
                },
                required:true,
                description: "Id of user to be updated"
            }
        ],
        responses:{

            '200':{
                description: "User updated successfully"
            },
            '404':{
                description: "User not found"
            },
            '500':{
                description: "Server error"
            }
            
        }
    }
}
