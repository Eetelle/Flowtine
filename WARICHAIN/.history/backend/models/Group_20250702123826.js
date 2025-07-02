// models/Group.js
import mongoose from 'mongoose';

const ContributionSchema = new mongoose.Schema({
  memberName: String,
  amount: Number,
  paid: { type: Boolean, default: true },
});

const GroupSchema = new mongoose.Schema({
  groupName: String,
  targetAmount: Number,
  deadline: String,
  hashKey: String,
  members: String,
  contributions: [ContributionSchema],
});

// ✅ Exporter par défaut (important)
const Group = mongoose.model('Group', GroupSchema);
export default Group;
