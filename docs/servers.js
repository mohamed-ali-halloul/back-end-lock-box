module.exports = {
    servers: [
      {
        url: "http://localhost:3002/api", 
        description: "Local server", 
      },
      {
        url:`${process.env.API_URL}/api`,
        description:"prod server"
      }
    ],
  };