$(function () {
    //<button,div,etc class='optinv3' data-promo-id='1' data-device-id='2'></button>
    var optinClassName = 'optinv3';
    var loginButton = '';
    var storageKey = "optin_promos";
    var storage = new Storage;
    //var ieTimer;

    var isLoggedIn = false;

    function constructor() {
        //connect change events
        connectEventsAndClicks();

        //first check
        chekIfIsLoggedIn();
    }

    //connect to login events and connect optin click
    function connectEventsAndClicks() {
        $(document).on('failedLogin', function () {
            isLoggedIn = false;
            updateButtons();
        });
        $(document).on('userLogon', function () {
            isLoggedIn = true;
            updateButtons();
        });

        $(document).on('successfulLogin', function () {
            isLoggedIn = true;
            updateButtons();
        });
        $(document).on('successfulLogout', function () {
            isLoggedIn = false;
            updateButtons();
        });

        //optin click (login or optin)
        $(document).on('click', '.' + optinClassName, function () {
            if (!isLoggedIn) {
                $('.login').trigger('click');
            } else {
                optInUser($(this));
            }
        });
    }

    //check if logged in, return jquery promise that will be resolved on success
    function chekIfIsLoggedIn() {
        console.log("check");
        isLoggedIn = true;
            updateButtons();
        return isLoggedIn;
    }

    //update all existing buttons
    function updateButtons() {
        var buttons = $('.' + optinClassName);
        if (isLoggedIn) {
            $.each(buttons, function (idx, value) {
                var button = $(value);
                var promoId = button.attr('data-promo-id');
                var enabled = '1';
                var title = 'Opt In';
                var opacity = '1';

                if (doesPromoExistInStorage(promoId)) {
                    title = 'Opted in';
                    enabled = '0';
                    opacity = '0.4';
                }
                button.attr('data-enabled', enabled).html(title);
                button.parent().css('opacity', opacity);
            });
        } else {
            $.each(buttons, function (idx, value) {
                $(value).html('Log In');
            });
        }
    }

    //optin for the promo
    function optInUser(element) {
        // var nameHeader = 'PF123456'; 
        var nameHeader = $('#balancemsg ul li span#nameHeader');  
        if (isLoggedIn) {
            var url = "rest/api.php";
            console.log(url);
            var promoId = element.attr('data-promo-id');
            var deviceId = element.attr('data-device-id');
            var pfNum = nameHeader.html().substring(nameHeader.html().indexOf('(') + 1, nameHeader.html().length - 1);
            var selectOne = $("#one").val();
            var selectTwo = $("#two").val();
            var selectThree = $("#three").val();


            if (promoId != "" && deviceId != "" && selectOne != "" && selectTwo != "" && selectThree != "" ) {
                loading();

                var request = $.ajax({
                    url: url,
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: { promoId: promoId, pfNumber: pfNum, deviceId: deviceId, selectOne: selectOne, selectTwo: selectTwo, selectThree: selectThree }
                });

                request.done(function (data) {
                    if (data.message) {
                        console.log(data);
                        saveToLocalStorage(promoId);
                        updateButtons();
                    }
                    displayMessage(data.message);
                });

                request.fail(function (jqXHR, exception) {
                    displayMessage('There has been an error.  <br />Please try again or contact <br />our customer services department.');
                });

                request.always(function () {
                    removeLoading();
                });
            }
        }
    }

    //save promoId to local storage
    function saveToLocalStorage(promoId) {
        if (!storage.isExist(storageKey)) {
            savePromoList(promoId);
        } else if (!doesPromoExistInStorage(promoId)) {
            savePromoList(promoId);
        }
    }

    //save promoId to local storage list
    function savePromoList(promoId) {
        var list = storage.read(storageKey);

        if (list != null) {
            list.push(promoId);
        } else {
            list = [promoId];
        }

        storage.save(storageKey, list);
    }

    //check if promo exists in local storage
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

    //display message
    function displayMessage(msg) {
        if (!$('.page-loading .message').length) {
            $('.page-loading').append(
                $('<div>', {
                    'class': 'message'
                })
            );
        }

        $('.page-loading').find('img').fadeOut('slow', function () {
            $(this).remove();

            $('.page-loading .message').empty().append(msg);

            $('.page-loading .message').fadeIn('slow');
        });
    }

    //show loading page
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

    //remove loading page
    function removeLoading() {
        setTimeout(function () {
            $('.page-loading').fadeOut('slow', function () {
                $(this).remove();
            });
        }, 3000);
    }

    constructor();
});