<?php

/*
Product - Slideshpw
*/


if( ! class_exists( 'Product_Slideshow' ) ) {
    class Product_Slideshow extends Element_Section {
        
        public function __construct() {
            parent::__construct();
              
            $fields = get_field( 'slideshow' );           
            $this->set_fields( $fields );
            
            $settings = [];
            $this->set_settings( $settings );
            
            // Render the section
            $this->render();
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-product-slideshow'
                ]
            ); 
        } 
        
                   
        
        // Add content
        public function render() {
            
            $slideshow = $this->get_slideshow();
            
            if( empty( $slideshow ) ) {
                return false;
            }
             
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x"><div class="cell">%s</div></div></div>', $slideshow );
               
        }
        
        private function get_slideshow() {
            /*
            slideshow - content/photo            
            */
                     
            $rows = $this->get_fields();
            
            if( empty( $rows ) ) {
                return false;
            }
            
            $grid = '';
            
            foreach( $rows as $row ) {
                $heading = $row['heading'];
                $content = $row['content'];
                $photo = _s_get_acf_image( $row['photo'], 'large' );
                
                if( ! $heading && ! $content && ! $photo ) {
                    continue;
                }
                
                //$photo = sprintf( '<div class="background" style="backgorund-image: url(%s);"></div>', $photo );
                $grid .= sprintf( '<div><div class="grid-x grid-margin-x"><div class="cell large-auto"><header>%s</header><div class="entry-content">%s</div></div><div class="cell large-auto align-self-middle photo-container">%s</div></div></div>',
                                   _s_format_string( $heading, 'h2' ),
                                   $content, 
                                   $photo
                                 );
            }
            
            $buttons = '<div class="slick-arrows">
                            <button class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button>
                            <button class="slick-next slick-arrow" aria-label="Next" type="button">Previous</button>
                        </div>';
            
            if( ! empty( $grid ) ) {
                return sprintf( '<div class="slider"><div class="slick">%s</div>
                                    %s
                                </div>', $grid, $buttons );
            }
        }
        
    }
}
   
new Product_Slideshow; 