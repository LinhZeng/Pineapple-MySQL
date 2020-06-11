// 表
var User = require('./user'); 
var Work = require('./work');
var Collection = require('./collection');
var Comment = require('./comment');
var Type = require('./type');

/**
 * 关系建立
 */
// 用户-作品 1:N
User.hasMany(Work);
Work.belongsTo(User);
// 用户-收藏 1:N
User.hasMany(Collection);
Collection.belongsTo(User);
// 作品-收藏 1:N
Work.hasMany(Collection);
Collection.belongsTo(Work);
// 用户-评论 1:N
User.hasMany(Comment);
Comment.belongsTo(User);
// 作品-评论 1:N
Work.hasMany(Comment);
Comment.belongsTo(Work);
// 作品-分类 N:N
Work.belongsToMany(Type,{through: 'worktype'})
Type.belongsToMany(Work,{through: 'worktype'})

module.exports = {
    User: User,
    Work: Work,
    Collection: Collection,
    Comment: Comment,
    Type: Type
}