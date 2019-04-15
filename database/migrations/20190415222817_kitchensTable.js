exports.up = function(knex, Promise) {
  return knex.schema.createTable("kitchens", table => {
    table.increments();
    table
      .string("name", 128)
      .notNullable()
      .unique();
    table
      .string("location", 300)
      .notNullable()
      .unique();
    table
      .string("mission", 300)
      .notNullable()
      .unique();
    table.integer("average_visitors");
    table.string("website");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("kitchens");
};
