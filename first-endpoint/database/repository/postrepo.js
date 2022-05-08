const knex = requireKnex();

const addPost = async ( payload ) => {
    return await knex("posts_table")
      .insert( payload )
      .returning("*");
};

const deletePost = async ( payload ) => {
    return await knex("posts_table")
        .where(payload)
        .del()
        .returning("*");
};

const updatePost = async ( payload ) => {
    return await knex("posts_table")
        .where({
            post_id: payload.post_id,
        })
        .update( payload )
        .returning("*");
};

const viewAllPosts = async ( ) => {
    return await knex("posts_table").returning("*");
}

const viewOnePost = async ( payload ) => {
    return await knex("posts_table").where(payload).first();
}

module.exports = { addPost, deletePost, updatePost, viewAllPosts, viewOnePost };