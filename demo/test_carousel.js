/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/
var phantomcss = require('./../phantomcss.js');

phantomcss.init(/*{
	screenshotRoot: '/screenshots',
	failedComparisonsRoot: '/failures'
	casper: specific_instance_of_casper,
	libraryRoot: '/phantomcss',
	fileNameGetter: function overide_file_naming(){},
	onPass: function passCallback(){},
	onFail: function failCallback(){},
	onTimeout: function timeoutCallback(){},
	onComplete: function completeCallback(){},
	hideElements: '#thing.selector',
	addLabelToFailedImage: true,
	outputSettings: {
		errorColor: {
			red: 255,
			green: 255,
			blue: 0
		},
		errorType: 'movement',
		transparency: 0.3
	}
}*/);


/*
	The test scenario
*/
casper.start( 'http://azaem-web1-test2.awsdev.telegraph.co.uk/demoshop1/demo-product-page-3.html' );

casper.viewport(1024, 768);


// ---------------------------- ACTUAL TEST ACTIONS ---------------------------------------

casper.then(function(){
	casper.wait(5000) //wait for page to settle
});

casper.then(function(){
	phantomcss.screenshot('div.image-group.component.carousel_v1', 'image 1 in carousel');
});

casper.then(function(){
	casper.waitForSelector('div.rsNavItem.rsThumb:not(.rsNavSelected)',
		function success(){
			return;
		},
		function timeout(){
			casper.test.fail('!!! Selector not loaded');
		},
		20000
	);
	casper.click('div.rsNavItem.rsThumb:not(.rsNavSelected)');
	casper.wait(5000)
});

casper.then(function(){
	phantomcss.screenshot('div.image-group.component.carousel_v1', 'image 2 in carousel');
});

// ----------------------------------------------------------------------------------------------




casper.then( function(){
	casper.capture('last_screen.png');
});

casper.then( function now_check_the_screenshots(){
	// compare screenshots
	// phantomcss.compareAll();
	phantomcss.compareFiles('screenshots/image 1 in carousel_0.png','screenshots/image 2 in carousel_1.png');
	// console.log(JSON.stringify(result));
	// console.log(result.success);
	// phantomcss.waitForTests(tests);
});

casper.then( function end_it(){
	casper.test.done();
});

/*
Casper runs tests
*/

casper.test.on('fail', function() {
    //casper.wait(10000)
	casper.capture('failures/fail.png');
});


casper.run(function(){
	console.log('\nTHE END.');
	phantom.exit(phantomcss.getExitStatus());
});

