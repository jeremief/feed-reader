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
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should have a valid url', function(){
            var numberMissingUrls = 0;
            var numberEmptyUrls = 0;

            for (var feed of allFeeds){
                var hasUrl = false;
                var urlIsEmpty = true;
                for (var feedProperty in feed){
                    if (feedProperty == 'url') {
                        hasUrl = true;
                        if (feed.url !== "") {
                            urlIsEmpty = false;
                        }
                    }
                }
                if (hasUrl === false){
                    numberMissingUrls++;
                }
                if (urlIsEmpty === true){
                    numberEmptyUrls++;
                }
            }
            expect(numberMissingUrls).toBe(0);
            expect(numberEmptyUrls).toBe(0);

        });



        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('should have a valid name', function(){
            var numberMissingNames = 0;
            var numberEmptyNames = 0;

            for (var feed of allFeeds){
                var hasName = false;
                var nameIsEmpty = true;
                for (var feedProperty in feed){
                    if (feedProperty == 'name') {
                        hasName = true;
                        if (feed.name !== "") {
                            nameIsEmpty = false;
                        }
                    }
                }
                if (hasName === false){
                    numberMissingNames++;
                }
                if (nameIsEmpty === true){
                    numberEmptyNames++;
                }
            }
            expect(numberMissingNames).toBe(0);
            expect(numberEmptyNames).toBe(0);

         });
    });



    /* This test suite test the left hand side menu and makes sure that
     * it functions properly 
     */
    describe('The menu',function(){
       
        /* This test ensures that the menu element is
         * hidden by default. 
         */
         it('should be hidden by default', function(){
            $(document).ready(function(){
                var isHiddenByDefault = false;
                if($('body').hasClass('menu-hidden')){
                    isHiddenByDefault = true;
                }
                expect(isHiddenByDefault).toBe(true);
            });
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('should show or hide the menu when the icon is clicked',function(){
            $(document).ready(function(){

                var isHidden = false;

                $('.menu-icon-link').trigger('click');
                if($('body').hasClass('menu-hidden')){
                    isHidden = true;
                }
                expect(isHidden).toBe(false);


                $('.menu-icon-link').trigger('click');
                if($('body').hasClass('menu-hidden')){
                    isHidden = true;
                }
                expect(isHidden).toBe(true);

            });
        });
    });



    /* This test suite analyses the initial entries of the application 
     * and ensures that they are suitable for the application 
     */
    describe('Initial entries', function(){

        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
    
        var firstListItem = "";

        beforeEach(function(done){
            loadFeed(0, function(){
            firstListItem = $('body .entry h2').html();
            done();
                
            });
        });

        it('should load at least one feed', function(){
            expect(firstListItem).toBeDefined();
        });
    });



    /* This test suite ensures that feeds are loaded properly when the 
     * users select a new one
     */
     describe("New Feed Selection",function(){

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        var firstFeed = ""; 
        var secondFeed = ""; 

        beforeEach(function(done){
            loadFeed(0,function(){ 
                firstFeed = $(".feed").html();
            });

            loadFeed(1,function(){
                secondFeed = $(".feed").html();
                done();
            });
        });

        it("should load a completely new feed",function(){
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
}());
