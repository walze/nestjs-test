const numberOfLots = 10;

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('lots', [
      ...Array(numberOfLots).map(() => ({})),
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('lots', null, {});
  },
};
