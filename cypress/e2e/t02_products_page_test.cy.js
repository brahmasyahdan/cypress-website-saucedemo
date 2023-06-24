describe('products test page', () => {

    //to product page without login
    it('to_product_page_without_login', () => {
        cy.visit('https://www.saucedemo.com/v1/inventory.html')
        
    });

    // products image click
    it('product_image_can_be_click', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('img.inventory_item_img').should('be.visible')
        cy.get('#item_4_title_link').click()
        cy.url().should('eq', 'https://www.saucedemo.com/v1/inventory-item.html?id=4')
        
    });

    // products title click
    it('product_title_can_be_click', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.inventory_item_name')
            .contains('Sauce Labs Backpack')
            .click()
        cy.url().should('eq','https://www.saucedemo.com/v1/inventory-item.html?id=4')
    });

    //check sorting product a to z
    it('dropdown_name_a_to_z', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.product_sort_container').select('Name (A to Z)')
        // cek mengurutkan dari a-z
        cy.get('.inventory_item_name')
        .then($elements => {
        const items = $elements.toArray().map($el => $el.innerText);
        const sortedItems = items.sort();
        expect(sortedItems).to.deep.equal(items);
        });
    });

    //check sorting product z to a
    it('dropdown_name_z_to_a', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.product_sort_container').select('Name (Z to A)')
        // cek mengurutkan dari a-z
        cy.get('.inventory_item_name')
        .then($elements => {
          const itemNames = $elements.toArray().map($el => $el.innerText);
          const sortedItemNames = [...itemNames].sort().reverse();
          expect(itemNames).to.deep.equal(sortedItemNames);
        });
    });

    //check sorting product pirce low to high
    it('dropdown_low_to_high', () => {
        cy.login('standard_user', 'secret_sauce');
        cy.get('.product_sort_container').select('Price (low to high)');
        // cek mengurutkan harga dari terkecil ke terbesar
        cy.get('.inventory_item_price')
        .then($elements => {
          const itemPrices = $elements.toArray().map($el => parseFloat($el.innerText.replace('$', '')));
          const sortedItemPrices = [...itemPrices].sort((a, b) => a - b);
  
          expect(itemPrices).to.deep.equal(sortedItemPrices);
        });
        
    });

    //check sorting product pirce high to low
    it('dropdown_high_to_low', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.product_sort_container').select('Price (high to low)')
        // cek mengurutkan harga dari terkecil ke terbesar
        cy.get('.inventory_item_price') // Ganti dengan selector yang sesuai untuk elemen inventory_item_price
        .then($elements => {
            const itemPrices = $elements.toArray().map($el => parseFloat($el.innerText.replace('$', '')))
            const sortedItemPrices = [...itemPrices].sort((a, b) => b - a)

        expect(itemPrices).to.deep.equal(sortedItemPrices)
      })
        
    });

});

describe('add to card test on products page', () => {
    //check add to card
    it('check_add_to_card', () => {
        cy.login('standard_user', 'secret_sauce')
        cy.get('.product_sort_container').select('Name (A to Z)')

        cy.contains('ADD TO CART').click() //Menggunakan contains
        cy.contains('ADD TO CART').click() //Menggunakan contains
        // // const buttonAddToCardXPath = '//*[@id="inventory_container"]/div/div[1]/div[3]/button'; // Contoh XPath tapi error
        // cy.xpath(buttonAddToCardXPath).click();
        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .should('have.text', '2')
    });
    //check remove to card
    it('check_remove_to_card', () => {

        cy.login('standard_user','secret_sauce')
        cy.get('.product_sort_container').select('Name (A to Z)')
        //chec add....................
        cy.contains('ADD TO CART').click() //Menggunakan contains
        cy.contains('ADD TO CART').click() //Menggunakan contains
        cy.contains('ADD TO CART').click() //Menggunakan contains
        // // const buttonAddToCardXPath = '//*[@id="inventory_container"]/div/div[1]/div[3]/button'; // Contoh XPath tapi error
        // cy.xpath(buttonAddToCardXPath).click();
        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .should('have.text', '3')
        //check remove.................
        cy.contains('REMOVE').click()
        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .should('have.text', '2')
    });
});
