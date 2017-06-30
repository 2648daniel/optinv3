/*BACKGROUNDCOLOR ON CLICK */
$(document).ready(function() {

$(document).on('click', 'ul li img.clicked', function(event) {
        var selectBall = event.target.id;
			if (selectBall == event.target.id){
			
			$ (this).css({"background-color":"#99d9fa", "border-radius":"45px"});

		}
		});
    });
/*BACKGROUNDCOLOR ON CLICK */

// add selected balls to array / string
var ids = [];

$(document).on('click', 'ul li img', function(e){
    selected = e.currentTarget.id;
    ids.push(selected);
    numArr = ids.map(function(el, item, index){ return el.match(/\d/g).join("")});
	var selectedString = ids.join(', ');
	console.log(selectedString.toString(" , "));
	// add selected balls to innerHTML of modal
$('h4 #showBalls').html("Your Selection: " + numArr.join(", "));
$('#selection').find('#one').val(numArr[0]);
$('#selection').find('#two').val(numArr[1]);
$('#selection').find('#three').val(numArr[2]);
//
});
//
	
/* 1ST CLICK FUNCTION *START**/	
$(document).on('click', '.lotto-grid li img.1st-click', function(event) {



/* 1ST CLICK CONDITION = MEDIUM SCREEN SIZE *START* */ 
	 if ($(window).width() < 1200) {

	var selectBall = event.target.id;
	if (selectBall == event.target.id){
	setTimeout(function() {
			
			$("#ballsdrop " +  "#" + selectBall).animate({'top': '300px', 'width':'58px'});
			$("#ballsdrop > " +  "#" + selectBall).effect("bounce", { times:1 },  { duration:400, queue: false});
			$(".balls > ul.lotto-grid li img").addClass("secondClick");
			
		});
		}
    } 
/* 1ST CLICK CONDITION = MEDIUM SCREEN SIZE  *END * */ 

/* 1ST CLICK CONDITION = LARGE SCREEN SIZE  *START* */ 
	else if ($(window).width() > 1200) {
	
	var selectBall = event.target.id;

	if (selectBall == event.target.id){

	
		setTimeout(function() {
			$("#ballsdrop > " +  "#" + selectBall).animate({'top': '355px'});
			$("#ballsdrop > " +  "#" + selectBall).effect("bounce", { times:1 },  { duration:400, queue: false});
			$(".balls > ul.lotto-grid li img").addClass("secondClick");
		}, 0);
	}
    } 
	/* 1ST CLICK CONDITION = LARGE SCREEN SIZE  *END * */ 
	
/*resize position function for 1st click */
$(window).resize(function(){
if ($(window).width() > 1200) {
			$("#ballsdrop > " +  "#" + selectBall).animate({'top': '355px', 'width':'70px'});		
} else {
$("#ballsdrop > " +  "#" + selectBall).animate({'top': '300px', 'width':'58px'});
}

});
/*resize position function for 1st click end */

$('ul li img.1st-click').removeClass('1st-click');

}); /* 1ST CLICK FUNCTION *END**/	






/* 2ND CLICK FUNCTION *START**/	
$(document).on('click', "img.secondClick", function(event) {
	
if (ids[0] == ids[1]){
ids.pop();
alert("You have already selected " + ids[0] + "\nPlease select a different ball to continue.");
} else{
	/* 2nd CLICK CONDITION = MEDIUM SCREEN SIZE *START* */ 


  if ($(window).width() < 1200) {
		var selectBall2 = event.target.id;
		if (selectBall2 == event.target.id){
		
	setTimeout(function() {
			
			$("#ballsdrop2 " +  "#" + selectBall2).animate({'top': '300px','width':'58px'});
			$("#ballsdrop2 > " +  "#" + selectBall2).effect("bounce", { times:1 },  { duration:400, queue: false});
		}, 0);
		
    } 
} /* 2nd CLICK CONDITION = MEDIUM SCREEN SIZE *END* */ 



/* 2nd CLICK CONDITION = LARGE SCREEN SIZE *START* */ 
else if ($(window).width() > 1200) {

var selectBall2 = event.target.id;


		if (selectBall2 == event.target.id){
	
		
	setTimeout(function() {
			
			$("#ballsdrop2 > " +  "#" + selectBall2).animate({'top': '355px'});
			$("#ballsdrop2 > " +  "#" + selectBall2).effect("bounce", { times:1 },  { duration:400, queue: false});
		}, 0);
		
    } 

} /* 2nd CLICK CONDITION = LARGE SCREEN SIZE *END* */ 




$('.balls > ul.lotto-grid li img').addClass('thirdClick'); /* 2nd CLICK HOVER START - REMOVE SECONDCLICK CLASS AFTER MAIN EVENT HAS RUN  */ 
	$(document).on('mouseover', "img.secondClick", function() {
    $(this).removeClass('secondClick');
}); /* HOVER END*/



$(window).resize(function(){ /*resize position function for 2nd click */
if ($(window).width() > 1200) {
			$("#ballsdrop2 > " +  "#" + selectBall2).animate({'top': '355px', 'width':'70px'});
			
}else {
$("#ballsdrop2 > " +  "#" + selectBall2).animate({'top': '300px', 'width':'58px'});
}
}); /*resize position function for 2nd click end  */


}
});  /* 2ND CLICK FUNCTION *END**/	



/* 3RD CLICK FUNCTION *START**/	

$(document).on('click', "img.thirdClick", function(event) {
if (ids[1] == ids[2])  {
ids.pop();
alert("You have already selected " + ids[1] + "\nPlease select a different ball to continue.");
} else if (ids[0] == ids[2]){
ids.pop();
alert("You have already selected " + ids[0] + "\nPlease select a different ball to continue.");
} else {
	/* 3RD CLICK CONDITION = MEDIUM SCREEN SIZE *START* */ 
	if ($(window).width() < 1200) {

	var selectBall3 = event.target.id;
	if (selectBall3 == event.target.id){
	setTimeout(function() {
			$("#ballsdrop3 " +  "#" + selectBall3).animate({'top': '300px', 'width':'58px'});
			$("#ballsdrop3 > " +  "#" + selectBall3).effect("bounce", { times:1 },  { duration:400, queue: false});
		}, 0);
		
		} 
	} /* 3RD CLICK CONDITION = MEDIUM SCREEN SIZE *END* */ 

	/* 3RD CLICK CONDITION = LARGE SCREEN SIZE *START* */ 
	else if ($(window).width() > 1200) {
	
		var selectBall3 = event.target.id;
		if (selectBall3 == event.target.id){
		
	setTimeout(function() {
			
			$("#ballsdrop3 > " +  "#" + selectBall3).animate({'top': '355px'});
			$("#ballsdrop3 > " +  "#" + selectBall3).effect("bounce", { times:1 },  { duration:400, queue: false});
		}, 0);
		
		
		$(".balls > ul.lotto-grid li img").addClass("thirdClick");
		
    } 
} /* 3RD CLICK CONDITION = LARGE SCREEN SIZE *END* */ 

	$(document).on('mouseover', "img.secondClick", function() {
    $(this).removeClass('thirdClick');
});

/*resize position function for 3rd click */
$(window).resize(function(){
if ($(window).width() > 1200) {

			$("#ballsdrop3 > " +  "#" + selectBall3).animate({'top': '355px', 'width':'70px'});
}else {
$("#ballsdrop3 > " +  "#" + selectBall3).animate({'top': '300px', 'width':'58px'});
}

});
/* resize position function for 3rd click */
/* CALL MODAL AFTER 3RD CLICK EVENT HAS FINISHED */	
setTimeout(function() {
                $('#myModal').modal('show')  
        }, 500); // milliseconds
		
		$(".balls > ul").removeClass("lotto-grid");
		$("ul li img").removeClass("clicked");
		}
});



   

/* 3RD CLICK FUNCTION *END**/	
