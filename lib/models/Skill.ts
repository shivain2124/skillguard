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
    trim: true,
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
  practiceHistory: [{
    date: {
      type: Date,
      default: Date.now,
    },
    proficiencyBefore: Number,
    proficiencyAfter: Number,
  }],
  totalPracticeSessions: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

SkillSchema.index({ userId: 1, category: 1 });
SkillSchema.index({ userId: 1, lastPracticed: -1 });

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
