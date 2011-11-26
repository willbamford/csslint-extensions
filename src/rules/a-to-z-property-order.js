/*
 * Rule: Properties within a rule (excluding vendor-specific) should be ordered alphabetically.
 */

/* Global CSSLint */
CSSLint.addRule({

    // Rule information
    id: "a-to-z-property-order",
    name: "Ensure properties within a rule are ordered alphabetically (excluding vendor-specific)",
    desc: "Alphabetically order properties (excluding vendor-specific).",
    browsers: "All",

    // Initialization
    init: function(parser, reporter){
        var rule = this,
        	lastName = null;
        
        
        parser.addListener(
        	"startrule",
        	function(event) {
        		lastName = null;
        	}
        );
        
        parser.addListener(
        	"property",
        	function(event) {
        		var property = event.property,
        			name = property.text.toLowerCase();
        		
        		// Ignore vendor-specific properties
        		if (name.charAt(0) !== '-') {
        		
        			// Perform check (if this is not the first property of the rule)
	        		if (lastName && name < lastName) {
	        			reporter.report("The property '" + name + "' should be placed above '" + lastName + "'", property.line, property.col, rule);
	        		}
	        		
	        		lastName = name;
        		}
        	}
        );
    }

});