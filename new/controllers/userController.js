const fs = require('fs');
const users = require('../Users.json');

exports.getAllUsers = (req, res) => {
    res.json(users);
};

exports.getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
};

exports.createUser = (req, res) => {
    const newUser = req.body;

    if (!newUser.name || !newUser.id) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const newId = parseInt(newUser.id);

    const existingUser = users.find(u => u.id === newId);

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    newUser.id = newId;
    users.push(newUser);

    fs.writeFile('./Users.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving data" });
        }

        res.status(201).json({ message: "User added", user: newUser });
    });
};

exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);

    fs.writeFile('./Users.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting user" });
        }

        res.json({ message: "User deleted" });
    });
};

exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (updates.id) {
        return res.status(400).json({ message: "ID cannot be updated" });
    }

    Object.assign(user, updates);

    fs.writeFile('./Users.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error updating user" });
        }

        res.json({ message: "User updated", user });
    });
};