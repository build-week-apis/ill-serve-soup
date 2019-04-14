exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("items")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("items").insert([
        {
          id: 1,
          name: "Stone fruit",
          amount: 12,
          unit: "lbs",
          image: "https://i.imgur.com/SCAVfIV.jpg",
          categoryID: 2
        },
        {
          id: 2,
          name: "carrots",
          amount: 15,
          unit: "lbs",
          image: "https://i.imgur.com/NdX1vFQ.jpg",
          categoryID: 1
        },
        {
          id: 3,
          name: "cereal",
          amount: "3",
          unit: "gal",
          image: "https://i.imgur.com/dGWUJEj.jpg",
          categoryID: 4
        },
        {
          id: 4,
          name: "cheese",
          amount: "5",
          unit: "lbs",
          image: "https://i.imgur.com/Tl318Os.jpg",
          categoryID: 4
        },
        {
          id: 5,
          name: "bread",
          amount: "3",
          unit: "lbs",
          image: "https://i.imgur.com/mUyhf6x.jpg",
          categoryID: 9
        },
        {
          id: 6,
          name: "bacon",
          amount: "3",
          unit: "lbs",
          image: "https://i.imgur.com/wIoynYP.jpg",
          categoryID: 7
        },
        {
          id: 7,
          name: "Chunky",
          amount: "5",
          unit: "lbs",
          image: "https://i.imgur.com/sIshItO.jpg",
          categoryID: 8
        }
      ]);
    });
};
