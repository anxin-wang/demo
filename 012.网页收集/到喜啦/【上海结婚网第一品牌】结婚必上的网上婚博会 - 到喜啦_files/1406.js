if( $.isUrlParameters("lp")!="" && $.isUrlParameters("lp")!=null){
	$.jsSequence({frame:["minisite"]});	
}

$(document).ready(function(){
	
	
	
	setTimeout(function(){

			//TopBanner
			var topBannerHtml = '<div id="topdd" style="z-index:951; width:100%; height:80px; margin:0 auto; background:#ed4231; position:relative;">'
			+ '<div class="top_close" style="cursor:pointer;  position:absolute; right:0; top:0; width:22px; height:22px; background:url('+dxlHttp.s4+'www/img/nianzhong/topdd_close.jpg);"></div>'
			+ '<a class="topdd" style=" display:block; width:1240px; height:80px; margin:0 auto; background:url('+dxlHttp.s4+'www/img/nianzhong/150212.jpg) center top no-repeat;"></a>'
			+ '</div>';

			if($.cookie("dxlNianzhong141229") != 1){
				$("#topTools").after(topBannerHtml);
				$("header ul.navList").css("top","242px");
			}else{
				$("header ul.navList").css("top","162px");
			}
			
			$("#topTools").css({"z-index":"951","position":"relative"});
			//TopBanner--关闭按钮
			$(".top_close").on("click",function(){
				$("#topdd").fadeOut(300);
				$("header ul.navList").css("top","162px");
				$.cookie("dxlNianzhong141229","1",{ expires: 1,domain:"daoxila.com",path:"/" });
			})

	},500)
	
	
	
	
	
	
	
	$.dxlHeaderNav();				   
	$.dxlHeadCity();			   
	$.dxlAssociation();
	$.dxlLinkSlider();  //友情链接
	$.dxlRecording();  //浏览记录
	$.dxlgetFlag(); //飘旗
	/*3步轻松找洒店弹出列表*/
	$("#main .left .order .text").each(function(index, element) {
		 $(this).on("click",function(e){
			e.stopPropagation();
			var hasClass = $(".order .text" + (index+1)).hasClass("current");
			if (hasClass) {
				windowClos();
			} else {
				$(".order .text" + (index+1)).addClass("current");
				$("#main .left .order .listCon").eq(index).fadeIn(300,function(){
					$(this).find("li").on("click",function(){
						 $("#main .left .order .text").eq(index).find("span").text($(this).text()).attr("val",$(this).text());
						 if($.trim($(this).attr("val"))==$.trim($("#main .left .order .text").eq(index).find("span").attr("val"))){
							$(this).addClass("liCur").siblings().removeClass("liCur");	
						}
					})
				});
				
	
				$("#main .left .order .text").eq(index).find("i").addClass("jt");
			}
		 })
		
	});
	
	

	

	/*3步轻松找洒店弹出列表点击事件隐藏*/
	$(".text1").on("click",function(){
		$(".listConPrice").hide();
		$(".listConDesk").hide();
	});
	$(".text2").on("click",function(){
		$(".selectZone").hide();
		$(".listConDesk").hide();
	});
	$(".text3").on("click",function(){
		$(".selectZone").hide();
		$(".listConPrice").hide();
	});
	
	function priceSHow(){
		$(".listConPrice").fadeIn(300);
	}
	
	function deskSHow(){
		$(".listConDesk").fadeIn(300);
	}
	
	var ul2Flag = 0;
	var ul3Flag = 0;
	
	$(".selectZone li").on("click",function(){
		if(ul2Flag==0){
			window.setTimeout(priceSHow,400);
		}

	});
	
	$(".listConPrice li").on("click",function(){
		var index = $(this).index();
		ul2Flag = 1;
		if(ul3Flag==0){
			window.setTimeout(deskSHow,400)
			$(".text2").find("span").attr("val",$(this).attr("val")).text($(this).attr("val"));;
		}
	});
	
	$(".listConDesk li").on("click",function(){
		ul3Flag = 1;
		$(".text3").find("span").attr("val",$(this).attr("val")).text($(this).attr("val"));
	});
	
	
	
	
	$(document).on("click",windowClos);
	function windowClos(){
		$(".listCon").fadeOut(300);
		$(".order .text").removeClass("current");
		$(".order .text").find("i").removeClass("jt");
	}
	
	/*3步轻松找洒店弹出列表*/
	/*order*/
	
	$(".select1").attr("val","不限");
	$(".select2").attr("val","不限");
	$(".select3").attr("val","不限");
	$.jsSequence({frame:["hotelOrder"]},function(){
		$("#main .left .order .btn").on("click",function(){
			$.hotelOrder({
				"order_from":$.cookie("city") + "_Index_3Steps_TopLeft_new",
				"type":"1",
				"region":$("#main .left .order .text1 span").attr("val"),
				"price":$("#main .left .order .text2 span").attr("val"),
				"desk":$("#main .left .order .text3 span").attr("val")
				
			})
		});
		
		
		$("#recommend .btn").on("click",function(){
			$.hotelOrder({
				"order_from":$.cookie("city")+"_Index_Reserve_LowCenter_new",
				"type":"1",
				"region":$(".select1").attr("val"),
				"price":$(".select2").attr("val"),
				"desk":$(".select3").attr("val")
			})
		});

	});
	
	
	/*送祝福*/
	$("#blessingsBtn").on("click",function(){
		$(this).off();
		$("#blessingsNum b").text(parseInt($("#blessingsNum b").text(),10) + 1);
		if(!dxlHttp.ie){
			$("#wishBox").show();
			$("#wishBox").animate({"left":"-370px"},1000,function(){
				$("#wishBox").fadeOut(3000);
			});
			
		}
		$(this).text("谢谢祝福");
		
		$.getJSON(dxlHttpCom + "jsonp/?act=getCongratulation&city=" + $.cookie("city_id") + "&callback=?");
		
	})
	
	
	var dxlCityId  = $("cookie","city_id") != "" ? $("cookie","city_id") : 7;
	var dxldate = new Date();
	var auspicious = null;//黄道吉日数据
	//日历
	$.getJSON(dxlHttpCom + "jsonp/?act=getJiri&city="+dxlCityId+"&callback=?",function(data){auspicious = data.hotelnum});
	$.jsSequence({frame:["datepicker","hotelOrder"]},function(){
		var rl = $("#dateDq");
		var rili_x,rili_y;
		
		var rili_h = $(".mk .date").height();
		var calendarMsg = $("#calendarMsg");
		var defDate = [dxldate.getFullYear(),(dxldate.getMonth() + 1),dxldate.getDate()];
		defDate[1] = defDate[1] + 3;
		if(defDate[1] > 12){
			defDate[1] = defDate[1] - 12;
			defDate[0] = defDate[0] + 1;
		} 
		
		rl.on({
			"click":function(){
				$("#calendarMsg").hide();
			},
			"focus":function(){
				$("#calendarMsg").hide();
			}
		});
		

		rl.datepicker({
			numberOfMonths: 2,
			minDate:dxldate.getFullYear() + "-" + (dxldate.getMonth() + 1) + "-" + dxldate.getDate(),
			maxDate:(dxldate.getFullYear()+1) + "-12-31",
			stepMonths: 2,
			firstDay: 7,
			defaultDate:defDate[0] + "-" + defDate[1] + "-" + dxldate.getDate(),
			
			onSelect:function(d){
				rili_x = $(".mk .date").offset().left;
				rili_y = $(".mk .date").offset().top;
				calendarMsgFun(d);
				$("#ui-datepicker-div").position().top < 241 ? calendarMsg.css({"left":rili_x-202,"top":(rili_y+rili_h)+3}) : calendarMsg.css({"left":rili_x-202,"top":(rili_y+rili_h)+3});
				calendarMsg.find("input").val($.cookie("user[mobile]"));
				$.cookie("listDate",$("#dateDq").val());	
			},
			onClose:function(d){
				rili_x = $(".mk .date").offset().left;
				rili_y = $(".mk .date").offset().top;
			}
		
		
		});
        $.datepicker.regional[ "zh-CN" ];
		
		$("#main .right .mk .date").on("click",function(){rl.focus()});
		
		if($.cookie("listDate")){
			rl.val($.cookie("listDate"));
		}
		else{
			rl.val("请选择日期");
		}
		
		$("#calendarMsg .close").on("click",function(){
			calendarMsg.hide();
		});
		
		// 档期弹层输入框提示
		var calendarMsgTag = $("#calendarMsg .tag"),calendarMsgInp = $("#calendarMsg input");
		calendarMsgTag.on("click",function(){
			calendarMsgInp.focus();
		});
		
		calendarMsgInp.on({
			"focus":assShow,
			"blur":function(){$("#calendarMsg .tag").removeClass("tagCur");},
			"keyup":assShow
		});
		
		
		function assShow(){	
			calendarMsgTag.addClass("tagCur");
			$.trim(calendarMsgInp.val()) != "" ? calendarMsgTag.hide() : calendarMsgTag.show();
		}
		

		// 婚期下单
		$("#calendarMsg .btn").on("click",function(){
			if(!calendarMsg.find("input").val().isPhone()){
				calendarMsg.find(".msg").html("<b>您输入的手机格式不正确</b>");
				return false;
			}
			else{
				calendarMsg.find(".msg").html("");
				calendarMsg.fadeOut();
				var riliDate = $.cookie("listDate") ? rl.val() : "";
				$.hotelOrder({
					"order_from":$.cookie("city") + "_Index_Schedule_MidCenter_new",
					"type":"1",
					"demand_class":2,
					"mobile":$("#calendarMsg input").val(),
					"date":riliDate
					
				});
			}
		});
		
		
		
		
	
		function calendarMsgFun(d){
			var _thisDate = d.split("-");
			var ieD = _thisDate.join("/");
			var weekday = new Date(ieD).getDay();
			var now2 = Date.parse(new Date("2014/09/18")) + (30*10*24*3600*1000); //10个月之后的时间
			var now3 = Date.parse(d);	
			var text10 = Math.round(Math.random()*7) + 3;
			var text25 = Math.round(Math.random()*15) + 10;
			var hotHtml1 = "仅剩" + text10 + "家酒店"; 
			var hotHtml2 = "仅剩" + text25 + "家酒店";
			var test50 = "还有超过50家酒店";
			if(d){
				if(now2-now3>=0){
					if(_thisDate[1]==1){
						if(_thisDate[2]==1 || _thisDate[2]==2 || _thisDate[2]==3){
							$("#calendarMsg .dangqi b").text(hotHtml1);
						}
						else{
							$("#calendarMsg .dangqi b").text(test50);
						}	
					}
					else if(_thisDate[1]==3 || _thisDate[1]==4 || _thisDate[1]==5 || _thisDate[1]==6){
						if(weekday==6 || weekday==0){
							$("#calendarMsg .dangqi b").text(hotHtml1);
						}
						
						else if(_thisDate[1]==5){
							if(_thisDate[2]==1 || _thisDate[2]==2 || _thisDate[2]==3){
								$("#calendarMsg .dangqi b").text(hotHtml1);
							}
							else{
								$("#calendarMsg .dangqi b").text(test50);
							}		
						}
						else{
							$("#calendarMsg .dangqi b").text(test50);
						}	
					}
					
					else if(_thisDate[1]==9 || _thisDate[1]==10 || _thisDate[1]==11 || _thisDate[1]==12){
						if(weekday==6 || weekday==0){
							$("#calendarMsg .dangqi b").text(hotHtml1);
						}
						
						else if(_thisDate[1]==10 ){
							if(_thisDate[2]==1 || _thisDate[2]==2 || _thisDate[2]==3 || _thisDate[2]==4 || _thisDate[2]==5 || _thisDate[2]==6 || _thisDate[2]==7){
								$("#calendarMsg .dangqi b").text(hotHtml1);
							}
							else{
								$("#calendarMsg .dangqi b").text(test50);
							}	
						
						}
						
						
						else{
							$("#calendarMsg .dangqi b").text(test50);
						}	
					
					}
					
				
					
				}
				else{
					if(_thisDate[1]==1){
						if(_thisDate[2]==1 || _thisDate[2]==2 || _thisDate[2]==3){
							$("#calendarMsg .dangqi b").text(hotHtml2);
						}	
						else{
							$("#calendarMsg .dangqi b").text(test50);
						}	
					}
					else if(_thisDate[1]==3 || _thisDate[1]==4 || _thisDate[1]==5 || _thisDate[1]==6){
						if(weekday==6 || weekday==0){
							$("#calendarMsg .dangqi b").text(hotHtml2);
						}
						else{
							$("#calendarMsg .dangqi b").text(test50);
						}	
					}
					else if(_thisDate[1]==5){
						if(_thisDate[2]==1 || _thisDate[2]==2 || _thisDate[2]==3){
							$("#calendarMsg .dangqi b").text(hotHtml2);
						}	
						else{
							$("#calendarMsg .dangqi b").text(test50);
						}	
					}
					else if(_thisDate[1]==9 || _thisDate[1]==10 || _thisDate[1]==11 || _thisDate[1]==12){
						if(weekday==6 || weekday==0){
							$("#calendarMsg .dangqi b").text(hotHtml2);
						}
						
						else if(_thisDate[1]==10){
							if(_thisDate[2]==1 || _thisDate[2]==2 || _thisDate[2]==3 || _thisDate[2]==4 || _thisDate[2]==5 || _thisDate[2]==6 || _thisDate[2]==7){		
								$("#calendarMsg .dangqi b").text(hotHtml2);
							}
							else{
								$("#calendarMsg .dangqi b").text(test50);
							}	
						}
						
						
						else{
							$("#calendarMsg .dangqi b").text(test50);
						}	
					
					}
					
					

				}

			}
			
			$.trim(rl.val()) == "" ? calendarMsg.fadeOut() : calendarMsg.fadeIn(function(){calendarMsg.find("input").focus();});
			
		}
	
	
	});
	
	/*黄道吉日*/
	$("#main .right .mk .hdjr").on("click",function(){
		window.open(windowHttp + "//" + $.cookie("city") + ".daoxila." + s4Com + "/jiri/#cid=banner_right_jiri");
	});

	
	
	
	
	$.jsSequence({frame:["dxlSlider","ad"]},function(){
		$.admAjaxData("24,25,26,27,28,29,30,31,33,34,35,42,48,49,50",function(d){
			/*首页图片轮换*/														 		
			$("#main article .slide ul").DxlAdm({admId:24,admType:"imgList"});
			var utmIndex=0;
			var utmTime=4000;
			var amIdArr = [];	
			$(d[0].adContent).each(function(index, element) {
				amIdArr.push(element.am_id);
			});
			
			if($.isUrlParameters("utm_adid")!=null || $.isUrlParameters("utm_adid")!=""){
				$(amIdArr).each(function(ind, val) {
					if(val == $.isUrlParameters("utm_adid")){
						utmIndex = ind;
						utmTime = 1000000;
					}		
				});		
					
			}
			
			
			$("#main article").dxlSlider({
				 pic:".slide ul",
				 btn:".slideTag",
				 index:utmIndex ,
				 time:utmTime,
				 flag:false
			});
		
		
			
			/*首页特别推荐左栏*/
			$("#column1Article article:eq(0) .left").DxlAdm({admId:25,admType:"img"});
			$("#column1Article article:eq(1) .left").DxlAdm({admId:33,admType:"img"});
			$("#column1Article article:eq(2) .left").DxlAdm({admId:34,admType:"img"});
			$("#column1Article article:eq(3) .left").DxlAdm({admId:35,admType:"img"});
			/*首页第二屏通栏广告位*/
			//$(".adBanner:eq(0)").DxlAdm({admId:26,admType:"img"});
			$(".ggBanner:eq(0)").DxlAdm({admId:26,admType:"img"});
			
			/* 首页1F-2F之间广告位  */
			//$(".adBanner:eq(1)").DxlAdm({admId:42,admType:"img"});
			$(".ggBanner:eq(1)").DxlAdm({admId:42,admType:"img"});
			
			/* 首页2F 婚纱摄影通栏广告    */
			$(".ggBanner:eq(2)").DxlAdm({admId:48,admType:"img"});
			
			/* 首页3F 婚庆通栏广告    */
			$(".ggBanner:eq(3)").DxlAdm({admId:49,admType:"img"});
			
			/* 首页4F 婚纱首饰通栏广告    */
			$(".ggBanner:eq(4)").DxlAdm({admId:50,admType:"img"});
			
			/*首页1F左栏图片广告位*/
			$("#column2 .guanggao .chgPic").DxlAdm({admId:27,admType:"imgList"});
			/*首页2F左栏图片广告位*/
			$("#column3 .guanggao .chgPic").DxlAdm({admId:28,admType:"imgList"});
			/*首页3F左栏图片广告位*/
			$("#column4 .guanggao .chgPic").DxlAdm({admId:29,admType:"imgList"});		
			/*首页4F左栏图片广告位*/
			$("#column5 .guanggao .chgPic").DxlAdm({admId:30,admType:"imgList"});
			/*首页5F左栏图片广告位*/
			$("#column6 .guanggao .chgPic").DxlAdm({admId:31,admType:"imgList"});
			
			
			
			/*$("#main article").dxlSlider({
				 pic:".slide ul",
				 btn:".slideTag",
				 index:0,
				 time:6000,
				 flag:false
			});*/
			
			
			
			//特别推荐模块tab切换
			$("#column1").dxlSlider({
				 pic:"#column1Article",
				 picTag:"article",
				 btn:"h2 ul",
				 index:0,
				 time:6000,
				 flag:false
			});


			/*婚宴酒店*/
			$.dxlLazyload("#column2",function(){
				$("#column2 .guanggao").dxlSlider({
					 pic:".chgPic",
					 btn:".chgBtn",
					 index:0,
					 time:3000,
					 flag:false
				});
				$("#column2 article").dxlTab({
					 content:".showPic",
					 btn:".tabBtn li",
					 index:0
				});
				
				
				$("#column2 .htlTitList").dxlTab({
					 content:"ul li .tips",
					 btn:"ul li",
					 index:0
				});
	
			});
			
			$.dxlLazyload("#column3",function(){
				$("#column3 .guanggao").dxlSlider({
					 pic:".chgPic",
					 btn:".chgBtn",
					 index:0,
					 time:3000,
					 flag:false
				});
				$("#column3 .htlTitList").dxlTab({
					 content:"ul li .tips",
					 btn:"ul li",
					 index:0
				});
			});
			
			$.dxlLazyload("#column4",function(){
				$("#column4 .guanggao").dxlSlider({
					 pic:".chgPic",
					 btn:".chgBtn",
					 index:0,
					 time:3000,
					 flag:false
				});
				$("#column4 .htlTitList").dxlTab({
					 content:"ul li .tips",
					 btn:"ul li",
					 index:0
				});
			});
			
			$.dxlLazyload("#column5",function(){
				$("#column5 .guanggao").dxlSlider({
					 pic:".chgPic",
					 btn:".chgBtn",
					 index:0,
					 time:3000,
					 flag:false
				});
				$("#column5 .htlTitList").dxlTab({
					 content:"ul li .tips",
					 btn:"ul li",
					 index:0
				});
			});
			
			$.dxlLazyload("#column6",function(){
				$("#column6 .guanggao").dxlSlider({
					 pic:".chgPic",
					 btn:".chgBtn",
					 index:0,
					 time:3000,
					 flag:false
				});
				$("#column6 .htlTitList").dxlTab({
					 content:"ul li .tips",
					 btn:"ul li",
					 index:0
				});	
			});
			
			$.dxlLazyload("#column7",function(){
				
			});
		});

		
    });
	
	//婚宴酒店红星
	$("#column2 .dxlxxCur").each(function(){
		$(this).css({width:$(this).attr("total")/5*100+"%"});
	});
	
	/*浮动工具栏*/
	var selectPop = $("#selectPop");
	selectPop.dxlLayerFixedShow("top");
	$(window).on("scroll",function(){
		$(this).scrollTop() > $("#column1").position().top - 120 ? selectPop.show() : selectPop.hide();
	}).scroll();
	
	// 量身定制
	$("#select1Box").dxlSelect();
	$("#select2Box").dxlSelect();
	$("#select3Box").dxlSelect();
	
	$("#select1Box").on("click",function(){
		$(this).siblings("div").find("ul").hide();
		$("#select2Box").find("i").removeClass("cur");
		$("#select3Box").find("i").removeClass("cur");
	});
	
	$("#select2Box").on("click",function(){
		$(this).siblings("div").find("ul").hide();
		$("#select1Box").find("i").removeClass("cur");
		$("#select3Box").find("i").removeClass("cur");
	});
	
	$("#select3Box").on("click",function(){
		$(this).siblings("div").find("ul").hide();
		$("#select1Box").find("i").removeClass("cur");
		$("#select2Box").find("i").removeClass("cur");
	});

});


