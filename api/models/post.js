var mongoose = require('mongoose');
var moment = require('moment');

var PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String] },
    date: { type: Date, required: true, default: Date.now },
    author: { type: mongoose.Schema.ObjectId, ref: 'User' },
    categories: [{ type: mongoose.Schema.ObjectId, ref: 'Category' }],
    location: { type:  mongoose.Schema.Types.Mixed },
    comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }],
    likes: { type: Number, default: 0 },
    youtube: { type: String },
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

PostSchema.virtual('year').get(function() {
    return moment(this.date).format('YYYY');
});

PostSchema.virtual('month').get(function() {
    return moment(this.date).format('MM');
});

// Index posts in descending order
PostSchema.index({ date: -1 });
// Index posts by user and in descending order
PostSchema.index({ author: 1, date: -1 });

module.exports = mongoose.model('Post', PostSchema);
