exports.up = function(knex, Promise) {
  return knex.schema.createTable("items", table => {
    table.increments();
    table
      .string("name", 128)
      .notNullable()
      .unique();
    table.integer("amount").notNullable();
    table.string("unit");
    table.float("price");
    table.string("supplier_name", 128);
    table.string("supplier_contact", 128);
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
