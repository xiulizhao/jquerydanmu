( function( root, factory ) {
	/* CommonJS */
	if ( typeof exports == "object" ) module.exports = factory();
	/* AMD module */
	else if ( typeof define == "function" && define.amd ) define( factory );

	/*第一处修改，将wwtemplate改为元素名(data-wwclass的值)*/
	else root.wwtemplate = factory();
}( this, function() {
	"use strict";

	/*第二处修改，将wwtemplate改为元素名(data-wwclass的值)*/
	var wwclassName = /*INSBEGIN:WWCLSNAME*/
		"jquerydanmu"
	/*INSEND:WWCLSNAME*/
	;

	/*默认没有依赖资源
	function loadDependence(fncallback) {
		if (typeof fncallback === "function") {
			fncallback();
		}
	}
	//*/

	//* 加载依赖资源, 如没有依赖资源可直接回调
	var loadDependence = function( fncallback ) {
		// 这里依赖具体的依赖对象，由于可能从其它元素中被加载，因此名称需要使用依赖库的名称，并需要settimeout来等待。
		// 本模板只支持一个依赖库，如果需要多个依赖库，需要改进。
		if ( !window.wwload.jquerydanmu ) {
			window.wwload.jquerydanmu = "wait";
			requirejs.config( {
				paths: {
					"jquerydanmu": "libs/jquery.danmu.js/dist/jquery.danmu.min"
				},
				"shim": {
					"jquerydanmu": {
						deps: [ "jquery" ]
					}
				}
			} );
			require( [ "jquerydanmu" ], function() {
				window.wwload.jquerydanmu = true;
				replace();
				fncallback();
			} );
		} else if ( window.wwload.jquerydanmu === "wait" ) {
			setTimeout( function() {
				loadDependence( fncallback );
			}, 100 );
		} else {
			replace();
			fncallback();
		}

		function replace() {
			loadDependence = function( fncallback ) {
				fncallback();
			};
		}
		//*/
	};

	// 本函数处理元素初始化动作
	var init = function() {
		init = function() {
			return true;
		};

		$.wwclass.addEvtinHandler( wwclassName, evtInHandler );

		// 如有其他初始化动作, 请继续在下方添加
	};

	function danmu_init( id, $ele ) {
		var height = $ele.attr( "data-height" ) ? $ele.attr( "data-height" ) : "auto"; // ? parseInt($ele.attr("data-height")) : 360;
		var width = $ele.attr( "data-width" ) ? $ele.attr( "data-width" ) : "100%"; // ? parseInt($ele.attr("data-width")) : 640;
		var zindex = $ele.attr( "data-zindex" ) ? parseInt( $ele.attr( "data-zindex" ) ) : "auto";
		var speed = $ele.attr( "data-speed" ) ? parseInt( $ele.attr( "data-speed" ) ) : 7000;
		var sumtime = $ele.attr( "data-sumtime" ) ? parseInt( $ele.attr( "data-sumtime" ) ) : 65535;
		var danmuloop = $ele.attr( "data-danmuloop" ) ? true : false;
		var defaultfcolor = $ele.attr( "data-defaultfcolor" ) ? $ele.attr( "data-defaultfcolor" ) : "#FFFFFF";
		var fontsizesmall = $ele.attr( "data-fontsizesmall" ) ? parseInt( $ele.attr( "data-fontsizesmall" ) ) : 16;
		var fontsizebig = $ele.attr( "data-fontsizebig" ) ? parseInt( $ele.attr( "data-fontsizebig" ) ) : 24;
		var opacity = $ele.attr( "data--opacity" ) ? $ele.attr( "data--opacity" ) : "0.9";
		// var tbtime = $ele.attr("data-tbtime") ? parseInt($ele.attr("data-tbtime")) : 6000;
		// var subtitleprotection = $ele.attr("data-subtitleprotection") ? true : false;
		// var positionoptimize = $ele.attr("data-positionoptimize") ? true : false;
		var maxcountinscreen = $ele.attr( "data-maxcountinscreen" ) ? parseInt( $ele.attr( "data-maxcountinscreen" ) ) : 40;
		var maxcountsec = $ele.attr( "data-maxcountsec" ) ? parseInt( $ele.attr( "data-maxcountsec" ) ) : 10;
		$( "#" + id ).danmu( {
			height: height, //弹幕区高度
			width: width, //弹幕区宽度
			zindex: zindex, //弹幕区域z-index属性
			speed: speed, //滚动弹幕的默认速度，这是数值值得是弹幕滚过每672像素所需要的时间（毫秒）
			sumTime: sumtime, //弹幕流的总时间
			// danmuLoop: danmuloop, //是否循环播放弹幕

			defaultFontColor: defaultfcolor, //弹幕的默认颜色
			fontSizeSmall: fontsizesmall, //小弹幕的字号大小
			FontSizeBig: fontsizebig, //大弹幕的字号大小
			opacity: opacity, //默认弹幕透明度
			// topBottonDanmuTime: tbtime, // 顶部底部弹幕持续时间（毫秒）
			// SubtitleProtection: subtitleprotection, //是否字幕保护
			// positionOptimize: positionoptimize, //是否位置优化，位置优化是指像AB站那样弹幕主要漂浮于区域上半部分

			maxCountInScreen: maxcountinscreen, //屏幕上的最大的显示弹幕数目,弹幕数量过多时,优先加载最新的。
			maxCountPerSec: maxcountsec, //每分秒钟最多的弹幕数目,弹幕数量过多时,优先加载最新的。

		} );
	}

	function send_danmu( $ele ) {
		var endstr;
		var $danmuextend = $ele.find( ".danmuextend" );
		var id = $ele.attr( "id" );
		var text = $danmuextend.find( ".text" ).val();
		var color = $danmuextend.find( ".color" ).val();
		var position = $danmuextend.find( "position" ).val();
		var size = $danmuextend.find( "size" ).val();
		var time = $( '#' + id ).data( "nowTime" ) + 1;
		//以上部分为从页面控件中获取用户输入的弹幕内容及选择的颜色等选项
		var new_obj = '{ "text":"' + text + '","color":"' + color + '","size":"' + size + '","position":"' + position + '","time":' + time + ',"isnew":""}'; //构造加上了innew属性的字符串danmu对象
		// var new_obj = eval('(' + text_obj + ')'); //转化为js对象
		console.log( new_obj );
		endstr = JSON.parse( new_obj );
		return endstr;
	}
	// 元素初始化——每个wwclass元素只会被初始化一次。, 传入了元素对象($前缀表明是一个jquery对象).
	function processElement( $ele ) {
		// 对 $ele 元素做对应处理
		var id = "jquerydanmu_" + $.wwclass.helper.randomNumber();
		var diyid = $ele.attr( "id" );
		if ( diyid ) {
			$ele.attr( "id", diyid );
		} else {
			$ele.attr( "id", id );
		}
		//初始化
		var endid = $ele.attr( "id" );
	}

	// 元素析构——每个wwclass元素只会被析构一次。, 传入了元素对象($前缀表明是一个jquery对象).
	function finalizeElement( $ele ) {
		// 对 $ele 元素做对应处理
	}

	// 监听属性相关处理
	var evtInHandler = function( $ele, attribute, value ) {
		// 处理代码
		switch ( attribute ) {
			case "data--init":
				// 添加处理动作
				var id = $ele.attr( "id" );
				if ( value == "init" ) {
					// value = JSON.parse(value);
					danmu_init( id, $ele );
					setTimeout( function() {
						$ele.parent().css( "height", $ele.css( "height" ) );
					}, 450 );
				}
				break;
			case "data--adddanmu":
				id = $ele.attr( "id" );
				if ( value ) {
					value = JSON.parse( value );
					if ( value.type == "init" ) {
						$( '#' + id ).danmu( "addDanmu", value.data );
					}
					if ( value.type == "new" ) {
						var time = $( '#' + id ).data( "nowTime" ) + 1;
						var isnew = "";
						for ( var i = 0; i < value.data.length; i++ ) {
							value.data[ i ].time = time;
							value.data[ i ].isnew = isnew;
						}
						$( '#' + id ).danmu( "addDanmu", value.data );
					}
				}
				break;
			case "data--state":
				// 添加处理动作
				id = $ele.attr( "id" );
				if ( value == "start" ) {
					$( '#' + id ).danmu( 'danmuStart' );
					$.wwclass.helper.updateProp( $ele, "data--init", "" );
				}
				if ( value == "stop" ) {
					$( '#' + id ).danmu( 'danmuStop' );
				}

				$.wwclass.helper.updateProp( $ele, "data--init", "" );
				break;
			case "data--opacity":
				id = $ele.attr( "id" );
				if ( value ) {
					$( "#" + id ).danmu( "setOpacity", value );
				}
				break;
			case "finalize":
				finalizeElement( $ele );
				break;
			default:
				console.info( "监听到 " + attribute + " 属性值改变为 " + value + ", 但是没找到对应处理动作." );
		}
	};

	// 以下部分不需要修改
	if ( !$.wwclass ) {
		console.error( "Can not use without wwclass.js" );
		return false;
	}

	var ret = /*INSBEGIN:WWCLSHANDLER*/
		function( set ) {
			if ( set.length > 0 ) {
				loadDependence( function() {
					init();
					$( set ).each( function( index, targetDom ) {
						processElement( $( targetDom ) );
					} );
				} );
			}
		}
	/*INSEND:WWCLSHANDLER*/
	;

	return ret;

} ) );
