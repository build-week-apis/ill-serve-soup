exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("categories")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("categories").insert([
        { id: 1, name: "chicken" },
        { id: 2, name: "fruits" },
        { id: 3, name: "herbal" },
        { id: 4, name: "proteins" },
        { id: 5, name: "cream" },
        { id: 6, name: "instant" },
        { id: 7, name: "noodle" },
        { id: 8, name: "fish" },
        { id: 9, name: "bread" },
        { id: 10, name: "Bisque" }
      ]);
    });
};
