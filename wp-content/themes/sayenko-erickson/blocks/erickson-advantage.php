<?php
// Block - Erickson Advantage

if( ! class_exists( 'Erickson_Advantage_Block' ) ) {
    class Erickson_Advantage_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'description', get_field( 'description' ) );
            $this->set_fields( 'tabs', get_field( 'tabs' ) );
             
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
                                    
            $heading = _s_format_string( $this->get_fields( 'heading' ), 'h2' );
            $description = $this->get_fields( 'description' ); 
            $heading = sprintf( '<header>%s%s%s</header>', get_svg( 'advantage-icon' ), $heading, $description  );  
            
            $tabs = $this->get_tabs();
                        
            return sprintf( '<div class="grid-x grid-margin-x"><div class="cell">%s</div></div>
                            %s',
                            $heading,
                            $tabs
                         );  
        }
        
        
        private function get_tabs() {
            
            $rows = $this->get_fields( 'tabs' );
            
            if( empty( $rows ) ) {
                return false;
            }
            
            $tabs = '';              
            $items = '';
               
            foreach( $rows as $key => $row ) {  
                $class = ! $key ? ' class="active"' : '';
                $tabs .= sprintf( '<li%s><span>%s</span></li>', $class, $row['title'] );
                $items .= $this->get_tab( $row );
            }
            
            $tabs = sprintf( '<div class="slick-tabs"><ul class="menu">%s</ul></div>', $tabs );
            
            $arrows = '<div class="slick-arrows">
                            <button class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button>
                            <button class="slick-next slick-arrow" aria-label="Next" type="button">Previous</button>
                        </div>';
            
            return sprintf( '<div class="slider">%s<div class="slick">%s</div>%s</div>', 
                                    $tabs,
                                    $items, 
                                    $arrows 
                          );
        }
        
        
        private function get_tab( $row ) {
            
            $title = _s_format_string( $row['title'], 'h3' );
            $text = $row['text']; 
            
            $size = wp_is_mobile() ? 'large' : 'hero';
            $image = $row['image'];  
            $image = _s_get_acf_image( $image, $size, true ); 
            $style = sprintf( ' style="background-image: url(%s);"', $image  );   
                                                                                                                             
            return sprintf( '<div class="slide">
                                <div class="background"%s></div>
                                <div class="slide-content">
                                   <div class="entry-content">%s%s</div>
                                </div>
                             </div>', 
                            $style,
                            $title,
                            $text
                         );
        }        
    }
}
   
new Erickson_Advantage_Block( $data );
