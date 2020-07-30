<?php

/*
Block - Testimonials
		
*/    
    
if( ! class_exists( 'Testimonials_Block' ) ) {
    class Testimonials_Block extends Element_Block {
        
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $fields['testimonials'] = get_field( 'testimonials' );
            $this->set_fields( $fields );

            /*
            $this->set_settings( 'padding', get_field( 'padding' )  );
            $this->set_settings( 'margin', get_field( 'margin' )  );
            */
                        
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
            
            $testimonials = $this->get_testimonials();
            
            if( empty( $testimonials ) ) {
                return false;
            }
                                                   
            return sprintf( '<div class="grid-x grid-padding-x grid-padding-bottom">    
            <div class="cell">%s</div>', $testimonials );
        }
        
        private function get_testimonials() {
            
            $posts = [];
                        
            $post_ids = $this->get_fields( 'testimonials' );
            
            if( empty( $post_ids ) ) {
                return false;
            }
            
            $args = array(
                'post_type' => 'testimonial',
                'order' => 'ASC',
                'orderby' => 'post__in',
                'post__in' => $post_ids,
                'posts_per_page' => count( $post_ids ),
                'no_found_rows' => true,
                'update_post_meta_cache' => false,
                'update_post_term_cache' => false,
                'fields' => 'ids'
            );
        
            // Use $loop, a custom variable we made up, so it doesn't overwrite anything
            $loop = new WP_Query( $args );
        
            // have_posts() is a wrapper function for $wp_query->have_posts(). Since we
            // don't want to use $wp_query, use our custom variable instead.
            if ( $loop->have_posts() ) :                 
            
                 while ( $loop->have_posts() ) : $loop->the_post(); 
                    
                    $posts[] = $this->get_testimonial();
        
                endwhile;
            endif;
            wp_reset_postdata();  
            
            $buttons = '<div class="slick-arrows">
                            <button class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button>
                            <button class="slick-next slick-arrow" aria-label="Next" type="button">Previous</button>
                        </div>';
            
            if( ! empty( $posts ) ) {
                
                $quote_mark = sprintf( '<div class="quote-mark">%s</div>', 
                                    get_svg( 'left-quote' ) );
                
                return sprintf( '<div class="slider">%s<div class="slick">%s</div>
                                    %s
                                </div>', $quote_mark, join( '', $posts ), $buttons );
            }
        }
        
        
        private function get_testimonial() {
            
            $post_id = get_the_ID();
                                              
            $quote = get_field( 'quote', $post_id );
            
            if( empty( $quote ) ) {
                return false;
            }
                        
            $name = _s_format_string( '- ' . get_field( 'name', $post_id ), 'h6' );
            
            $quote = sprintf( '<div class="quote">%s%s</div>', $quote, $name );
                
            
            $photo = get_the_post_thumbnail_url( $post_id, 'medium' );
            if( ! empty( $photo ) ) {
                $photo = sprintf( '<div class="cell large-4"><div class="thumbnail" style="background-image: url(%s);"></div></div>', $photo );
            }
            
            return sprintf( '<div class="slide"><div class="grid-x grid-padding-x grid-margin-bottom align-middle">    
            %s<div class="cell large-auto">%s</div></div></div>', $photo, $quote );   
        }
      
    }
}
   
new Testimonials_Block( $data );

    