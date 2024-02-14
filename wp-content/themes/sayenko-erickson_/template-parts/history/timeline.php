<?php

/*
History - timeline
*/


if( ! class_exists( 'Timeline' ) ) {
    class Timeline extends Element_Section {
                
        private $posts_per_page = 8;
        
        public function __construct() {
            parent::__construct();
              
            $fields = get_field( 'history' );           
            $this->set_fields( $fields );
            
            $settings = [];
            $this->set_settings( $settings );
            
            // Render the section
            //$this->render();
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-timeline'
                ]
            ); 
        } 
        
                   
        
        // Add content
        public function render() {
            
            $filters = do_shortcode( '[facetwp facet="years"]' );
            $filters .= do_shortcode( '[facetwp facet="history"]' );
                        
            $posts = $this->get_grid();
            
            if( empty( $posts ) ) {
                return false;
            }
            
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                    <div class="cell">%s</div>
                                </div>
                                %s
                             </div>', 
                             $filters,
                            $posts 
                          );
               
        }
        
        
        private function get_grid() {
            
            $args = array(
                'post_type' => 'history',
                'order' => 'ASC',
                'orderby' => 'meta_value_num',
                'meta_key' => 'year',
                'posts_per_page' => function_exists( 'facetwp_display' ) ? $this->posts_per_page : 200, // make sure FacetWP is enabled
                'facetwp' => true
            );
            
            $loop = new WP_Query( $args );
            
            $posts = '';
            
            if ( $loop->have_posts() ) :                 
                          
                while ( $loop->have_posts() ) :
    
                    $loop->the_post(); 
                    
                    $index = $loop->current_post;
                    $alignment = $index % 2 ? 'event-odd' : 'event-even';
                    
                    $data = [ 'alignment' => $alignment];
                    
                    $posts .= _s_get_template_part( 'template-parts/history', 'post-column', $data, true );
    
                endwhile;
                
            endif; 
            
            wp_reset_postdata();
            
            $load_more = '';
            
            if( function_exists( 'facetwp_display' ) ) {
                $load_more = facetwp_display( 'facet', 'load_more' );
            } 
                        
            return sprintf( '<div class="facetwp-template timeline">%s<div class="line"></div></div>%s', $posts, $load_more );
            
            
        }

                
    }
}
   
new Timeline; 