import  express  from "express";
import recipe from "../model/recipe.js";

const router = express.Router();


router.get("/",async (req,res) =>{
    const getrecipeall = await recipe.find();
    res.status(200).json(getrecipeall);



} );