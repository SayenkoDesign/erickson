<?php
// Service - Gallery

if( ! class_exists( 'Service_Gallery' ) ) {
    class Service_Gallery extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'gallery' );
            $this->set_fields( $fields );
                        
            $settings = get_field( 'settings' );
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
                     $this->get_name() . '-service-gallery'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-service-gallery'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
            $heading = _s_format_string( $this->get_fields( 'heading' ), 'h2' );
            $description = $this->get_fields( 'description' ); 
            $share = sprintf( '<div class="share"><h4>%s</h4>%s</div>', 
                              __( 'Share This:' ),
                              _s_get_addtoany_share_icons( sprintf( '%s#%s-service-gallery', trailingslashit( get_permalink() ), $this->get_name() ) )
                              );
            $heading = sprintf( '<header>%s%s%s%s</header>', get_svg( 'gallery-icon' ), $heading, $description, $share  );  
            
            $slideshow = $this->get_slideshow();
            
            if( empty( $slideshow ) ) {
                return false;
            }
                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x"><div class="cell">%s</div></div>
                            </div>%s',
                            $heading,
                            $slideshow
                         );  
        }
        
        
        private function get_slideshow() {
            
            $rows = $this->get_fields( 'photos' );
            
            if( empty( $rows ) ) {
                return false;
            }
            
            $slideshow = '';
            
            $size = 'hero';
            
            if( wp_is_mobile() ) {
                $size = 'large';
            }
            
            $buttons = '<div class="slick-arrows">
                            <button class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button>
                            <button class="slick-next slick-arrow" aria-label="Next" type="button">Previous</button>
                        </div>';
            
            $images = '';
            foreach ( $rows as $row ) {
                
                $id = $row['ID'];
                $title = $row['title'];
                $alt = $row['alt'];
                $caption = $row['caption'];
                
                if( ! empty( $caption ) ) {
                    $caption = sprintf( '<div class="slick-caption">%s</div>', $caption );
                }
                
                $images .= sprintf( '<div class="slide"><div class="background-image"><img data-lazy="%s" /></div>%s</div>', 
                                    _s_get_acf_image( $id, $size, true ),
                                    $caption );   
            }
            
            if( ! empty( $images ) ) {
                $slideshow = sprintf( '<div class="slider"><div class="slick">%s</div>%s</div>', $images, $buttons );
            }
            
                
            return $slideshow;
        }
        
    }
}
   
new Service_Gallery;
