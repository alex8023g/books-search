const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const step = 30;

describe('Проверка поиска', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('#req-input').type('js');
  });

  // it('наличие спинера при загрузке книг', () => {
  //   cy.get('#btn-search')
  //     .click()
  //     .then(() => {
  //       cy.get('#circle-progress').should('exist');
  //     });
  // });

  // it('отсутствие спинера после завершения загрузки книг', () => {
  //   cy.get('#btn-search')
  //     .click()
  //     .then(async () => {
  //       await sleep(2000);
  //       cy.get('#circle-progress').should('not.exist');
  //     });
  // });

  // it('наличие результатов поиска', () => {
  //   cy.get('#btn-search')
  //     .click()
  //     .then(() => {
  //       cy.get('li').should('have.length', step);
  //     });
  // });

  // it('работа кнопки Load more', () => {
  //   cy.get('#btn-search')
  //     .click()
  //     .then(async () => {
  //       await sleep(2000);
  //     })
  //     .then(() => {
  //       cy.get('#load-more-btn').click();
  //     })
  //     .then(() => {
  //       cy.get('li').should('have.length', step * 2);
  //     });
  // });

  // it('работа меню категории', () => {
  //   cy.get('#btn-search')
  //     .click()
  //     .then(async () => {
  //       cy.get('#category-select-menu').click();
  //       await sleep(2000);
  //     })
  //     .then(async () => {
  //       cy.contains('Компьютеры').click();
  //       await sleep(2000);
  //     })
  //     .then(() => {
  //       cy.get('.MuiChip-label').each(($el) => {
  //         expect($el[0].textContent).to.equal('Computers');
  //       });
  //     });
  // });

  // it('работа меню сортировки', () => {
  //   cy.get('#btn-search')
  //     .click()
  //     .then(async () => {
  //       cy.get('#sort-select').click();
  //     })
  //     .then(async () => {
  //       cy.contains('По новизне').click();
  //       await sleep(2000);
  //     })
  //     .then(() => {
  //       cy.get('li').should('have.length', step);
  //     });
  // });

  it('просмотр детальной информации о книге', () => {
    cy.get('#btn-search')
      .click()
      .then(async () => {
        await sleep(2000);
      })
      .then(() => {
        cy.get('li > div').eq(0).click();
      })
      .then(() => {
        cy.get('h2').contains('Book details');
      });
  });
});
