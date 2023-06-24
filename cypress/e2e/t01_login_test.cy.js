describe('login page test', () => {

  //login success

  it('login_success', () => {
    cy.visit('https://www.saucedemo.com/v1/index.html')
    cy.get('#user-name').should('be.enabled')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').should('be.enabled')
    cy.get('#password').type('secret_sauce')
    cy.get('.btn_action').should('be.enabled')
    cy.get('.btn_action').click()
    cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory.html')
    cy.get('.product_label')
      .should('contain', 'Product')
    cy.get('img.inventory_item_img').should('have.prop', 'naturalWidth').and('be.greaterThan', 0);
  })

  // login failed username

  it('login_failed_username', () => {
    cy.visit('https://www.saucedemo.com/v1/index.html')
    cy.get('#user-name').type('no_standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('.btn_action').click()
    cy.get('h3[data-test="error"]')
      .should('be.visible')
      .should('contain','Username and password do not match any user in this service')

  })

  // login failed password
  
  it('login_failed_password', () => {
    cy.visit('https://www.saucedemo.com/v1/index.html')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('12345')
    cy.get('.btn_action').click()
    cy.get('h3[data-test="error"]')
      .should('be.visible')
      .should('contain','Username and password do not match any user in this service')

  })

  // login lockout_user

  it('login_lockout_user', () => {
    cy.visit('/v1/index.html')
    cy.get('#user-name').type('locked_out_user')
    cy.get('#password').type('secret_sauce')
    cy.get('.btn_action').click()
    cy.get('h3[data-test="error"]')
      .should('be.visible')
      .should('contain','Sorry, this user has been locked out.')

  })

  // login with blank username

  it('login_with_blank_username', () => {
    cy.visit('/v1/index.html')
    cy.get('#password').type('secret_sauce')
    cy.get('.btn_action').click()
    cy.get('h3[data-test="error"]')
      .should('be.visible')
      .should('contain','Username is required')

  })

    // login with blank password

    it('login_with_blank_password', () => {
      cy.visit('/v1/index.html')
      cy.get('#user-name').type('standard_user')
      cy.get('.btn_action').click()
      cy.get('h3[data-test="error"]')
        .should('be.visible')
        .should('contain','Password is required')
  
    })

    // login with blank username and password

    it('login_with_blank_username_and_password', () => {
      cy.visit('/v1/index.html')
      cy.get('.btn_action').click()
      cy.get('h3[data-test="error"]')
        .should('be.visible')
        .should('contain','Username is required')
  
    })

        // login with blank username and password

    it('login_with_blank_username_and_password', () => {
      cy.visit('/v1/index.html')
      cy.get('.btn_action').click()
      cy.get('h3[data-test="error"]')
        .should('be.visible')
        .should('contain','Username is required')
  
    })

            // login with problem_user

    it('login_with_problem_user', () => {
      cy.visit('/v1/index.html')
      cy.get('#user-name').type('problem_user')
      cy.get('#password').type('secret_sauce')
      cy.get('.btn_action').click()
      cy.get('img.inventory_item_img').should('have.prop', 'complete', true);
      cy.get('img.inventory_item_img').should('be.visible');
      // cy.get('img.inventory_item_img').should('have.prop', 'naturalWidth').and('be.greaterThan', 0);
      //check apakah gambar terload dengan sempurna atau tidak
      cy.get('img.inventory_item_img')
      .should('be.visible')
      .should('have.prop', 'naturalWidth')
      .and('equal', 0);
      
    })

    

})
