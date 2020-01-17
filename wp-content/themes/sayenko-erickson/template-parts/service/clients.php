<?php
// Service - Clients

if( ! class_exists( 'Clients_Section' ) ) {
    class Clients_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'clients' );
            $this->set_fields( $fields );
                        
            $settings = $this->get_fields( 'clients' );
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
                     $this->get_name() . '-clients'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-clients'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
                                    
            $heading = _s_format_string( $this->get_fields( 'heading' ), 'h2' );
            $heading    = sprintf( '<header>%s</header>', $heading  ); 
            
            $rows       = $this->get_fields( 'locations' );
            
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
                
                $markers .= sprintf( '<div id="marker-%d" class="marker" data-id="%d" data-lat="%s" data-lng="%s" data-active="%s">%s%s%s</div>',
                                    $marker_id,
                                    $marker_id,
                                    $map['lat'], 
                                    $map['lng'],
                                    $active,
                                    $image,
                                    $title,
                                    $address
                                    
                         );
            }
            
            if( empty( $markers ) ) {
                return false;
            }
            
            $markers = sprintf( '<div class="full-width"><div class="acf-map google-map">%s</div></div>', $markers );
                                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x">
                                    <div class="cell">%s%s</div>
                                </div>
                            </div>%s',
                            $heading,
                            ul( $legend, ['id' => 'map-legend'] ),
                            $markers
                         );  
        }
        
        
    }
}
   
new Clients_Section;
