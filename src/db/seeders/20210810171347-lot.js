const numberOfLots = 10;

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('lot', [
      ...Array(numberOfLots).map(() => ({})),
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('lots', null, {});
  },
};
