<?php
// Block - Featured Post

if( ! class_exists( 'Featured_Post_Block' ) ) {
    class Featured_Post_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'description', get_field( 'description' ) );
            $this->set_fields( 'post', get_field( 'post' ) );
            
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
            $heading = sprintf( '<header>%s%s%s</header>', get_svg( 'featured-post-icon' ), $heading, $description  );  
            
            $_post = $this->get_post();
                        
            return sprintf( '
                                <div class="grid-x grid-margin-x"><div class="cell">%s</div></div>
                                %s
                            ',
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
                    
                    $permalink = sprintf( '<p><a class="read-more" href="%s">%s</a></p>', get_permalink(), __( 'read more', '_s' )  );
                    
                    $cells .= sprintf( '<div class="cell large-auto"><a href="%s" class="thumbnail"%s></a></div>', get_permalink(), $style );
                    $cells .= sprintf( '<div class="cell large-auto"><div class="panel"><h3>%s</h3>%s%s</div></div>', get_the_title(), $excerpt, $permalink  );
    
                endwhile;
                
            endif; 
                        
            wp_reset_postdata();
            
            if( empty( $cells ) ) {
                return false;
            }
            
            return sprintf( '<div class="grid-x grid-padding-x grid-margin-bottom align-middle grid">%s</div>', $cells  );
        }
        
    }
}
   
new Featured_Post_Block( $data );
