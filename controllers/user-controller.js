const { User, Thought } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts friends',
            select: '-__v -_id'
        })
        .select('-__v')
        //leave room to .populate User posts (thoughts)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
    },

    //get one user by their ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts friends',
            select: '-__v -_id'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                 res.status(404).json({ message: 'No user found with this id!' })
                 return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create a user 
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    //add a friend to user friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'No user with this id found!'})
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //delete a friend from a friends list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'No user with this id found!'})
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    
    //update a user
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },



    //delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' })
                }
                return Thought.deleteMany({ username: dbUserData.username })
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;