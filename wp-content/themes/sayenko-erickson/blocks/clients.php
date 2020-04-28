<?php
// Block - Clients

if( ! class_exists( 'Clients_Block' ) ) {
    class Clients_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'locations', get_field( 'locations' ) );
            
            /*
            $this->set_settings( 'padding', get_field( 'padding' )  );
            $this->set_settings( 'margin', get_field( 'margin' )  );
            */
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();          
            
        }  
                
        
        // Add content
        public function render() {
                                    
            $heading = $this->get_fields( 'heading' );
            if( ! empty( $heading ) ) {
                $heading = _s_format_string( $heading, 'h2' );
            }
            
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
                $image      = _s_get_acf_image( $row['image'], 'thumbnail' ); 
                
                $address    = _s_format_string( $row['address'], 'p' ); 
                $case_study = $row['case_study']; 
                if( ! empty( $case_study ) ) {
                    $case_study = sprintf( '<a href="%s">%s [+]</a>', get_permalink( $case_study ), __( 'See Case' ) );
                }
                
                $active = !$key ? 'true' : 'false';
                
                $legend[] = sprintf( '<span class="marker-anchor" data-marker-id="%d">%s</span>', $marker_id, $title );
                
                $markers .= sprintf( '<div id="marker-%d" class="marker" data-id="%d" data-lat="%s" data-lng="%s" data-active="%s"><div class="panel">%s%s%s</div></div>',
                                    $marker_id,
                                    $marker_id,
                                    $map['lat'], 
                                    $map['lng'],
                                    $active,
                                    $image,
                                    _s_format_string( $title, 'h4' ),
                                    $address
                                    
                         );
            }
            
            if( empty( $markers ) ) {
                return false;
            }
            
            $markers = sprintf( '<div class="full-width"><div class="acf-map google-map">%s</div></div>', $markers );
                                        
            return sprintf( '
                                <div class="grid-x">
                                    <div class="cell"><header>%s%s</header></div>
                                </div>
                            %s',
                            $heading,
                            ul( $legend, [ 'class' => 'no-bullet', 'id' => 'map-legend'] ),
                            $markers
                         );  
        }
        
        
    }
}
   
new Clients_Block( $data );
