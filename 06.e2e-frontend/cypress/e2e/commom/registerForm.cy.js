class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    urlFeedback: () => cy.get('#urlFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    submitBtn: () => cy.get('#btnSubmit'),
  }

  typeTitle(text) {
    if(!text) return
    this.elements.titleInput().type(text)
  }

  typeUrl(url) {
    if(!url) return
    this.elements.imageUrlInput().type(url)
  }

  clickSubmit() {
    this.elements.submitBtn().click()
  }
}

export const registerForm = new RegisterForm()