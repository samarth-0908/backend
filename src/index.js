//require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running at port: ${process.env.PORT}`);
            app.on("errror", (error) => {
                console.log("ERRR: ", error);
                throw error
            })
    
        })
    })
    .catch((err) => {
        console.log("MONDO db connection failed !!!", err);
    })








/* first Approach -->
in this approach we have taken try catch and also we have handled errors and our database is in different continent so we have made use of async await also

import express from "express";
const app = express()

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERR:", error);
            throw error

        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}` );
        })

    }catch (error) {
        console.error("ERROR:", error)
        throw err
    }


})()

*/