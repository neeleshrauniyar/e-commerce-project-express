# e-commerce-project-express

1. Project Folder Setup & Install plugins
2. Models Creation
3. Database Connection Setup
4. Routes Setup
5. Debugger Setup: used to print out or prevent to print messages to debug the application. We can allow or prevent the messages to be printed whenever or whereever we want
6. separate mongodb uri in the config folder
    npm i config
    config>>development.json
    { "MONGOOSE_URI": "uri"}
    config.get("MONGOOSE_URI)
7. create a node environment : 
    export NODE_ENV=development
    export NODE_ENV=development
    console.log(process.env.NODE_ENV)
8. create seller, check if the email exists, and hash the password with bcrypt
9. create jwt token, generate token function, verify jwt token for login middleware
10. added views html files in the views directory
11. 


