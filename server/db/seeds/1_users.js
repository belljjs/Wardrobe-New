
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => {
      const users = 
          [{
              id: 1,
              first_name: "Jessie",
              last_name: "Jung",
              email: "js@gmail.com",
              pw: "aaa",
              signup_date: null
          }]
      // Even inside of a then-callback, always return the query.
      return knex("users").insert(users);
    });
};