const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // PATAISYTA iš "bcrypt" → "bcryptjs"

// Vartotojo schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String },
    country: { type: String },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Slaptažodžio šifravimas prieš išsaugant
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Slaptažodžio patikrinimas
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
