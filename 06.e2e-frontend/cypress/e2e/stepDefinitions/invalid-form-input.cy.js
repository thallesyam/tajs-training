import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { registerForm } from './../commom/registerForm.cy.js'

Then('I should see {string} message above the title field', (text) => {
  registerForm.elements.titleFeedback().should('contain.text', text)
})
 
Then('I should see {string} message above the imageUrl field', (url) => {
  registerForm.elements.urlFeedback().should('contain.text', url )
})