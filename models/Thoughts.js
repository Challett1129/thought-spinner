const { Schema, model, Types } = require('mongoose');
const dateFormatter = require('../utils/dateFormatter');

const ReactionSchema = new Schema({ 
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: (timeStamp) => dateFormatter(timeStamp)
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        get: (timeStamp) => dateFormatter(timeStamp)
    },
    username: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

//get all replies to a user's thought
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);


module.exports = Thought;