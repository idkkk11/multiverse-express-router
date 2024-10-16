const { Router } = require("express")
const User = require("../models/User")
const { check, validationResult } = require("express-validator")

const userRouter = Router()

userRouter.get("/", async (req, res) => {
    const allUsers = await User.findAll()
    res.json(allUsers)
})

userRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    const theUser = await User.findOne({
        where: { id: id }
    })
    res.json(theUser)
})

userRouter.post("/", [
    check("name").not().isEmpty().trim()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({errors: errors.array()})
    }
    else {
        const { name, age } = req.body
        await User.create({
            name: name,
            age: age
        })
        const newList = await User.findAll()
        res.json(newList)
    }
})

userRouter.put("/:id", async (req, res) => {
    const id = req.params.id
    const { name, age } = req.body
    await User.update({
        name: name,
        age: age
    }, {
        where: { id: id }
    })
    const newList = await User.findAll()
    res.json(newList)
})

userRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    await User.destroy({
        where: { id: id }
    })
    const newList = await User.findAll()
    res.json(newList)
})

module.exports = {
    userRouter
}