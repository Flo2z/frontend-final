const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            maxLength: [50, "Category name cannot exceed 50 characters"],
            unique: true,
        },
        type: {
            type: String,
            required: [true, "Category type is required"],
            enum: ["income", "expense"],
            default: "expense",
        },
        monthlyBudget: {
            type: Number,
            default: 0,
            validate: {
                validator: function (value) {
                    // Only require monthlyBudget for expense type
                    return this.type === "expense" ? value >= 0 : true;
                },
                message: "Monthly budget must be a non-negative number for expense categories",
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);