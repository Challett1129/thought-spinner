const { Thought, User } = require('../models');

const thoughtController = {
    //returns all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'username',
            select: '-_id  -__v -email'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    },

    //finds a thought by its id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'username',
            select: '-_id  -__v -email'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with that id!' })
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //creates a thought
    createThought({ body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: { thoughts: _id } },
                { new: true, runValidators: true }
            )
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    //add a reaction to a thought (like a reply)
    addReaction({ body, params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that id!' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //delete a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: params.reactionId } },
            { new: true }
        )
    },

    //update a thought by its id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that id!' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that id!' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
    

}

module.exports = thoughtController