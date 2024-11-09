const { model, Schema } = require('mongoose')

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        fullName: String,
        location: String,
        age: Number,
        profilePic: {
            type: String,
            default: 'https://www.kindpng.com/picc/m/301-3014743_logo-cine-web-design-4-circle-hd-png.png'
        },
        visitedCountries: [ {type: Schema.Types.ObjectId, ref: "Country"} ]
    },
    {
        timestamps: true,
        timeseries: true
    }
)

module.exports = model("User", userSchema)

