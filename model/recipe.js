import mongoose from "mongoose";

const { Schema, model } = mongoose;

const schemarecipe = new Schema({
    id: { type: Number, required: true },
    recipetitle: {type: String},
    description: { type: String }, 
    ingredients : {type: String},
    instructions : {type: String},
    cooktime :{type: String}
});


const recipe = model("recipe",schemarecipe);
export default recipe