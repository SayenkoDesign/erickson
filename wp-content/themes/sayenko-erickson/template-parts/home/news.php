<?php

/*
Home - News
*/


if( ! class_exists( 'Home_News' ) ) {
    class Home_News extends Element_Section {
        
        public function __construct() {
            parent::__construct();
              
            $fields = get_field( 'news' );           
            $this->set_fields( $fields );
            
            $settings = [];
            $this->set_settings( $settings );
            
            // Render the section
            if( empty( $this->render() ) ) {
                // return false;   
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
                     $this->get_name() . '-home-news'
                ]
            ); 
        } 
        
                   
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : get_the_title();
            $heading = _s_format_string( $heading, 'h2', ['class' => 'text-center'] );
            
            $image = $this->get_fields( 'image' );
            $image = _s_get_acf_image( $image, 'hero' );
            
            $posts = $this->get_posts();
            
            if( empty( $posts ) ) {
                return false;
            }
             
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x"><div class="cell">%s%s%s</div></div></div>', 
                            $heading, 
                            $image,
                            $posts 
                          );
               
        }
        
        
        private function get_posts() {
         
            $post_ids = $this->get_fields( 'posts' );
            
            if( empty( $post_ids ) ) {
                return false;
            }
        
            $args = array(
                'post_type' => 'post',
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
            
            $posts = '';
            
            if ( $loop->have_posts() ) :                 
                          
                while ( $loop->have_posts() ) :
    
                    $loop->the_post(); 
                    
                    $posts .= $this->get_post( get_the_ID() );
    
                endwhile;
                
            endif; 
            
            wp_reset_postdata();
            
            $buttons = '<div class="slick-arrows">
                            <button class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button>
                            <div class="counter"></div>
                            <button class="slick-next slick-arrow" aria-label="Next" type="button">Previous</button>
                        </div>';
            
            if( ! empty( $posts ) ) {
                return sprintf( '<div class="slider"><div class="wrap"><div class="slick">%s</div>
                                    %s
                                </div></div>', $posts, $buttons );
            }
            
        }
        
        private function get_post( $post_id = false ) {
            
            if( ! absint( $post_id ) ) {
                return false;
            }
            
            $title = get_the_title();
            $title = _s_format_string( $title, 'h3' );
            
            $excerpt = apply_filters( 'the_content', get_the_excerpt() );

            if( ! $title && ! $excerpt ) {
                return false;
            }
            
            $link = sprintf( '<p><a href="%s" class="read-more"><span>%s</span></a></p>', get_the_permalink( $post_id ), __( 'read more' ) );
           
            return sprintf( '<div class="post">%s%s%s</div>', 
                                $title,
                                $excerpt,
                                $link
                             );
        }
        
    }
}
   
new Home_News; 