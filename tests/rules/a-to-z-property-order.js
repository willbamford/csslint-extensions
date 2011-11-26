(function(){

    /* Global YUITest, CSSLint */
    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(
    	new YUITest.TestCase({
	        name: "A-To-Z Property Order Errors",
	
	        "Properties that are not ordered alphabetically (excluding vendor-specific) should result in a warning (simple)": function() {
	            var result = CSSLint.verify(
	            	"h1 { color: red; background-color: green; }",
	            	{ "a-to-z-property-order": 1 });
	            Assert.areEqual(1, result.messages.length);
	            Assert.areEqual("warning", result.messages[0].type);
	            Assert.areEqual("The property 'background-color' should be placed above 'color'", result.messages[0].message);
	        },
	        
	        "Properties that are not ordered alphabetically (excluding vendor-specific) should result in a warning (complex)": function() {
	            var result = CSSLint.verify(
	            	"h1 {background-color: green; color: blue; } p { z-order: 0; transition: opacity 3s ease 1s; -webkit-transition: opacity 3s ease 1s; background-color: red; border: 1px solid black; }",
	            	{ "a-to-z-property-order": 1 });
	            Assert.areEqual(2, result.messages.length);
	            Assert.areEqual("warning", result.messages[0].type);
	            Assert.areEqual("warning", result.messages[1].type);
	            Assert.areEqual("The property 'transition' should be placed above 'z-order'", result.messages[0].message);
	            Assert.areEqual("The property 'background-color' should be placed above 'transition'", result.messages[1].message);
	        },
	        
	        "Alphabetically ordered properties should not result in a warning": function() {
            	var result = CSSLint.verify(
            		"p {  background-color: red; border: 1px solid black; transition: opacity 3s ease 1s; -webkit-transition: opacity 3s ease 1s; z-order: 0; }",
            		{ "a-to-z-property-order": 1 });
            	Assert.areEqual(0, result.messages.length);
        	}
	    })
	 );
})();