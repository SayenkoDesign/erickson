<?php
// Global - Featured Post

if( ! class_exists( 'Featured_Post_Section' ) ) {
    class Featured_Post_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'featured_post' );
            $this->set_fields( $fields );
                        
            $settings = $this->get_fields( 'settings' );
            $this->set_settings( $settings );
                        
            // Render the section
            if( empty( $this->render() ) ) {
                //return;   
            }
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-featured-post'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-featured-post'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
                                    
            $heading = _s_format_string( $this->get_fields( 'heading' ), 'h2' );
            $description = $this->get_fields( 'description' ); 
            $heading = sprintf( '<header>%s%s</header>', $heading, $description  );  
            
            $_post = $this->get_post();
                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x"><div class="cell">%s</div></div>
                                %s
                            </div>',
                            $heading,
                            $_post
                         );  
        }
        
        
        private function get_post() {
            
            $post_id = $this->get_fields( 'post' );
            
            if( empty( $post_id ) ) {
                return false;
            }
            
            $args = array(
                'post_type' => 'post',
                'p' => $post_id,
                'posts_per_page' => 1,
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
                    
                    $size = wp_is_mobile() ? 'medium' : 'large';
                    $image = get_the_post_thumbnail_url( get_the_ID(), $size ); 
                    $style = sprintf( ' style="background-image: url(%s);"', $image  ); 
                    
                    $excerpt = '';
                    if( has_excerpt() ) {
                        $excerpt = get_the_excerpt();
                        $excerpt = trim( preg_replace( '/\s+/', ' ', $excerpt ) );
                        if ( strlen( $excerpt ) > 100 ){
                            $excerpt = substr($excerpt, 0, strpos($excerpt, ' ', 100 ) );
                            $excerpt =  $excerpt . '...';
                        }
                        
                        $excerpt = sprintf( '<div class="excerpt">%s</div>', wpautop( $excerpt  ) );
                    }
                    
                    $permalink = sprintf( '<p><a class="read-more" href="%s">%s</a></p>', get_permalink(), __( 'read more' )  );
                    
                    $cells .= sprintf( '<div class="cell large-auto"><div class="thumbnail"%s></div></div>', $style );
                    $cells .= sprintf( '<div class="cell large-auto"><h3>%s</h3>%s%s</div>', get_the_title(), $excerpt, $permalink  );
    
                endwhile;
                
            endif; 
                        
            wp_reset_postdata();
            
            if( empty( $cells ) ) {
                return false;
            }
            
            return sprintf( '<div class="grid-x grid-padding-x">%s</div>', $cells  );
        }
        
    }
}
   
new Featured_Post_Section;
