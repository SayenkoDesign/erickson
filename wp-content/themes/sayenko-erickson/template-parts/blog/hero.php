<?php

/*
Hero
		
*/


if( ! class_exists( 'Hero_Section' ) ) {
    class Hero_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                                
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-hero'
                ]
            );
            
        } 
        
        // Add content
        public function render() {
            
            $heading = ! empty( $this->get_fields( 'heading' ) ) ? $this->get_fields( 'heading' ) : get_the_title( get_option('page_for_posts') );
            
            if( is_category() ) {
                $heading = single_cat_title( '', false);
            }
            else if( is_tag() ) {
                $heading = single_tag_title( '', false);
            }
            else if( is_author() ) {
                $heading = get_the_author();
            }
            else {
                $heading = ! empty( $this->get_fields( 'heading' ) ) ? $this->get_fields( 'heading' ) : get_the_title( get_option('page_for_posts') );
                
                // facetwp?
                
                if( ! empty( $_GET['fwp_categories'] ) ) {
                    
                    $term = get_term_by('slug', $_GET['fwp_categories'], 'category');
                    
                    if( ! is_wp_error( $term ) && ! empty( $term ) ) {
                       $heading = sanitize_text_field( $term->name ); 
                    }
                    
                }
            }
            
            
            $heading = _s_format_string( $heading, 'h1', [ 'class' => 'no-reveal' ] );
            $description = $this->get_fields( 'description' );
            $heading = sprintf( '<header>%s%s%s</header>', get_svg( 'posts-icon' ), $heading, $description  );  


            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x align-middle"><div class="cell">%s</div></div></div>', 
                            $heading
                         );
        }
    }
}
   
new Hero_Section; 