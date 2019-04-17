exports.up = function(knex, Promise) {
  return knex.schema.createTable("kitchens", table => {
    table.increments();
    table
      .string("name", 200)
      .notNullable()
      .unique();
    table
      .string("location", 500)
      .notNullable()
      .unique();
    table
      .string("mission", 500)
      .notNullable()
      .unique();
    table.float("average_visitors");
    table.string("website");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("kitchens");
};
