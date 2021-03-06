<?php

/*
Blog - Related Posts
*/


if( ! class_exists( 'Related_Posts' ) ) {
    class Related_Posts extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                        
            $fields = get_field( 'related_posts', 'options' );   
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
                     $this->get_name() . '-related-posts'
                ]
            );            
        } 
        
        
       
           
        
        // Add content
        public function render() {
            
            $heading = ! empty( $this->get_fields( 'heading' ) ) ? $this->get_fields( 'heading' ) : __( 'You might also be interested in', '_s' );          
            $heading = _s_format_string( $heading, 'h2' );
            $description = $this->get_fields( 'description' );
            $heading = sprintf( '<header>%s%s%s</header>', get_svg( 'posts-icon' ), $heading, $description  );  
            
            $args = $this->_s_get_related_posts_query_args();
            
            if( empty( $args ) ) {
                return false;
            }
            
            $loop = new WP_Query( $args );
            
            $posts = [];
	
            if ( $loop->have_posts() ) : 
                while ( $loop->have_posts() ) : $loop->the_post(); 
                    $posts[] = _s_get_template_part( 'template-parts/blog', 'related-post-column', false, true );
                endwhile;
            endif;
            
            wp_reset_postdata();
            
            if( empty( $posts ) ) {
                return false;
            }
            
            $out = sprintf( '<div class="grid-container">
                                    <div class="grid-x grid-margin-x grid-margin-bottom small-up-1 medium-up-2 large-up-3 grid">                                        
                                        %s
                                     </div> 
                                </div>', join( '', $posts ) );
                                
                                
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x grid-margin-bottom">
                                    <div class="cell text-center">%s</div>
                                </div>
                             </div>%s', 
                             $heading,
                             $out );  
                       
        }
        
        
        // Related posts query args based on categories
        private function _s_get_related_posts_query_args( $args = array() ) {
	        
            global $post;
            
            $categories = get_the_category( $post->ID );
            if ($categories) {
                
                $category_ids = array();
                foreach ($categories as $individual_category) {
                    $category_ids[] = $individual_category->term_id;
                }
                
                $default_args = array(
                    'category__in' => $category_ids,
                    'post__not_in' => array( $post->ID ),
                    'posts_per_page' => 3,
                    'ignore_sticky_posts' => 1,
                    'orderby' => 'rand'
                );
            
                return wp_parse_args( $args, $default_args );
            }
            
            return false;
        
        }
        
    }
}
   
new Related_Posts; 