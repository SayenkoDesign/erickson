<?php
// Block - Case Studies

if( ! class_exists( 'Case_Studies_Block' ) ) {
    class Case_Studies_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'description', get_field( 'description' ) );
            $this->set_fields( 'posts', get_field( 'posts' ) );
            
            /*
            $this->set_settings( 'padding', get_field( 'padding' )  );
            $this->set_settings( 'margin', get_field( 'margin' )  );
            */

            $this->set_settings( 'background_color', get_field( 'background_color' ) );
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();

            if( ! empty( $this->get_settings( 'background_color' ) ) ) {                                                              
                $this->add_render_attribute( 'wrapper', 'class', 'background-color-' . strtolower( $this->get_settings( 'background_color' ) ) ); 
            }   
            
        }  
                
        
        // Add content
        public function render() {
                                    
            $heading = _s_format_string( $this->get_fields( 'heading' ), 'h2' );
            $description = $this->get_fields( 'description' ); 
            $heading = sprintf( '<header>%s%s%s</header>', get_svg( 'posts-icon' ), $heading, $description  );  
            
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
            
            if( empty( $post_ids ) ) {
                return false;
            }
            
            $args = array(
                'post_type' => 'case_study',
                'order' => 'ASC',
                'orderby' => 'post__in',
                'post__in' => $post_ids,
                'posts_per_page' => count( $post_ids ),
                'no_found_rows' => true,
                'update_post_meta_cache' => false,
                'update_post_term_cache' => false,
                'fields' => 'ids'
            );
            
            $loop = new WP_Query( $args );
            
            $cells = '';
                        
            if ( $loop->have_posts() ) :                 
                          
                while ( $loop->have_posts() ) :
    
                    $loop->the_post(); 
                    
                    $cells .=  _s_get_template_part( 'template-parts/case-study', 'post-column', false, true );
    
                endwhile;
                
            endif; 
                        
            wp_reset_postdata();
            
            if( empty( $cells ) ) {
                return false;
            }
            
            return sprintf( '<div class="grid-x grid-margin-x grid-margin-bottom small-up-1 medium-up-2 grid">%s</div>', $cells  );
        }
        
    }
}
   
new Case_Studies_Block( $data );
