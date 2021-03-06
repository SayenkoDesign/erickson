<?php
// Block - Webinars

if( ! class_exists( 'Webinar_Block' ) ) {
    class Webinar_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'posts', get_field( 'posts' ) );

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
                                    
            
            $posts = $this->get_posts();
            
            if( empty( $posts ) ) {
                return false;
            }
                        
            return sprintf( '
                                <div class="grid-x grid-margin-x"><div class="cell">%s</div></div>
                                %s
                            ',
                            $heading,
                            $posts
                         );  
        }
        
        
        private function get_posts() {
            
            $post_ids = $this->get_fields( 'posts' );
                        
            $defaults = array(
                'post_type'     => 'webinar',
                'order'         => 'ASC',
                'post_status'   => 'publish',
            );
            
            $args = [];
            
            if( ! empty( $post_ids ) ) {
                $args = [ 
                    'orderby' => 'post__in',
                    'post__in' => $post_ids,
                    'posts_per_page' => count( $post_ids ),
                    'no_found_rows' => true
                ];
                
            } else {
                $args = [
                    'meta_key'  => 'webinar_date',
                    'orderby'	=> 'meta_value',
                    'order'	    => 'ASC',
                ];   
            }
            
            $args = wp_parse_args( $args, $defaults );
            
            $loop = new WP_Query( $args );
            
            $cells = '';
                        
            if ( $loop->have_posts() ) :                 
                          
                while ( $loop->have_posts() ) :
    
                    $loop->the_post(); 
                    
                    $cells .=  _s_get_template_part( 'template-parts/webinar', 'post-column', false, true );
    
                endwhile;
                
            endif; 
                        
            wp_reset_postdata();
            
            if( empty( $cells ) ) {
                return false;
            }
            
            return sprintf( '<div class="grid-x grid-margin-x grid-margin-bottom small-up-1 medium-up-2 align-center grid">%s</div>', $cells  );
        }
        
    }
}
   
new Webinar_Block( $data );
