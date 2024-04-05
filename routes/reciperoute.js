import  express  from "express";
import recipe from "../model/recipe.js";

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const getrecipeall = await recipe.find();
        res.status(200).json(getrecipeall);
    } catch (error) {
        console.error("Error getting recipes:", error);
        res.status(404).send("Error getting the data");
    }
});

router.get("/:id", async (req,res)=>{
    try{
        const getrecipeid = await recipe.findOne({id:req.params.id});
        if (!getrecipeid)
        {
            res.status(404)
            throw new Error ("recipe not found, Invalid ID "); 
        }
        }
        catch (error) {
            console.error("Error getting recipes:", error);
            res.status(404).send("Error getting the data");
       }
});

router.post("/", async (req,res) =>{
    const{id, recipetitle ,description,ingredients,instruction,cooktime } = req.body;

    if (!id){
        res.status(404).json({error:"id is required please enter"});
    }

    const createrecipe = await recipe.create({
        id,
        recipetitle,
        description,
        ingredients,
        instruction,
        cooktime
    })

    res.status(201).json({
        message: "Recipe has been successfully added to the database",
        recipe: createrecipe
      });
    
});




router.put(":/id",async (req,res)=>{
        const getrecipeid = await recipe.findOne({id:req.params.id});
        if (!getrecipeid)
        {
            res.status(404)
            throw new Error ("recipe not found, Invalid ID "); 
        }
        res.status(200).json(getrecipeid);
       const update = await recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(update);
})




router.delete("/:id", async  (req, res) =>{
    try
    {    
    const getrecipeid = await recipe.findOne({id:req.params.id});
    if (!getrecipeid)
    {
        res.status(404)
        throw new Error (" recipe not found, Invalid ID "); 
    }
    await recipe.deleteOne({ id: req.params.id });
    res.status(200).json({ message: "recipe deleted successfully" });
    }
    catch (error) {
        console.error("recipe deleting contact:", error);
        res.status(500).json({ message: "Internal server error" });
    }

});


export default router;
