import mongoose from "mongoose";

const pictureSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  image: {
    type: String, // base64 string
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const pictureModel = mongoose.models.picture || mongoose.model("picture", pictureSchema);

export default pictureModel;
