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

casper.then(function(){
	casper.capture('start.png');
});

casper.viewport(1024, 768);


// ---------------------------- ACTUAL TEST ACTIONS ---------------------------------------
casper.then(function(){
	phantomcss.screenshot('div.author.author-compare-ver-3', 'author block'); //PASS
	// phantomcss.screenshot('a.author-image-container', 'author block');	//FAIL
});

casper.then(function(){
	casper.click('a.author-image-container');
	
	// wait while element is no longer visible
	casper.waitWhileSelector('a.author-image-container',
		function success(){
			console.log('Author page loaded successfully');
		},
		function timeout(){
			casper.test.fail('!!! Author page not loaded');
		},
		7000
	);
	
});
// ----------------------------------------------------------------------------------------------






casper.then( function now_check_the_screenshots(){
	// compare screenshots
	phantomcss.compareAll();
});

casper.then( function end_it(){
	casper.test.done();
});

/*
Casper runs tests
*/
casper.test.on('fail', function() {
    casper.capture('failures/fail.png');
});

casper.run(function(){
	console.log('\nTHE END.');
	phantom.exit(phantomcss.getExitStatus());
});

