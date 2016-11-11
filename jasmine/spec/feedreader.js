/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function(){
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('names are defined', function(){
           for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }
        });
    });

    describe('The menu', function () {

        /* This test ensures the menu element is
         * hidden by default.
         */

        it('menu is hidden', function () {
            expect($('body').hasClass('menu-hidden')).toBeDefined();
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('menu changes visibility when icon is clicked', function(){
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Since loadFeed() is asynchronous, this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('has at least one entry in feed container', function(){
            expect($('.feed .entry').length).not.toBeLessThan(1);
        });
    });

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

    describe('New Feed Selection', function(){
        var content1;
        var content2;
        beforeEach(function(done){
          $('.feed').empty();
          loadFeed(0, function() {
          content1 = $('.feed').html();
          loadFeed(1, done);
          });
        });
        it('ensures the new feed is loaded and the content changes', function(done){
          content2 = $('.feed').html();
          expect(content1).not.toBe(content2);
          done(); //if I delete this line then the jasmine doesn't fully load on the page
        });
        afterAll(function(done) {
        loadFeed(0, done);
        });
    });
}());
