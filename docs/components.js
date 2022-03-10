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
                  size: {
                      type :"string",
                      description:"size of box",
                      exmaple:"Small",
                  },
                  price: {
                      type:"double",
                      description:"price of box",
                      example:"12",
                  },
                  idcabine : {
                    type: "integer",
                    description :"num cabine de box",
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
    
