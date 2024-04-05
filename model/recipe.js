import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schemarecipe = new Schema({
    recipetitle: {type: String},
    ingredients : {type: String},
    instructions : {type: String},
    cooktime :{type: String}
});


const recipe = model("Recipe",schemarecipe);
export default recipe