import { Schema, model, Document, Types } from 'mongoose';
import reactionSchema from './Reaction.js';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.DocumentArray<typeof reactionSchema>;
  reactionCount: number;
}

// Schema to create Thought model
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

export default Thought;
