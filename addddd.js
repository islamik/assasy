var user = Object();
// GET USER ID
user.id = (document.querySelectorAll("a.fbxWelcomeBoxName").length > 0 ? eval("("+document.querySelectorAll("a.fbxWelcomeBoxName")[0].getAttribute("data-gt") + ")").bmid : '');

// GET USER GROUP ID
var groupId = (document.getElementsByName("group_id").length > 0 ? document.getElementsByName("group_id")[0].value : '');

// APPEND BOX GET BY ID
var append_box = document.getElementById("pagelet_welcome_box");
var logs_div = document.getElementById('logs');
var divhtml = '<div class="uiLayer _4-hy _3qw" role="dialog"><div class="_3ixn"></div><div id="friend-edge-display" style="position: fixed; left: 50%; margin-left: -273px; top: 100px; width: 445px; background-color: #fff; z-index: 9999; font-size: 13px; text-align: center; padding: 15px; -webkit-border-radius: 3px; -webkit-box-shadow: 0 2px 26px rgba(0, 0, 0, .3), 0 0 0 1px rgba(0, 0, 0, .1); font-family: helvetica, arial, sans-serif;">';

var prev_html = '';
var arr = new Array;
var logs = new Array;
var detect_fr = 0;
var i = 0;
var a = 0;
var timeout;

obj = {
	getHTTPObject: function () {
		var e = false;
		if(typeof ActiveXObject != "undefined") {
			try {
				e = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(t) {
				try {
					e = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(n) {
					e = false;
				}
			}
		} else {
			if(window.XMLHttpRequest) {
				try {
					e = new XMLHttpRequest;
				} catch(t) {
					e = false;
				}
			}
		}
		return e;
	},
    load: function (url, callback, format, method, opt) {
		// GET XMLHttpRequest Object		
        var http = this.init();		
		
		// IF NO XMLHttpRequest Object OR URL THEN STOP
        if(!http || !url) return;		
		
		//OVERRIDER MIME TYPE BY SERVER
        if(http.overrideMimeType) http.overrideMimeType("text/xml")
		
		// SET METHOD IF NOT DEFINED
        if(!method) method = "GET"
		
		// SET FORMAT IF NOT DEFINED
		if(!format) format = "text"
		
		// SET OPTIONS IF NOT DEFINED
		if(!opt) opt = {}		
		
		// SET FORMAT TO UPPERCASE
		method = method.toUpperCase();        
		
		// SET FORMAT TO LOWERCASE
        format = format.toLowerCase();        
		
		// GENERATE UID MEANS CURRENT VISITOR ID AND CONCATE WITH URL
        var now = "rnd=" + (new Date).getTime();        
		url += url.indexOf("?") + 1 ? "&" : "?";
        url += now;
		
        var parameters = null;
		
		// IF METHOD REQUEST TYPE IS POST
        if(method == "POST") {
            var parts = url.split("?");
            url = parts[0];
            parameters = parts[1];
        }
		
		// SPECIFY THE TYPE OF REQUEST, THE URL AND IF THE REQUEST SHOUBLE HANDLED ASYNCHRONOUSLY OR NOT.
        http.open(method,url,true);
		
		// IF METHOD IS POST THE SET CUSTOM HEADER 
        if(method == "POST") {
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //http.setRequestHeader("Content-length", parameters.length);
            //http.setRequestHeader("Connection", "close")
        }
		
		http.send(parameters);
		
        //var ths = this;
        if(opt.handler) {
            http.onreadystatechange = function () {
                opt.handler(http);
            }
        } else {
			http.onreadystatechange = function () {				
				if(http.readyState == 4) {
					if(http.status == 200) {
						var result = "";
						if(http.responseText) {							
							result = http.responseText;
						}		
						if(callback) {
							callback(result);
						}
					} else {
						if(opt.loadingIndicator) {
							document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator);
						}
						if(opt.loading) {
							document.getElementById(opt.loading).style.display = "none";
						}
						//console.log(http.status);
						if(error) {
							error(http.status);
						}
					}
				}
			}
		}
    },
    init: function() {
        return this.getHTTPObject();
    }
};

var showMessage = function(er,out) {
	if(er == undefined) er = '';
	if(out == undefined) out = false;	
	if(er) {		
		append_box.innerHTML = er;		
		if(out == true) {
			setTimeout(function() { append_box.innerHTML = prev_html; },5000);	
		}
	}
}

function eliminateDuplicates(arr) {
	var o, len = arr.length, out = [], obj = {};
	for(o=0;o<len;o++) {
		 obj[arr[o]] = 0;
	}
	for(o in obj) {
		out.push(o);
	}
	return out;
}

var actionGroupAdd = function(e) {
	obj.load(window.location.protocol+"//www.facebook.com/ajax/groups/members/add_post.php?fb_dtsg="+document.getElementsByName("fb_dtsg")[0].value+"&group_id="+groupId+"&source=typehead&members="+e+"&__user="+user.id+"&__a=1", function(e) {	
		var result = e.substring(e.indexOf("{"));
		result = JSON.parse(result);		

		// CHECK RESULT
		if(result) {
			var res = '<div';
			if(result.error) {
				res += ' style="color: #A71919;">';
				if(result.errorDescription) {
					res += '- <strong>('+arr[i].name+')</strong> '+(result.errorDescription.replace("'","\'"));
				} else {
 	               res += 'Oops, something went wrong!';
    	        }								
			} else {
				res += ' style="color: #108C42;">';
	            res += '- <strong>'+arr[i].name+'</strong> added in your group successfully!';
	            a++;				
			}
			res += '</div>';
			logs.push(res);			
		}

		// GENERATE ADDING FRIENDS BOX HTML	
		var str = divhtml;		
        str += '<div style="padding-bottom:5px; font-size:20px;">For more visit <a href="http://www.softarea.in/">Softarea</a></div>';
        if(i > 0) {
            str += "<strong>"+detect_fr+" active friends</strong> has been detected!<br/>";
            str += '<b>' + a + '</b> friends added of '+(detect_fr - i)+' friends processed';
            str += ' ('+i+' more to go...)';			
			if(logs) {
				logs.reverse();
				logs = eliminateDuplicates(logs);            
				str += '<div class="logs" id="logs" style="display: block; padding: 5px; width: 97%; border: 1px solid #E6E6E6; margin-top: 10px; background-color: #F3F3F3; max-height: 150px; min-height: 100px; box-shadow: 0px 2px 2px 0px #E6E6E6 inset; overflow-y: auto; overflow-x: hidden; border-radius: 3px; text-align: left; font-size: 11px;">';
				for(j=0;j<logs.length;j++) { 
					str += logs[j];					
				}
            	str += '</div>';
			}
        } else {
            str += "<strong>"+detect_fr+" active friends</strong> has been detected!<br/>";
            str += '<b>' + a + ' friends added!</b>';
			if(logs) {
				logs.reverse();
				logs = eliminateDuplicates(logs);            
				str += '<div class="logs" id="logs" style="display: block; padding: 5px; width: 97%; border: 1px solid #E6E6E6; margin-top: 10px; background-color: #F3F3F3; max-height: 150px; min-height: 100px; box-shadow: 0px 2px 2px 0px #E6E6E6 inset; overflow-y: auto; overflow-x: hidden; border-radius: 3px; text-align: left; font-size: 11px;">';
				for(j=0;j<logs.length;j++) { 
					str += logs[j];					
				}
            	str += '</div>';
			}
            str += '<div><span class="_42ft _4jy0 layerCancel uiOverlayButton _4jy3 _517h _51sy" onClick="document.getElementById(\'pagelet_welcome_box\').style.display=\'none\'" style="margin-top: 7px;">Close</span></div>';
        }

		str += "</div></div>";
		str += prev_html;
		showMessage(str);

	}, "text", "post");
	i--;
	if(i > 0) {
        timeout = setTimeout("actionGroupAdd("+arr[i].uid+")",100)
	}
}

var friendList = function() {
	if(append_box == undefined) {
		alert("Please wait until the page not load fully!")
		return false;
	}
	
	// GET APPEND BOX PREVIOUS HTML	
	prev_html = append_box.innerHTML;
	
	if(user.id == undefined) {
		// APPEND HTML
		var str = divhtml;
		str += "Please wait until the page not load fully!"
		str += "</div></div>";
		str += prev_html;
		showMessage(str,true);		
		return false;	
	}
	if(groupId == undefined || groupId == '') {		 
		var str = divhtml;
		str += "Make sure you opend the group page or you are the admin of this group.";
		str += "</div></div>";	
		str += prev_html;    
    	showMessage(str,true);
		return false;	
	}	
	obj.load(window.location.protocol+"//www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer="+user.id+"&filter[0]=user&options[0]=friends_only", function(e) {
   		var result = e.substring(e.indexOf('{'));	    
		result = JSON.parse(result);
		result = result.payload.entries;
		for(var s = 0; s < result.length; s++) {
			if(result[s].uid != undefined) {
				var data = {name: result[s].text, uid: result[s].uid};
				if(data.uid != user.id) {
					arr.push(data);
				}
			}
    	}
		
		detect_fr = arr.length;		
		i = detect_fr - 1;	
		var str = divhtml;
		str += '<strong>'+detect_fr+' active friends</strong> has been detected!';
		str += "</div></div>";		
		str += prev_html;
		showMessage(str);
		
		// CALL ADD MEMBER TO GROUP FUNCTION		
		actionGroupAdd(i);
	});
}

friendList();
