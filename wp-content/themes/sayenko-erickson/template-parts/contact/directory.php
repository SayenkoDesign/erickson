<?php

/*
Contact - Directory
*/


if( ! class_exists( 'Contact_Directory' ) ) {
    class Contact_Directory extends Element_Section {
        
        public function __construct() {
            parent::__construct();
              
            $fields = get_field( 'directory' );  
            $this->set_fields( $fields );
            
            $settings = [];
            $this->set_settings( $settings );
            
            // Render the section
            $this->render();
            
            // print the section
            $this->print_element();        
        }
                      
        
        public function before_render() {            
            return '';
        }
        
        public function after_render() {
            return '';
        }  
           
        
        // Add content
        public function render() {
                        
            $directory = $this->get_accordion();
                        
            if( empty( $this->get_fields( 'heading' ) ) || empty( $directory )  ) {
                // return false;
            }
            
            $heading = _s_format_string( $this->get_fields( 'heading' ), 'h2' );
            
            return sprintf( '<div class="cell large-auto">%s%s</div>',
                            $heading,
                            $directory
            );
               
        }
                
        
        private function get_accordion() {
            
            $rows = $this->get_fields( 'listings' );
            if( empty( $rows ) ) {
                return false;
            }
            
            $out = '';
            
            $fa = new Foundation_Accordion( [ 'class' => 'accordion accordion-filter' ] );

            $count = 0;       
            
            foreach( $rows as $key => $row ) {

                $icon = _s_get_acf_image( $row[ 'image' ] );
                
                $title   = sprintf( '%s%s', $icon, $row['title'] ); 
                $title_red = $row['title_red'];
                $content = _s_format_string( $row['address'], 'p' ); 
                
                $lines = '';
                $details = $row['details'];
                
                if( ! empty( $details ) ) {
                    foreach( $details as $detail ) {
                        $lines .= $this->get_line( $detail );
                    }
                    
                    if( ! empty( $lines ) ) {
                        $lines = sprintf( '<div class="details">%s</div>', $lines );
                    }
                }
                
                $content .= $lines;
                
                if( empty( $content ) ) {
                    continue;
                }
                                
                $classes = [];
                
                /*
                if( ! $key ) {
                    $classes[]] = 'is-active';
                }
                */
                
                if( $title_red ) {
                    $classes[] = 'red';
                }
                                
                $fa->add_item( [
                    'title' => $title, 
                    'content' => $content,
                    'classes' => join( ' ', $classes )  
                ] );
                
                $count ++;                
            }
                                    
            $out = $fa->get_accordion();
            $fa->clear();
            
            return $out;
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
            return sprintf( '<a href="%s">%s</a>', antispambot( $value ), antispambot( $value ) );
        }
        
        
        private function get_phone( $value = '' ) {
            return sprintf( '<a href="tel:%s">%s</a>', preg_replace( '/[^0-9]/','', $value ), $value );
        }
               
    }
}
   
new Contact_Directory; 