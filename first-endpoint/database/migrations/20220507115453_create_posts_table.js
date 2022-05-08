exports.up = async function(knex) {
    await knex.raw(` Create extension if not exists "uuid-ossp"`);
    return knex.schema.createTable("posts_table", function (table) {
        table.uuid("post_id")
            .notNullable()
            .primary()
            .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("post_title", 255).notNullable();
        table.string("post_author", 255).notNullable().defaultTo("John Doe");
        table.text("post_content").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("posts_table");
};