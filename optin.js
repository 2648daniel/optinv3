var loginButton = '';
var storageKey = "optin_promos";
var storage = new Storage;
var ieTimer;

$(document).ready(function() {
    setupListenerForIE();
    init();    
});

$('.login-btn').click(function() {
    loginButton = $(this);
    $('.login').trigger('click');
});

/*
$('#balancemsg ul li span#nameHeader').live('DOMNodeInserted', function (event) {
    init();
});
*/

function setupListenerForIE() {
    if ($.browser.version < 9) {
        ieTimer = setInterval(function () {
            if (isLoggedIn()) {
                clearInterval(ieTimer);
                init();
            }
        }, 500);
    }
}

function init() {
    if (isLoggedIn()) {
        changeLoginToOptinClassName();
        setupOptinButtons();
        
        if (loginButton.length) {
            loginButton.trigger('click');
        }
        
        $('#balancemsg ul li span#nameHeader').unbind('DOMNodeInserted');
    }
}

function setupOptinButtons() {
    var buttons = $('.optin');
    
    enableOptinButton();
    
    for (var i = 0; i < buttons.length; i++) {
        if (doesPromoExistInStorage($(buttons[i]).attr('data-promo-id'))) {
            disableOptinButton($(buttons[i]).attr('data-promo-id'));
        }
    }
    
    $('.optin').bind('click', function() {
        if ($(this).attr('data-enabled') > 0) {
            optInUser($(this));
        }
    });
}

function isLoggedIn() {
    return $('#balancemsg ul li span#nameHeader').html() != null && $('#balancemsg ul li span#nameHeader').html().length;
}

function optInUser(element) {
    if (isLoggedIn()) {
    	var url = "http://offer.betfred.com/optin-campaign-test/rest/api.php";
        var nameHeader = $('#balancemsg ul li span#nameHeader');
        var promoId = element.attr('data-promo-id');
        var deviceId = element.attr('data-device-id');
        var pfNum = nameHeader.html().substring(nameHeader.html().indexOf('(') + 1, nameHeader.html().length - 1);
        
        if (promoId != "" && pfNum != "" && deviceId != "") {
        	if ('XDomainRequest' in window && window.XDomainRequest !== null) {
			    var xdr = new XDomainRequest();
                loading();                
                xdr.onprogress = function() { alert('in progress');};
                xdr.ontimeout = function() { 
                    displayMessage('Connecton timeout.<br />Please try again or contact <br />our customer services department.');
                    removeLoading();
                };                
			    xdr.timeout = 5000;
                xdr.onerror = function() {
                    displayMessage('There has been an error.  <br />Please try again or contact <br />our customer services department.');
                    removeLoading();
                };
			    xdr.onload = function() {
                    var response = parseJSON(xdr.responseText);
                    displayMessage(response.message);
                    saveToLocalStorage(promoId);
                    disableOptinButton(promoId);
                    removeLoading();
			    };
                
                xdr.open("POST", url);
                xdr.send("promoId=" + promoId + "&pfNumber=" + pfNum + "&deviceId=" + deviceId);
			} else {
            	$.ajax({
	                url: url,
    	            type: "POST",
        	        //crossDomain: true,
            	    data: { promoId: promoId, pfNumber: pfNum, deviceId: deviceId },
	                dataType: "jsonp",
                    //dataType: "json",
    	            beforeSend: function() {
        	            loading();
	                },
    	            done: function (data) {
        	            displayMessage(data.message);
            	        saveToLocalStorage(promoId);
                	    disableOptinButton(promoId);
                    	removeLoading();
	                },
    	            fail: function(jqXHR, textStatus, errorThrown) {
        	            console.log('Text Status: ' + textStatus);
            	        console.log('Error Thrown: ' + errorThrown);
                	    displayMessage('There has been an error.  <br />Please try again or contact <br />our customer services department.');
                    	removeLoading();
	                }
    	        });
			}   	        	
        }
    }
}

function parseJSON(str) {
	var jsonStr = str.substring(str.indexOf('(') + 1, str.indexOf(')'));
	return JSON.parse(jsonStr);
}

function saveToLocalStorage(promoId) {
    if (!storage.isExist(storageKey)) {
        savePromoList(promoId);
    } else if (!doesPromoExistInStorage(promoId)) {
        savePromoList(promoId);
    }
}

function savePromoList(promoId) {
    var list = storage.read(storageKey);
    
    if (list != null) {
        list.push(promoId);
    } else {
        list = [promoId];
    }
    
    storage.save(storageKey, list);
}

function doesPromoExistInStorage(promoId) {
    var list = storage.read(storageKey);
    var result = false;
    
    for (var i in list) {
        if (list[i] == promoId) {
            result = true;
        }
    }
    
    return result;
}

function changeLoginToOptinClassName() {
    $('.login-btn').removeClass('login-btn').addClass('optin');
}

function enableOptinButton() {
    $('.optin').attr('data-enabled', '1').html('Opt in');
}

function disableOptinButton(promoId) {
    var button = $('.optin[data-promo-id="' + promoId + '"]');
	
    button.attr('data-enabled', '0').html('Opted in');
    button.parent().css('opacity', '.4');
}

function displayMessage(msg) {
    if (!$('.page-loading .message').length) {
        $('.page-loading').append(
            $('<div>', {
                'class': 'message'
            })
        );
    }
    
    $('.page-loading').find('img').fadeOut('slow', function() {
        $(this).remove();
        
        $('.page-loading .message').empty().append(msg);
        
        $('.page-loading .message').fadeIn('slow');    
    });
}

function loading() {
    if (!$('.page-loading').length) {
        $('body').prepend(
            $('<div>', {
                'class': 'page-loading'
            })
        );
        
        $('.page-loading').append(
            $('<img>', {
                'src': 'http://cdn.betfred.com/img/loader.gif'
            })
        );
        
        $('.page-loading').fadeIn('slow');
    }
}

function removeLoading() {
    setTimeout(function() {
        $('.page-loading').fadeOut('slow', function() {
            $(this).remove();
        });
    }, 3000);
}