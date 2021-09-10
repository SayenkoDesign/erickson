<?php
// Block - Offices

if( ! class_exists( 'Offices_Block' ) ) {
    class Offices_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $fields = get_field( 'offices' );
            $this->set_fields( $fields );
                        
            $settings = $this->get_fields( 'offices' );
            $this->set_settings( $settings );
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-offices'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-offices'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
                                    
            $heading = _s_format_string( $this->get_fields( 'heading' ), 'h2' );
            
            $rows = $this->get_fields( 'locations' );
            
            if( empty( $rows ) ) {
                return false;
            }
            
            $markers = '';
            $legend = [];
            foreach( $rows as $key => $row ) {
                
                $map = $row['map']; 
                if( empty( $map ) ) {
                    continue;
                }
                
                $marker_id  = $key+1;
                $title      = $row['title']; 
                $address    = _s_format_string( $row['address'], 'p' ); 
                
                $details = $row['details'];
                $lines = '';
                
                if( ! empty( $details ) ) {
                    foreach( $details as $detail ) {
                        $lines .= $this->get_line( $detail );
                    }
                    
                    if( ! empty( $lines ) ) {
                        $lines = sprintf( '<div class="details">%s</div>', $lines );
                    }
                }
                
                $directions = sprintf( '<p class="directions"><a href="https://www.google.com/maps/dir/?api=1&destination=%s,%s" target="_blank">%s [+]</a></p>',                                       $map['lat'], 
                                       $map['lng'] ,
                                       _( 'Get Directions', '_s' )
                                     );

                
                $active = !$key ? 'true' : 'false';
                
                $legend[] = sprintf( '<span class="marker-anchor" data-marker-id="%d">%s</span>', $marker_id, $title );
                
                $markers .= sprintf( '<div id="marker-%d" class="marker" data-id="%d" data-lat="%s" data-lng="%s" data-active="%s"><div class="panel">%s%s%s%s</div></div>',
                                    $marker_id,
                                    $marker_id,
                                    $map['lat'], 
                                    $map['lng'],
                                    $active,
                                    _s_format_string( $title, 'h4' ),
                                    $address,
                                    $lines,
                                    $directions
                                    
                         );
            }
            
            if( empty( $markers ) ) {
                return false;
            }
            
            $markers = sprintf( '<div class="full-width"><div class="acf-map google-map">%s</div></div>', $markers );
                                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x">
                                    <div class="cell"><header>%s%s</header></div>
                                </div>
                            </div>%s',
                            $heading,
                            ul( $legend, [ 'class' => 'no-bullet', 'id' => 'map-legend'] ),
                            $markers
                         );  
        }
        
        
        private function get_line( $row = false ) {
            
            $type = strtolower( $row['type'] );
            
            if( empty( $row[$type] ) ) {
                return false;
            }
                        
            $label = ! empty( $row['label'] ) ? sprintf( '%s ', $row['label'] ) : '';
            
            return  _s_format_string( $label . $this->{'get_' . $type}( $row[$type] ), 'p', [ 'class' => $type ] );          
        }
        
        private function get_text( $value = '' ) {
            return $value;
        }
        
        
        private function get_email( $value = '' ) {
            return sprintf( '<a href="mailto:%s" target="_blank">%s</a>', antispambot( $value ), antispambot( $value ) );
        }
        
        
        private function get_phone( $value = '' ) {
            return sprintf( '<a href="tel:%s">%s</a>', preg_replace( '/[^0-9]/','', $value ), $value );
        }
        
        
    }
}
   
new Offices_Block( $data );
