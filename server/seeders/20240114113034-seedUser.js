'use strict';
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const hashpass = await bcrypt.hash("admin123",10);
    await queryInterface.bulkInsert('Users', 
    [
      {
        name: "tania",
        email: "tania123@gmail.com",
        password: hashpass,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "jamet",
        email: "jamet1945@gmail.com",
        password: hashpass,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
