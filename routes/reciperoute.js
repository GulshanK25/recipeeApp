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

router.get("/:id", async (req, res) => {
    try {
        const getrecipeid = await recipe.findOne({ id: req.params.id });
        if (!getrecipeid) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(getrecipeid);
    } catch (error) {
        console.error("Error getting recipe by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", async (req,res) =>{
    const{id, recipetitle ,description,ingredients,instructions,cooktime } = req.body;

    if (!id){
        res.status(404).json({error:"id is required please enter"});
    }

    const createrecipe = await recipe.create({
        id,
        recipetitle,
        description,
        ingredients,
        instructions,
        cooktime
    })

    res.status(201).json({
        message: "Recipe has been successfully added to the database",
        recipe: createrecipe
      });
    
});




// router.put("/:id", async (req, res) => {
//     try {
//         const updaterecipe = await recipe.findOne({ id: req.params.id });
//         if (!updaterecipe) {
//             return res.status(404).json({ message: "Recipe not found" });
//         }
//         const field = req.body.field;
//         if (!field) {
//             return res.status(400).json({ message: "Field to update is required" });
//         }
//         updaterecipe[field] = req.body[field];
//         const updatedRecipe = await updaterecipe.save();
//         res.status(200).json(updatedRecipe);
//     } catch (error) {
//         console.error("Error updating recipe:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

router.put("/:id", async (req, res) => {
    try {
        const updaterecipe = await recipe.findOne({ id: req.params.id });
        if (!updaterecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        
        // Update all fields in the recipe with the data from the request body
        Object.assign(updaterecipe, req.body);

        const updatedRecipe = await updaterecipe.save();
        res.status(200).json(updatedRecipe);
    } catch (error) {
        console.error("Error updating recipe:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


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
