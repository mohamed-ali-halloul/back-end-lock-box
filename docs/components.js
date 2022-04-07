module.exports ={
    components : {
        schemas : {
            id: {
                type: "integer", // data type
                description: "Id ", // desc
                example: "001", // example of an id
              },
              User: {
                type: "object", // data type
                properties: {
                  id: {
                    type: "integer", // data-type
                    description: "user identification number", // desc
                    example: "001", // example of an id
                  },
                  username: {
                    type: "string", // data-type
                    description: "user username", // desc
                    example: "aziz", // example of a title
                  },
                  email: {
                    type: "string", // data type
                    description: "email of user", // desc
                    example: "aziz542@gmail.com", // example of a completed value
                  },
                  password: {
                      type :"string",
                      description:"password of user",
                      exmaple:"cvnifdons54",
                  },
                  role: {
                      type:"string",
                      description:"role of user",
                      example:"Admin",
                  },
                },
              },
              //box model
              Box: {
                type: "object", // data type
                properties: {
                  id: {
                    type: "integer", // data-type
                    description: "box identification number", // desc
                    example: "001", // example of an id
                  },
                  ref: {
                    type: "string", // data-type
                    description: "box reference", // desc
                    example: "hs20012", // example of a title
                  },
                  name: {
                    type: "string", // data type
                    description: "name of box", // desc
                    example: "box54", // example of a completed value
                  },
                  status: {
                      type :"string",
                      description:"status of box",
                      exmaple:"",
                  },
                  code: {
                      type:"string",
                      description:"code of box",
                      example:"12",
                  },
                  availibility: {
                    type:"integer",
                    description:"availibility of box",
                    example:"1",
                },
                boardId: {
                  type:"string",
                  description:"boardId of box",
                  example:"1",
              },
              doorNumber: {
                type:"string",
                description:"doorNumber of box",
                example:"1",
            },
            idcabine : {
                    type: "integer",
                    description :"num cabine de box",
                    example: "1",
                  },
            idsize:
              {
                type: "integer",
                description :"size de box",
                example: "1",
              },
            
                },
              },
           // cabine model
           Cabine: {
            type: "object", // data type
            properties: {
              id: {
                type: "integer", // data-type
                description: "cabine identification number", // desc
                example: "001", // example of an id
              },
              ref: {
                type: "string", // data-type
                description: "cabine reference", // desc
                example: "hs10", // example of a title
              },
              name: {
                type: "string", // data type
                description: "name of cabine", // desc
                example: "cabine54", // example of a completed value
              },
              network_type: {
                type: "string", // data type
                description: "type of netowrk", // desc
                example: "wifi", // example of a completed value
              },
              mode: {
                type: "string", // data type
                description: "mode", // desc
                example: "wifi", // example of a completed value
              },
              shortLink: {
                type: "string", // data type
                description: "", // desc
                example: "", // example of a completed value
              },
              
            
            },
          },
          //tarifs model 
          Tarif: {
            type: "object", // data type
                properties: {
                  id: {
                    type: "integer", // data-type
                    description: "tarif identification number", // desc
                    example: "001", // example of an id
                  },
                  duration : {
                    type: "string", // data type
                    description: "", // desc
                    example: "", // example of a completed value
                  },
                  price:{
                    type:"integer",
                    description:"price ",
                    example:"5",
                  },
                  date_debut:{
                    type:"date",
                    description:"",
                    example:"14:30",
                  },
                  display:{
                    type:"integer",
                    description:"",
                    example:"",
                  },
                  idsize:{
                    type:"integer",
                    description:"",
                    example:"",
                  },
                },
          },
          // door model
          Door: {
type: "object", 
properties :{
  code: {
    type:"string",
    description:"code of box",
    example:"12",
},

}

          },
// 
MobileService : {
  type: "object",
properties:{
  code:{type:"string",
  description:"code of box",
  example:"12",}
}
},
          // size model
          Size: {
            type: "object", // data type
                properties: {
                  id: {
                    type: "integer", // data-type
                    description: "Size identification number", // desc
                    example: "001", // example of an id
                  },
                  name : {
                    type: "string", // data type
                    description: "", // desc
                    example: "Small", // example of a completed value
                  },
                  value:{
                    type:"string",
                    description:"value ",
                    example:"Small",
                  },
                  
                },
          },
              // error model
              Error: {
                type: "object", //data type
                properties: {
                  message: {
                    type: "string", // data type
                    description: "Error message", // desc
                    example: "Not found", // example of an error message
                  },
                  internal_code: {
                    type: "string", // data type
                    description: "Error internal code", // desc
                    example: "Invalid parameters", // example of an error internal code
                  },
                },
              },
        },
       
       
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            in:"header",
            bearerFormat: 'JWT',
          }
        }
      },
       
       

        }
    
