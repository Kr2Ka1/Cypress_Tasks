// / <reference types="cypress" />

describe('Cypress Testų Scenarijai', () => {
  // Prieš kiekvieną testą atidaro pagrindinį puslapį
  
  beforeEach(() => {
    // JŪSŲ KODAS 
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  describe('1. Pagrindinio puslapio testas', () => {
    it('Patikrina, ar banner yra matomas ir mygtuko paspaudimas pakeičia URL', () => {
      // Patikriname, ar banner yra matomas ir turi teisingą tekstą - koks yra teisingas tekstas? Koks jis turėtų būti?
      // JŪSŲ KODAS
      cy.get('.banner').should('exist').contains('Sveiki atvykę į Cypress testų puslapį!').should('be.visible');
      
      // Gauname alert pranešimą ir patikriname jo tekstą
      // JŪSŲ KODAS 
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.eq('Navigacija į /commands/actions atlikta!');
      });
      cy.get('#section-basic').find('button#action-type').click();
      // Paspaudžiame mygtuką "type"
      // JŪSŲ KODAS 
      cy.get('#section-basic').find('button#action-type').should('be.visible').click();
      // Patikriname, ar URL įtraukia "/commands/actions"
      // JŪSŲ KODAS 
      cy.url().should('include', '/commands/actions');
    });
  });

  describe('2. Prisijungimo formos testas', () => {
    it('Užpildo formą ir rodo sveikinimo žinutę bei profilio informaciją', () => {
      // Sukuriame kintamuosius su prisijungimo duomenimis ir juos įvedame į formą
      // JŪSŲ KODAS
      cy.get('input#username').type('Vardas');
      cy.get('input#password').type('Slaptazodis');
      cy.get('#login-form').find('button#login-button').should('be.visible').click();
      // Patikriname, ar rodoma sveikinimo žinutė
      // JŪSŲ KODAS
      cy.contains('div#greeting', 'Sveiki,').should('be.visible');
      // Patikriname, ar rodoma profilio informacija
      // JŪSŲ KODAS
      cy.contains('div#profile', 'Čia yra studento profilio informacija.').should('be.visible');
    });
  });

  describe('3. Dinaminių elementų testas', () => {
    it('Patikrina, ar visi sąrašo elementai turi žodį "Item"', () => {
      // Randame visus sąrašo elementus ir patikriname, ar jie turi žodį "Item"
      // JŪSŲ KODAS
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
      // JŪSŲ KODAS
      // Paspaudžiame mygtuką, kuris iškviečia fetch užklausą
      // JŪSŲ KODAS
      // Laukiame, kol užklausa bus atlikta
      // JŪSŲ KODAS
      // Patikriname, ar .data-container elemente rodomi stubinto atsakymo duomenys
      // JŪSŲ KODAS
    });
  });

  describe('5. Asinchroninės operacijos testas', () => {
    it('Patikrina, ar asinchroninė operacija baigiasi teisingai', () => {
      // Paspaudžiame mygtuką, kuris iškviečia asinchroninę operaciją
      // JŪSŲ KODAS
      // Iškart po paspaudimo turi būti rodomas pranešimas
      // JŪSŲ KODAS
      // Laukiame, kol asinchroninė operacija baigsis (naudojame šiek tiek ilgesnį timeout)
      // JŪSŲ KODAS
    });
  });

  describe('6. Hover efekto testas', () => {
    it('Rodo tooltip, kai užvedama pele ant hover-box', () => {
      // Iš pradžių tooltip neturėtų būti matomas
      // JŪSŲ KODAS
      // Simuliuojame pelės užvedimą ant elemento
      // JŪSŲ KODAS
      // Simuliuojame pelės nuvedimą nuo elemento
      // JŪSŲ KODAS
    });
  });
});
