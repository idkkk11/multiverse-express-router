const { Router } = require("express")
const Fruit = require("../models/Fruit")
const { check, validationResult } = require("express-validator")

const fruitRouter = Router()

fruitRouter.get("/", async (req, res) => {
    const allFruits = await Fruit.findAll()
    res.json(allFruits)
})

fruitRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    const theFruit = await Fruit.findOne({
        where: { id: id }
    })
    res.json(theFruit)
})

fruitRouter.post("/", [
    check("color").not().isEmpty().trim()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
    }
    else {
        const { name, color } = req.body
        await Fruit.create({
            name: name,
            color: color
        })
        const newList = await Fruit.findAll()
        res.json(newList)
    }
})

fruitRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const { name, color } = req.body
    await Fruit.update({
        name: name,
        color: color
    }, {
        where: { id: id }
    })
    const newList = await Fruit.findAll()
    res.json(newList)
})

fruitRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    await Fruit.destroy({
        where: { id: id }
    })
    const newList = await Fruit.findAll()
    res.json(newList)
})

module.exports = {
    fruitRouter
}