/// <reference types="cypress" />

describe('Cypress Testų Scenarijai', () => {
  // Prieš kiekvieną testą atidaro pagrindinį puslapį

  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  describe('1. Pagrindinio puslapio testas', () => {
    it('Patikrina, ar banner yra matomas ir mygtuko paspaudimas pakeičia URL', () => {
      // Patikriname, ar banner yra matomas ir turi teisingą tekstą - koks yra teisingas tekstas? Koks jis turėtų būti?
      cy.get('.banner')
        .should('be.visible')
        .contains('Sveiki atvykę į Cypress testų puslapį!');
      // Gauname alert pranešimą ir patikriname jo tekstą
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.eq('Navigacija į /commands/actions atlikta!');
      });
      cy.get('#section-basic').find('button#action-type').click();
      // Paspaudžiame mygtuką "type"
      cy.get('#section-basic').find('button#action-type').should('be.visible').click();
      // Patikriname, ar URL įtraukia "/commands/actions"
      cy.url().should('include', '/commands/actions');
    });
  });

  describe('2. Prisijungimo formos testas', () => {
    it('Užpildo formą ir rodo sveikinimo žinutę bei profilio informaciją', () => {
      // Sukuriame kintamuosius su prisijungimo duomenimis ir juos įvedame į formą
      const username = 'Vardas';
      const password = 'Slaptazodis';
      cy.get('input#username').type(username);
      cy.get('input#password').type(password);
      cy.get('#login-form').find('button#login-button').should('be.visible').click();
      // Patikriname, ar rodoma sveikinimo žinutė
      cy.contains('div#greeting', ` ${username}`).should('be.visible');
      // Patikriname, ar rodoma profilio informacija
      cy.contains('div#profile', 'Čia yra studento profilio informacija.').should('be.visible');
    });
  });

  describe('3. Dinaminių elementų testas', () => {
    it('Patikrina, ar visi sąrašo elementai turi žodį "Item"', () => {
      // Randame visus sąrašo elementus ir patikriname, ar jie turi žodį "Item"
      cy.get('#section-list li').each(($el) => {
        cy.wrap($el).should('contain.text', 'Item');
      }); //pasitikslinti kas yra $el? Ai kodas
    });
  });

  describe('4. API užklausų testas', () => {
    it('Stubina API užklausą ir rodo stubintus duomenis', () => {
      // Paruoštas stubintas atsakymas
      const stubbedData = {
        userId: 1,
        id: 1,
        title: 'Stubbed API Post Title',
        body: 'Stubbed API Post Body'
      };

      // Interceptuojame GET užklausą į JSONPlaceholder API
      cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1', {
        statusCode: 200,
        body: stubbedData
      }).as('getPost');
      // Paspaudžiame mygtuką, kuris iškviečia fetch užklausą
      cy.get('#fetch-data').click();
      // Laukiame, kol užklausa bus atlikta
      cy.wait('@getPost');
      // Patikriname, ar .data-container elemente rodomi stubinto atsakymo duomenys
      cy.get('.data-container').within(() => {
        cy.get('h3').should('contain', stubbedData.title);
        cy.get('p').should('contain', stubbedData.body);
      });
    });
  });

  describe('5. Asinchroninės operacijos testas', () => {
    it('Patikrina, ar asinchroninė operacija baigiasi teisingai', () => {
      // Paspaudžiame mygtuką, kuris iškviečia asinchroninę operaciją
      cy.get('#async-action').click();
      // Iškart po paspaudimo turi būti rodomas pranešimas
      cy.get('#async-result').should('be.visible')
        .and('to.have.text', 'Operacija prasidėjo...');
      // Laukiame, kol asinchroninė operacija baigsis (naudojame šiek tiek ilgesnį timeout)
      cy.get('#async-result', { timeout: 3000 }).should('have.text', 'Asinchroninė operacija baigta!');
    });
  });

  describe('6. Hover efekto testas', () => {
    it('Rodo tooltip, kai užvedama pele ant hover-box', () => {
      // Iš pradžių tooltip neturėtų būti matomas
      cy.get('#tooltip').should('not.be.visible');
      // Simuliuojame pelės užvedimą ant elemento
      cy.get('#hover-box').trigger('mouseover');
      cy.get('#tooltip').should('be.visible').and('contain', 'Papildoma informacija');
      // Simuliuojame pelės nuvedimą nuo elemento
      cy.get('#hover-box').trigger('mouseout');
    });
  });
});
