describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            username: 'Iso-M',
            name: 'Martti Ahtisaari',
            password: 'bigmoneymartti'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function () {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
    })

    describe('login', function () {
        it('succeeds with valid credentials', function () {
            cy.get('#username-input').type('Iso-M')
            cy.get('#password-input').type('bigmoneymartti')
            cy.get('#login-button').click()

            cy.contains('Martti Ahtisaari is logged in')
        })

        it('fails with invalid credentials', function () {
            cy.get('#username-input').type('Big Bad T')
            cy.get('#password-input').type('h4ckert4rja')
            cy.get('#login-button').click()

            cy.get('html').should('not.contain', 'Big Bad T is logged in')

            cy.get('.notification')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'Iso-M', password: 'bigmoneymartti' })

            cy.createBlog({
                title: 'A blog already in the database',
                author: 'Author C.Y. Press',
                url: 'www.cypressurl.com'
            })
        })

        it('a new blog can be created', function () {
            cy.createBlog({
                title: 'A blog created by cypress',
                author: 'Author C.Y. Press',
                url: 'www.cypressurl.com'
            })

            cy.get('html').should('contain', 'A blog created by cypress')
        })

        it('a blog can be liked', function () {
            cy.get('#view-button').click()
            cy.contains('likes')
                .contains('0')

            cy.get('#like-button').click()
            cy.contains('likes')
                .contains('1')
        })

        it('blog creator can delete their blog', function () {
            cy.get('html').should('contain', 'A blog already in the database')

            cy.get('#view-button').click()
            cy.get('#remove-button').click()

            cy.get('html').should('not.contain', 'A blog already in the database')
        })

        it('another user cannot delete another users blog', function () {
            cy.get('#logout-button').click()

            const user = {
                username: 'Big Bad T',
                name: 'Tarja Halonen',
                password: 'h4ckert4rja'
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user)
            cy.login({ username: 'Big Bad T', password: 'h4ckert4rja' })

            cy.get('#view-button').click()

            cy.get('html').should('not.contain', 'Remove')
        })
    })

    describe('blog list', function () {
        beforeEach(function () {
            cy.login({ username: 'Iso-M', password: 'bigmoneymartti' })

            cy.createBlog({
                title: 'A mediocre blog',
                author: 'Author C.Y. Press',
                url: 'www.cypressurl.com',
                likes: 7
            })

            cy.createBlog({
                title: 'An awesome blog',
                author: 'Author C.Y. Press',
                url: 'www.cypressurl.com',
                likes: 18
            })

            cy.createBlog({
                title: 'A bad blog',
                author: 'Author C.Y. Press',
                url: 'www.cypressurl.com',
                likes: 1
            })
        })

        it('is ordered according to likes', function () {
            cy.get('.blog').eq(0).should('contain', 'An awesome blog')
            cy.get('.blog').eq(1).should('contain', 'A mediocre blog')
            cy.get('.blog').eq(2).should('contain', 'A bad blog')
        })
    })
})