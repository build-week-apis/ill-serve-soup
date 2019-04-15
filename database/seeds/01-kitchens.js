exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("kitchens")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("kitchens").insert([
        {
          id: 1,
          name: "The Soup Kitchen",
          location: "123 Smith Street, Brunswick, VIC, 3056",
          mission:
            "Established in 1983, The Soup Kitchen Inc. is a 501 (c)(3) non-profit organization whose goal is to help the less fortunate members of our community.  This includes the elderly, unemployed, underemployed, poor, migrants and homeless – women, men and children",
          average_visitors: 2.4,
          website: "www.thesoupkitchen.com"
        },
        {
          id: 2,
          name: "The Soup Compasion",
          location: "Via Garibaldi 123, 00100 Roma	",
          mission:
            "All of the Compassion Soup Kitchen’s mahi is guided by our vision, mission and values. We strive to ensure our service best fits the needs of people in our community, and honour our mission. We evaluate new and existing services against our vision and mission, and use our values to carry out this work",
          average_visitors: 6.4,
          website: "www.thesoupcompasion.com"
        },
        {
          id: 3,
          name: "Treton Soup Kitchen",
          location: "Javorová 33/A, 123 45 Bratislava 2	",
          mission:
            "With a strong infrastructure managed by a committed and engaged Board and staff, TASK will expand its ability to reach the hungry in the Trenton area and those with the aspiration or responsibility to serve them.",
          average_visitors: 8.6,
          website: "www.tretonkitchen.com"
        }
      ]);
    });
};
