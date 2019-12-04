<?php

/*
Careers - Testimonials
		
*/    
    
if( ! class_exists( 'Careers_Testimonials_Section' ) ) {
    class Careers_Testimonials_Section extends Element_Section {
        
        public function __construct() {
            parent::__construct();
            
            $fields['testimonials'] = get_field( 'testimonials' );
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
                     $this->get_name() . '-testimonials',
                     $this->get_name() . '-testimonials' . '-' . $this->get_id(),
                ]
            );
            
        }
        
        // Add content
        public function render() {
            
            $testimonials = $this->get_testimonials();
            
            if( empty( $testimonials ) ) {
                return false;
            }
                                                   
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x">    
            <div class="cell">%s</div></div>', $testimonials );
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
                return sprintf( '<div class="slider"><div class="wrap"><div class="slick">%s</div>
                                    %s
                                </div></div>', join( '', $posts ), $buttons );
            }
        }
        
        
        private function get_testimonial() {
            
            $post_id = get_the_ID();
                                  
            $photo = get_the_post_thumbnail( $post_id, 'large' );
            
            $quote = get_field( 'quote', $post_id );
            
            $name = get_field( 'name', $post_id );
            
            if( $name ) {
                $name = _s_format_string( '- ' . $name, 'h6' );
            }
            
            if( empty( $photo ) || empty( $quote )  ) {
                return false;
            }
 
            
            $quote_mark = sprintf( '<div class="quote-mark"><span>&ldquo;</span></div>', 
                                    trailingslashit( THEME_IMG ) );
            
            $quote = sprintf( '<div class="quote">%s%s%s</div>', $quote_mark, $quote, $name );
                
            return sprintf( '<div class="slide"><div class="grid-x grid-margin-x">    
            <div class="cell large-5">%s</div><div class="cell large-auto">%s</div></div></div>', $photo, $quote );   
        }
      
    }
}
   
new Careers_Testimonials_Section;

    