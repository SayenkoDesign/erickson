<?php

/*
Product - Representatives
*/


if( ! class_exists( 'Contact_Representatives' ) ) {
    class Contact_Representatives extends Element_Section {
        
        public function __construct() {
            parent::__construct();
              
            $fields = get_field( 'representatives' );  
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
                     $this->get_name() . '-representatives'
                ]
            );            
        } 
        
        
       
           
        
        // Add content
        public function render() {
            
            if( empty( $this->get_fields( 'heading' ) ) || empty( $this->get_fields( 'countries' ) )  ) {
                return false;
            }
            
            $heading = _s_format_string( $this->get_fields( 'heading' ), 'h2' );
            
            $data = $this->get_countries();
            
            
            return sprintf( '<div class="grid-container"><div class="grid-x grid-x-margin"><div class="cell">%s%s</div></div></div>',
                            $heading,
                            $data
            );
               
        }
        
        
        private function get_countries() {
            
            $rows = $this->get_fields( 'countries' );
            
            if( empty( $rows ) ) {
                return false;
            }
            
            $lists = c2c_array_partition( $rows, 2 );
                                    
            $fa = new Foundation_Accordion( [ 'class' => 'accordion accordion-countries' ] );
                            
            $out = '';
            $count = 0;
            
            foreach( $lists as $list ) {
                
                foreach( $list as $row ) {
                    
                     $details = '';
                     
                     if( ! empty( $row['logo'] ) ) {
                         $logo = _s_get_acf_image( $row['logo'], 'thumbnail' );
                         $details .= sprintf( '<li><div class="logo">%s</div></li>', $logo );
                     }
                    
                     // $details .= sprintf( '<li><span>Country: </span>%s</li>', $row['name'] );
                     
                     if( ! empty( $row['organization'] ) ) {
                         $details .= sprintf( '<li>%s</li>', $row['organization'] );
                     }
                     
                     if( ! empty( $row['motto'] ) ) {
                         $details .= sprintf( '<li>%s</li>', $row['motto'] );
                     }
                     
                     if( ! empty( $row['website'] ) ) {
                         $website = preg_replace("(^https?://)", "", $row['website'] );
                         $website = str_replace( 'www.', '', $website );
                         $details .= sprintf( '<li><a href="%s" target="_blank">%s</a></li>', $row['website'], $website );
                     }
                                          
                     if( ! empty( $row['email'] ) ) {
                         $details .= sprintf( '<li><a href="%s" target="_blank">%s</a></li>', antispambot( $row['email'] ), antispambot( $row['email'] ) );
                     }
                     
                     if( ! empty( $row['phone'] ) ) {
                         $details .= sprintf( '<li><a href="%s">%s</a></li>', _s_format_telephone_url( $row['phone'] ), $row['phone'] );
                     }
                    
                     $fa->add_item( [ 'title' => $row['name'], 'content' => sprintf( '<ul class="no-bullet">%s</ul>', $details ), 'active' => $count ? false : true ] );
                     $count ++;   
                }
                
                $accordion = $fa->get_accordion();
                $fa->clear();
                
                 if( ! empty( $accordion ) ) {
                    $out .= sprintf( '<div class="cell">%s</div>', $accordion );  
                             
                }
                
                
            }
            
            return sprintf( '<div class="grid-x grid-margin-x small-up-1 large-up-2 country-group">%s</div>', $out );
        }
               
    }
}
   
new Contact_Representatives; 