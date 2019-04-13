exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          name: "Mihai",
          email: "mihsi@yahoo.com",
          password: "123",
          role: "manager"
        },
        {
          id: 2,
          name: "Ion",
          email: "ion@yahoo.com",
          password: "123",
          role: "volunteer"
        },
        {
          id: 3,
          name: "Maria",
          email: "maria@yahoo.com",
          password: "123",
          role: "manager"
        }
      ]);
    });
};
