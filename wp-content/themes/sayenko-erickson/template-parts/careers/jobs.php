<?php
// Careers - Jobs

if( ! class_exists( 'Careers_Jobs_Section' ) ) {
    class Careers_Jobs_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields = get_field( 'jobs' );
            $this->set_fields( $fields );
            
            // print the section
            $this->print_element();        
        }
        
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-jobs',
                ]
            ); 
            
            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-jobs',
                ],
                true
            ); 
                        
        }  
        
        
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' );
            $heading = _s_format_string( $heading, 'h2' );
            
            $code = $this->get_fields( 'code' );
            
            if( ! $heading && ! $code ) {
                return false;
            }
            
            $classes = '';
            $person = $this->get_fields( 'person' );
            if( absint( $person ) ) {
                $person = sprintf( '<div class="cell medium-6 large-4"><div class="person">%s</div></div>', $this->get_person( $person ) );  
                $classes = ' medium-6 large-8'; 
            }
            
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x grid-margin-bottom">
                                <div class="cell no-margin">%s</div>
                                <div class="cell%s"><div class="entry-content">%s</div></div>
                                %s
                            </div></div>',
                            $heading,
                            $classes,
                            $code,
                            $person
                         );
            
        }
        
        
        private function get_person( $post_id = false ) {
                     
            $thumbnail = sprintf( ' style="background-image: url(%s)"', get_the_post_thumbnail_url( $post_id, 'large' ) );
            $thumbnail = sprintf( '<div class="thumbnail"%s></div>', $thumbnail );
            
            $position  = get_field( 'position', $post_id );
            $position = _s_format_string( $position, 'p', [ 'class' => 'position' ] );
            
            $linkedin = get_field( 'linkedin', $post_id );
            if( ! empty( $linkedin ) ) {
                $linkedin = sprintf( '<a href="%s" class="linkedin">%s</a>', $linkedin, get_svg( 'linkedin' ) );
            }
                        
            $heading = sprintf( '<h3 class="h4">%s</h3>', get_the_title( $post_id ) ); 
            
            $line = '<div class="line"></div>';
                                                             
            return sprintf( '<div class="cell">
                                <div class="grid-item">
                                    <div class="grid-image">%s<header>%s%s%s%s</header></div>
                                    
                                </div>
                            </div>', 
                            $thumbnail,
                            $line,
                            $heading,
                            $position,
                            $linkedin
                         );
            
        }
        
    }
    
    new Careers_Jobs_Section;
}
   

