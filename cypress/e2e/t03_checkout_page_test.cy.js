describe('checkout page', () => {
    it('checkout_with_product_valid', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.product_sort_container').select('Name (A to Z)')
        cy.contains('ADD TO CART').click()
        cy.contains('ADD TO CART').click()
        cy.contains('ADD TO CART').click()
        cy.get('.svg-inline--fa.fa-shopping-cart.fa-w-18.fa-3x')
                .should('exist')
                .click()
        cy.url().should('eq', 'https://www.saucedemo.com/v1/cart.html')
        cy.get('.btn_action.checkout_button').click()
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html')
        cy.get('#first-name').type('Sholeh')
                            .should('have.value', 'Sholeh')
        cy.get('#last-name').type('Ganteng')
                            .should('have.value', 'Ganteng')
        cy.get('#postal-code').type('Mojokerto')
                              .should('have.value', 'Mojokerto')
        cy.get('.btn_primary.cart_button').click()

        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-two.html')

        // cek jumlah barang sama dengan harga
        
        let total = 0;

        cy.get('.inventory_item_price').each(($el, index, $list) => {
        const priceText = $el.text();
        const price = parseFloat(priceText.replace('$', ''));

        if (price === 29.99) {
            total += price;
        }
        })

        cy.log(total)
        // cek jumlah barang sama dengan harga

        cy.get('.btn_action.cart_button').click()
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-complete.html')
        cy.contains('THANK YOU FOR YOUR ORDER').should('be.visible')
        cy.contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!').should('be.visible')
        
    });

    it('checkout_product_without_information', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.product_sort_container').select('Name (A to Z)')
        cy.contains('ADD TO CART').click()
        cy.contains('ADD TO CART').click()
        cy.contains('ADD TO CART').click()
        cy.get('.svg-inline--fa.fa-shopping-cart.fa-w-18.fa-3x')
                .should('exist')
                .click()
        cy.url().should('eq', 'https://www.saucedemo.com/v1/cart.html')
        cy.get('.btn_action.checkout_button').click()
        cy.url().should('eq', 'https://www.saucedemo.com/v1/checkout-step-one.html')
        cy.get('.btn_primary.cart_button').click()
        cy.contains('Error: First Name is required').should('exist')
        cy.get('#first-name').type('Sholeh')
                            .should('have.value', 'Sholeh')
        cy.get('.btn_primary.cart_button').click()
        cy.contains('Error: Last Name is required').should('exist')
        cy.get('#last-name').type('Ganteng')
                            .should('have.value', 'Ganteng')
        cy.get('.btn_primary.cart_button').click()
        cy.contains('Error: Postal Code is required').should('exist')
        

    });

    it('checkout_without_product ', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.svg-inline--fa.fa-shopping-cart.fa-w-18.fa-3x')
        .should('exist')
        .click()
        cy.url().should('eq', 'https://www.saucedemo.com/v1/cart.html')
        cy.get('.btn_action.checkout_button').click()
        cy.contains('There are no products in the cart').should('exist'); //cek apakah ada tulisan tesebut
    });
    
});