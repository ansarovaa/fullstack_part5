describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user1 = {
      name: 'Anar Ansarova',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('#logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salaine')
      cy.get('#login-button').click()

      cy.get('.error')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('Show Add blog form').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('Koldun')
      cy.get('#url').type('avk.com')
      cy.get('#like').type('4')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    it('A blog can be liked', function() {
      cy.contains('Show Add blog form').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('Koldun')
      cy.get('#url').type('avk.com')
      cy.get('#like').type('4')
      cy.contains('save').click()
      cy.contains('View').click()
      cy.contains('Like').click()
    })

  })
  describe('Blog manipulation', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'another note cypress',
        author: 'Bilan',
        url: 'www.vk.com',
        likes: 4
      })
    })

    it('A blog can be removed by its author', function() {
      cy.contains('Remove').click()
    })
   
    it('A blog can not be removed by author', function() {
      cy.get('#logout').click()
      cy.login({ username: 'test', password: 'test' })
      cy.get('Remove').should('not.exist')
    })

  })


})