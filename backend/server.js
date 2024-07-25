import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';

const port = 3000;
const app = express();
app.use(cors({
    origin: '*',
}));

const pathname = './backend/data/data.json';
let data = JSON.parse(readFileSync(pathname, 'utf8'));

app.use(express.json());

app.get("/users", (req, res) => {
    res.send({
        message: "Hello, world!",
        data
    });
});

app.get("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const foundUser = data.find(u => u.id == userId);

    res.send({
        data: foundUser
    });
});

app.post("/users", (req, res) => {
    const newUser = req.body;

    newUser.id = data.length ? data[data.length - 1].id + 1 : 1;
    data.push(newUser);

    writeFileSync(pathname, JSON.stringify(data, null, 2));

    res.send("Successfully posted new user");
});

app.patch("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const newUserData = req.body;
    const userIndex = data.findIndex(u => u.id == userId);

    if (userIndex !== -1) {
        data[userIndex] = { ...data[userIndex], ...newUserData };
        writeFileSync(pathname, JSON.stringify(data, null, 2));

        res.send("Successfully updated user data");
    } else {
        res.status(404).send("404 NOT FOUND USER");
    }
});

app.put("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const newUserData = req.body;
    const userIndex = data.findIndex(u => u.id == userId);

    if (userIndex !== -1) {
        const updatedUser = { ...data[userIndex] };

        if ('id' in newUserData) updatedUser.id = newUserData.id;
        if ('name' in newUserData) updatedUser.name = newUserData.name;
        if ('phone' in newUserData) updatedUser.phone = newUserData.phone;
        if ('password' in newUserData) updatedUser.password = newUserData.password;
        if ('username' in newUserData) updatedUser.username = newUserData.username;
        if ('user_image' in newUserData) updatedUser.user_image = newUserData.user_image;

        data.splice(userIndex, 1, updatedUser);
        writeFileSync(pathname, JSON.stringify(data, null, 2));

        res.send({
            message: "Successfully updated user data",
            data: updatedUser
        });
    } else {
        res.status(404).send("404 NOT FOUND USER");
    }
});

app.delete("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const deletedUserIndex = data.findIndex((u) => u.id == userId);

    if (deletedUserIndex !== -1) {
        data.splice(deletedUserIndex, 1);
        writeFileSync(pathname, JSON.stringify(data, null, 2));
        res.send("Successfully deleted user data");
    } else {
        res.status(404).send("User not found");
    }
});

app.listen(port, () => {
    console.log(`Server running at ${port}...`);
});
