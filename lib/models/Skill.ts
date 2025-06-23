import mongoose, { Schema } from 'mongoose';

const SkillSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Programming', 'Language', 'Physical', 'Creative'],
    required: true,
  },
  initialProficiency: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  currentProficiency: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  lastPracticed: {
    type: Date,
    default: Date.now,
  },
  decayRate: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
