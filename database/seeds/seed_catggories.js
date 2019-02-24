
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, category_name: 'top'},
        {id: 2, category_name: 'bottom'},
        {id: 3, category_name: 'dress'}
      ]);
    });
};

