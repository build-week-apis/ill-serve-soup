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
          price: 6.3,
          supplier_name: "Est products",
          supplier_contact: "est@yahoo.com",
          image: "https://i.imgur.com/SCAVfIV.jpg",
          categoryID: 2
        },
        {
          id: 2,
          name: "carrots",
          amount: 15,
          unit: "lbs",
          price: 2.3,
          supplier_name: "Nord products",
          supplier_contact: "nord@yahoo.com",
          image: "https://i.imgur.com/NdX1vFQ.jpg",
          categoryID: 1
        },
        {
          id: 3,
          name: "cereal",
          amount: 3,
          unit: "gal",
          price: 13.2,
          supplier_name: "First products",
          supplier_contact: "first@yahoo.com",
          image: "https://i.imgur.com/dGWUJEj.jpg",
          categoryID: 4
        },
        {
          id: 4,
          name: "cheese",
          amount: 5,
          unit: "lbs",
          price: 3.3,
          supplier_name: "West products",
          supplier_contact: "west@yahoo.com",
          image: "https://i.imgur.com/Tl318Os.jpg",
          categoryID: 4
        },
        {
          id: 5,
          name: "bread",
          amount: 3,
          unit: "lbs",
          price: 20.3,
          supplier_name: "Premium products",
          supplier_contact: "premium@yahoo.com",
          image: "https://i.imgur.com/mUyhf6x.jpg",
          categoryID: 9
        },
        {
          id: 6,
          name: "bacon",
          amount: 3,
          unit: "lbs",
          price: 7.3,
          supplier_name: "Banana products",
          supplier_contact: "banana@yahoo.com",
          image: "https://i.imgur.com/wIoynYP.jpg",
          categoryID: 7
        },
        {
          id: 7,
          name: "Chunky",
          amount: 5,
          unit: "lbs",
          price: 23.3,
          supplier_name: "State products",
          supplier_contact: "state@yahoo.com",
          image: "https://i.imgur.com/sIshItO.jpg",
          categoryID: 8
        }
      ]);
    });
};
