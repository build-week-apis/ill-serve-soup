exports.up = function(knex, Promise) {
  return knex.schema.createTable("items", table => {
    table.increments();
    table
      .string("name", 128)
      .notNullable()
      .unique();
    table.integer("amount").notNullable();
    table.string("unit");
    table.string("image");
    table
      .integer("categoryID")
      .unsigned()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("items");
};
