const { Schema, model } = require('mongoose');
const validateEmail = require('../utils/email-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        validate: [validateEmail, 'This is not a valid email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'This is not a valid email']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [this]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

//gets length of friend list
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//create user model
const User = model('User', UserSchema);

//export the user model
module.exports = User;