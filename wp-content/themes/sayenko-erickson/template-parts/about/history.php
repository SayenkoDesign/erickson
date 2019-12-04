<?php

/*
About - History
*/


if( ! class_exists( 'About_History' ) ) {
    class Home_Why extends Element_Section {
                
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
                     $this->get_name() . '-about-history'
                ]
            ); 
        } 
        
                   
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : get_the_title();
            $heading = _s_format_string( $heading, 'h1', [ 'class' => 'h6 hide-for-large' ] );
                        
            $posts = $this->get_grid();
            
            if( empty( $posts ) ) {
                return false;
            }
            
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                    <div class="cell">%s%s</div>
                                </div>
                             </div>', 
                             $heading,
                            $posts 
                          );
               
        }
        
        
        private function get_grid() {
            
            $post_ids = $this->get_fields( 'posts' );
            
            if( empty( $post_ids ) ) {
                return false;
            }
            
            $args = array(
                'post_type' => 'history',
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
                    
                    $posts .= $this->get_item( get_the_ID() );
    
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
                                </div></div>', $posts, $buttons );
            }
            
            
        }
        
        
        private function get_item( $post_id = false ) {
            
            if( ! absint( $post_id ) ) {
                return false;
            }
            
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : get_the_title();
            $heading = _s_format_string( $heading, 'h1', [ 'class' => 'h6 show-for-large' ] );
            
            $image = get_the_post_thumbnail( $post_id, 'large' );   

            $title = _s_format_string( '<span>Year</span> '. get_the_title( $post_id ), 'h3' ); 
            $content = apply_filters( 'the_content', get_the_content( $post_id ) );
            
            if( ! $image && ! $title && ! $content ) {
                return false;
            }
                       
            return sprintf( '<div class="slide" data-year="%s"><div class="grid-x grid-margin-x align-middle">
                                <div class="cell large-auto">%s</div>
                                <div class="cell large-6"><div class="entry-content"><header>%s%s</header>%s</div></div>
                             </div></div>', 
                                substr( get_the_title(), 2),
                                $image,
                                $heading,
                                $title,
                                $content
                             );
        }
                
    }
}
   
new Home_Why; 