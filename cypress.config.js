const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl":"https://www.saucedemo.com",
    // untuk baseUrl bisa digunakan tanpa tanda petik ("") dan ketika penggunaan di testcase untuk memanggil fungsinya cukup dengan ('')
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
