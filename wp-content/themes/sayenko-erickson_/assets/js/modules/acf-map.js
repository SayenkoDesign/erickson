import $ from 'jquery';

export default {
	init() {
        
        
        function InfoBox(t){t=t||{},google.maps.OverlayView.apply(this,arguments),this.content_=t.content||"",this.disableAutoPan_=t.disableAutoPan||!1,this.maxWidth_=t.maxWidth||0,this.pixelOffset_=t.pixelOffset||new google.maps.Size(0,0),this.position_=t.position||new google.maps.LatLng(0,0),this.zIndex_=t.zIndex||null,this.boxClass_=t.boxClass||"infoBox",this.boxStyle_=t.boxStyle||{},this.closeBoxMargin_=t.closeBoxMargin||"2px",this.closeBoxURL_=t.closeBoxURL||"//www.google.com/intl/en_us/mapfiles/close.gif",""===t.closeBoxURL&&(this.closeBoxURL_=""),this.closeBoxTitle_=t.closeBoxTitle||" Close ",this.infoBoxClearance_=t.infoBoxClearance||new google.maps.Size(1,1),void 0===t.visible&&(void 0===t.isHidden?t.visible=!0:t.visible=!t.isHidden),this.isHidden_=!t.visible,this.alignBottom_=t.alignBottom||!1,this.pane_=t.pane||"floatPane",this.enableEventPropagation_=t.enableEventPropagation||!1,this.div_=null,this.closeListener_=null,this.moveListener_=null,this.contextListener_=null,this.eventListeners_=null,this.fixedWidthSet_=null}InfoBox.prototype=new google.maps.OverlayView,InfoBox.prototype.createInfoBoxDiv_=function(){var t,i,e,o=this,s=function(t){t.cancelBubble=!0,t.stopPropagation&&t.stopPropagation()};if(!this.div_){if(this.div_=document.createElement("div"),this.setBoxStyle_(),void 0===this.content_.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+this.content_:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(this.content_)),this.getPanes()[this.pane_].appendChild(this.div_),this.addClickHandler_(),this.div_.style.width?this.fixedWidthSet_=!0:0!==this.maxWidth_&&this.div_.offsetWidth>this.maxWidth_?(this.div_.style.width=this.maxWidth_,this.div_.style.overflow="auto",this.fixedWidthSet_=!0):(e=this.getBoxWidths_(),this.div_.style.width=this.div_.offsetWidth-e.left-e.right+"px",this.fixedWidthSet_=!1),this.panBox_(this.disableAutoPan_),!this.enableEventPropagation_){for(this.eventListeners_=[],i=["mousedown","mouseover","mouseout","mouseup","click","dblclick","touchstart","touchend","touchmove"],t=0;t<i.length;t++)this.eventListeners_.push(google.maps.event.addDomListener(this.div_,i[t],s));this.eventListeners_.push(google.maps.event.addDomListener(this.div_,"mouseover",function(t){this.style.cursor="default"}))}this.contextListener_=google.maps.event.addDomListener(this.div_,"contextmenu",function(t){t.returnValue=!1,t.preventDefault&&t.preventDefault(),o.enableEventPropagation_||s(t)}),google.maps.event.trigger(this,"domready")}},InfoBox.prototype.getCloseBoxImg_=function(){var t="";return""!==this.closeBoxURL_&&(t="<img",t+=" src='"+this.closeBoxURL_+"'",t+=" align=right",t+=" title='"+this.closeBoxTitle_+"'",t+=" style='",t+=" position: relative;",t+=" cursor: pointer;",t+=" margin: "+this.closeBoxMargin_+";",t+="'>"),t},InfoBox.prototype.addClickHandler_=function(){var t;""!==this.closeBoxURL_?(t=this.div_.firstChild,this.closeListener_=google.maps.event.addDomListener(t,"click",this.getCloseClickHandler_())):this.closeListener_=null},InfoBox.prototype.getCloseClickHandler_=function(){var t=this;return function(i){i.cancelBubble=!0,i.stopPropagation&&i.stopPropagation(),google.maps.event.trigger(t,"closeclick"),t.close()}},InfoBox.prototype.panBox_=function(t){var i,e=0,o=0;if(!t&&(i=this.getMap())instanceof google.maps.Map){i.getBounds().contains(this.position_)||i.setCenter(this.position_);var s=this.pixelOffset_.width,n=this.pixelOffset_.height,h=this.div_.offsetWidth,l=this.div_.offsetHeight,d=this.infoBoxClearance_.width,r=this.infoBoxClearance_.height;if(2==i.panToBounds.length){var a={left:0,right:0,top:0,bottom:0};a.left=-s+d,a.right=s+h+d,this.alignBottom_?(a.top=-n+r+l,a.bottom=n+r):(a.top=-n+r,a.bottom=n+l+r),i.panToBounds(new google.maps.LatLngBounds(this.position_),a)}else{var _=i.getDiv(),p=_.offsetWidth,v=_.offsetHeight,f=this.getProjection().fromLatLngToContainerPixel(this.position_);if(f.x<-s+d?e=f.x+s-d:f.x+h+s+d>p&&(e=f.x+h+s+d-p),this.alignBottom_?f.y<-n+r+l?o=f.y+n-r-l:f.y+n+r>v&&(o=f.y+n+r-v):f.y<-n+r?o=f.y+n-r:f.y+l+n+r>v&&(o=f.y+l+n+r-v),0!==e||0!==o){i.getCenter();i.panBy(e,o)}}}},InfoBox.prototype.setBoxStyle_=function(){var t,i;if(this.div_){for(t in this.div_.className=this.boxClass_,this.div_.style.cssText="",i=this.boxStyle_)i.hasOwnProperty(t)&&(this.div_.style[t]=i[t]);(void 0===this.div_.style.WebkitTransform||-1===this.div_.style.WebkitTransform.indexOf("translateZ")&&-1===this.div_.style.WebkitTransform.indexOf("matrix"))&&(this.div_.style.WebkitTransform="translateZ(0)"),void 0!==this.div_.style.opacity&&""!==this.div_.style.opacity&&(this.div_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(Opacity='+100*this.div_.style.opacity+')"',this.div_.style.filter="alpha(opacity="+100*this.div_.style.opacity+")"),this.div_.style.position="absolute",this.div_.style.visibility="hidden",null!==this.zIndex_&&(this.div_.style.zIndex=this.zIndex_)}},InfoBox.prototype.getBoxWidths_=function(){var t,i={top:0,bottom:0,left:0,right:0},e=this.div_;return document.defaultView&&document.defaultView.getComputedStyle?(t=e.ownerDocument.defaultView.getComputedStyle(e,""))&&(i.top=parseInt(t.borderTopWidth,10)||0,i.bottom=parseInt(t.borderBottomWidth,10)||0,i.left=parseInt(t.borderLeftWidth,10)||0,i.right=parseInt(t.borderRightWidth,10)||0):document.documentElement.currentStyle&&e.currentStyle&&(i.top=parseInt(e.currentStyle.borderTopWidth,10)||0,i.bottom=parseInt(e.currentStyle.borderBottomWidth,10)||0,i.left=parseInt(e.currentStyle.borderLeftWidth,10)||0,i.right=parseInt(e.currentStyle.borderRightWidth,10)||0),i},InfoBox.prototype.onRemove=function(){this.div_&&(this.div_.parentNode.removeChild(this.div_),this.div_=null)},InfoBox.prototype.draw=function(){this.createInfoBoxDiv_();var t=this.getProjection().fromLatLngToDivPixel(this.position_);this.div_.style.left=t.x+this.pixelOffset_.width+"px",this.alignBottom_?this.div_.style.bottom=-(t.y+this.pixelOffset_.height)+"px":this.div_.style.top=t.y+this.pixelOffset_.height+"px",this.isHidden_?this.div_.style.visibility="hidden":this.div_.style.visibility="visible"},InfoBox.prototype.setOptions=function(t){void 0!==t.boxClass&&(this.boxClass_=t.boxClass,this.setBoxStyle_()),void 0!==t.boxStyle&&(this.boxStyle_=t.boxStyle,this.setBoxStyle_()),void 0!==t.content&&this.setContent(t.content),void 0!==t.disableAutoPan&&(this.disableAutoPan_=t.disableAutoPan),void 0!==t.maxWidth&&(this.maxWidth_=t.maxWidth),void 0!==t.pixelOffset&&(this.pixelOffset_=t.pixelOffset),void 0!==t.alignBottom&&(this.alignBottom_=t.alignBottom),void 0!==t.position&&this.setPosition(t.position),void 0!==t.zIndex&&this.setZIndex(t.zIndex),void 0!==t.closeBoxMargin&&(this.closeBoxMargin_=t.closeBoxMargin),void 0!==t.closeBoxURL&&(this.closeBoxURL_=t.closeBoxURL),void 0!==t.closeBoxTitle&&(this.closeBoxTitle_=t.closeBoxTitle),void 0!==t.infoBoxClearance&&(this.infoBoxClearance_=t.infoBoxClearance),void 0!==t.isHidden&&(this.isHidden_=t.isHidden),void 0!==t.visible&&(this.isHidden_=!t.visible),void 0!==t.enableEventPropagation&&(this.enableEventPropagation_=t.enableEventPropagation),this.div_&&this.draw()},InfoBox.prototype.setContent=function(t){this.content_=t,this.div_&&(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.fixedWidthSet_||(this.div_.style.width=""),void 0===t.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+t:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(t)),this.fixedWidthSet_||(this.div_.style.width=this.div_.offsetWidth+"px",void 0===t.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+t:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(t))),this.addClickHandler_()),google.maps.event.trigger(this,"content_changed")},InfoBox.prototype.setPosition=function(t){this.position_=t,this.div_&&this.draw(),google.maps.event.trigger(this,"position_changed")},InfoBox.prototype.setZIndex=function(t){this.zIndex_=t,this.div_&&(this.div_.style.zIndex=t),google.maps.event.trigger(this,"zindex_changed")},InfoBox.prototype.setVisible=function(t){this.isHidden_=!t,this.div_&&(this.div_.style.visibility=this.isHidden_?"hidden":"visible")},InfoBox.prototype.getContent=function(){return this.content_},InfoBox.prototype.getPosition=function(){return this.position_},InfoBox.prototype.getZIndex=function(){return this.zIndex_},InfoBox.prototype.getVisible=function(){return void 0!==this.getMap()&&null!==this.getMap()&&!this.isHidden_},InfoBox.prototype.getWidth=function(){var t=null;return this.div_&&(t=this.div_.offsetWidth),t},InfoBox.prototype.getHeight=function(){var t=null;return this.div_&&(t=this.div_.offsetHeight),t},InfoBox.prototype.show=function(){this.isHidden_=!1,this.div_&&(this.div_.style.visibility="visible")},InfoBox.prototype.hide=function(){this.isHidden_=!0,this.div_&&(this.div_.style.visibility="hidden")},InfoBox.prototype.open=function(t,i){var e=this;i&&(this.setPosition(i.getPosition()),this.moveListener_=google.maps.event.addListener(i,"position_changed",function(){e.setPosition(this.getPosition())})),this.setMap(t),this.div_&&this.panBox_(this.disableAutoPan_)},InfoBox.prototype.close=function(){var t;if(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.eventListeners_){for(t=0;t<this.eventListeners_.length;t++)google.maps.event.removeListener(this.eventListeners_[t]);this.eventListeners_=null}this.moveListener_&&(google.maps.event.removeListener(this.moveListener_),this.moveListener_=null),this.contextListener_&&(google.maps.event.removeListener(this.contextListener_),this.contextListener_=null),this.setMap(null)};
        
        
        
        var map_zoom_level = 10;
    
        /*
        *  render_map
        *   Do we want to center map on a specific marker?
        *
        */
        function render_map( $el ) {
            
            var center_lat = $el.find( '.marker[data-active="true"]' ).data('lat');
            var center_lng = $el.find( '.marker[data-active="true"]' ).data('lng');
                
            // variables
            var $markers = $el.find('.marker');
            var args = {
                zoom	: map_zoom_level,
                center	: new google.maps.LatLng(center_lat, center_lng),
                mapTypeId	: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                //disableDefaultUI: false,
                zoomControl: true,
                scaleControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                styles: [
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e3e3e3"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "color": "#cccccc"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#FFFFFF"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]
            };
        
            // create map
            var map = new google.maps.Map( $el[0], args);
            
            map.setOptions({ minZoom: 5, maxZoom: 15 });
        
            // add a markers reference
            map.markers = [];
            map.infoBoxes = [];
        
            // add markers
            $markers.each(function(){
                add_marker( $(this), map );
            });
        
            // let's open the first map marker
            google.maps.event.trigger(map.markers[0], 'click');
        
            // return
            return map;
        }
        
        /*
        *  add_marker
        *
        *  This function will add a marker to the selected Google Map
        *
        *  @type	function
        *  @date	8/11/2013
        *  @since	4.3.0
        *
        *  @param	$marker (jQuery element)
        *  @param	map (Google Map object)
        *  @return	n/a
        */
        function add_marker( $marker, map ) {
        
            // var
            var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );
                            
            var image = {
              url: map_params.icon,
              scaledSize: new google.maps.Size(33, 48), // IE hack
            };
        
            // create marker
            // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions.optimized
            var marker = new google.maps.Marker({
                position	: latlng,
                map			: map,
                icon        : image,
                optimized   : false, // IE hack
                // Custom values
                _region   : $marker.attr('data-region'),
                _id         : $marker.attr('data-id')
            });
            
         
            // add to array
            map.markers.push( marker );
        
            // if marker contains HTML, add it to an infoWindow
            if( $marker.html() )
            {
    
                var infobox = new InfoBox({
                    content: $marker.html(),
                    disableAutoPan: false,
                    zIndex: null,
                    pixelOffset: new google.maps.Size(-140, -70),
                    alignBottom: true,
                    boxStyle: {
                        //background: "none",
                        width: '276px'
                    },
                    closeBoxMargin: 0
                    ,closeBoxURL: map_params.cross
                    ,infoBoxClearance: new google.maps.Size(1, 1)
                    ,isHidden: false
                    ,pane: "floatPane"
                    ,enableEventPropagation: false
                    ,id:$marker.attr('data-id')
                });
                
                map.infoBoxes.push(infobox);
        
                // show info window when marker is clicked
                google.maps.event.addListener(marker, 'click', function() {
                    // close not working
                    for(var i = 0; i < map.infoBoxes.length; i++){
                        map.infoBoxes[i].close();
                    }
                    
                    // center marker on click
                    var latLng = marker.getPosition();
                    map.setCenter( latLng );
                    map.panBy(0, -150);
                    
                    // open infowindow
                    infobox.open( map, marker );
                    
                    // marker._id
                    var $current = $("#map-legend").find('span.active');
                    var current_id = $current.data('marker-id');
                    var current_parent_id = $current.parents('.is-accordion-submenu-parent').attr('id');
                    var $clicked;
                    
                    if( current_id != marker._id ) {
                        $("#map-legend").find('span').removeClass('active');
                        $clicked = $( '[data-marker-id="' + marker._id + '"]', "#map-legend" );
                        $clicked.addClass('active');
                        if( $clicked.parents('.is-accordion-submenu-parent').attr('id') != current_parent_id ) {
                            $clicked.parents('.is-accordion-submenu-parent').find('a').trigger('click');
                        }
                    }
                    
                    
                });
                
                
                // close info window when map is clicked
                google.maps.event.addListener(map, 'click', function(event) {
                    if (infobox) {
                        infobox.close(); 
                    }
                }); 
                
                // let's open the first map marker, moved this to "render_map" function
                //google.maps.event.trigger(map.markers[0], 'click');
               
        
            }
        }
        
        /*
        *  center_map
        *
        *  This function will center the map, showing all markers attached to this map
        *
        *  @type	function
        *  @date	8/11/2013
        *  @since	4.3.0
        *
        *  @param	map (Google Map object)
        *  @return	n/a
        */
        function center_map( map ) {
            
            //var bounds = new google.maps.LatLngBounds();
            //map.setCenter( bounds.getCenter() );
            //map.setZoom( 3 );
            
            
            // vars
            /*
            var bounds = new google.maps.LatLngBounds();
         
            // loop through all markers and create bounds
            $.each( map.markers, function( i, marker ){
                var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
                bounds.extend( latlng );
            });
         
            // only 1 marker?
            if( map.markers.length == 1 ){
                // set center of map
                map.setCenter( bounds.getCenter() );
                map.setZoom( 11 );
            }
            else{
                // fit to bounds
                //map.fitBounds( bounds );
                map.setCenter( bounds.getCenter() );
            }
            */
            
        }
        
        /*
        *  document ready
        *
        *  This function will render each map when the document is ready (page has loaded)
        *
        *  @type	function
        *  @date	8/11/2013
        *  @since	5.0.0
        *
        *  @param	n/a
        *  @return	n/a
        */
        // global var
        var map = null;
        
        // Loop all instances, though we're only going to use one this time.
        $('.acf-map').each(function(){
            // create map
            map = render_map( $(this) );
            
            google.maps.event.addDomListener(window, "resize", function() {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });	
            
            var spacer = 150; // this is used to pad the space
            
            if($("#map-legend").length > 0 && $("#map-legend").parent().height() + spacer > 600 ) {
                var height = $("#map-legend").parent().height();
                $(this).css('min-height', height + spacer );
            }
            
            $("#map-legend").addClass('show');	
        
        });
        
        
        
            
        $("#map-legend").on( 'click', '.marker-anchor', function(){
            
            // Do nothing if active marker
            if( $(this).hasClass('active') ) {
                return;
            }
            var id = $(this).data('marker-id');
                    
            for (var i= 0; i < map.markers.length; i++) {            
                if (map.markers[i]._id == id) {  
                    $("#map-legend").find('span').removeClass('active');
                    $(this).addClass('active');
                    google.maps.event.trigger(map.markers[i], 'click');
                    break;
                }
            }
            
            
        });
	
	},
};
