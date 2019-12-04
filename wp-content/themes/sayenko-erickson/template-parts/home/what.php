<?php
// Home - What

if( ! class_exists( 'Home_What_Section' ) ) {
    class Home_What_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'what' );
            $this->set_fields( $fields );
                        
            $settings = get_field( 'settings' );
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
                     $this->get_name() . '-what'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-what'
                ], true
            );            
            
        }          
        
        // Add content
        public function render() {
            
            $superheading = $this->get_fields( 'superheading' ) ? $this->get_fields( 'superheading' ) : __( 'What we do?' );
            $superheading = _s_format_string( $superheading, 'h6' );
            
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : '';
            $heading = _s_format_string( $heading, 'h2' );
            
            $description = $this->get_fields( 'description' );  
            
            $applications = $this->get_applications();  
            
            return sprintf( '<div class="grid-container">
                            <div class="grid-x grid-margin-x">
                            <div class="cell large-9 xxlarge-6 large-offset-3 xxlarge-offset-6">%s%s<div class="entry-content">%s</div></div>
                            </div>%s
                        </div>',
                            $superheading,
                            $heading,
                            $description,
                            $applications
                         );  
        }
        
        
        private function get_applications() {
                        
            $post_ids = $this->get_fields( 'applications' );
            
            if( empty( $post_ids ) ) {
                return false;
            }
        
            $args = array(
                'post_type' => 'application',
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
            
            $out = '';
                        
            if ( $loop->have_posts() ) :                 
                          
                while ( $loop->have_posts() ) :
    
                    $loop->the_post(); 
                    
                    $out .= $this->get_item( $loop->current_post + 1, get_the_ID() );
    
                endwhile;
                
            endif; 
            
            wp_reset_postdata();
                        
            return sprintf( '<div class="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3 align-center grid">%s</div>', 
                                    $out );
        }
        
        
        private function get_item( $count, $post_id = false ) {
            
            if( ! absint( $post_id ) ) {
                return false;
            }
                     
            $row = get_field( 'grid', $post_id );
            
            if( empty( $row ) ) {
                return false;   
            }
                                                                    
            $icon = $row['icon'];
            $icon = sprintf( '<div class="grid-image">%s</div>', _s_get_acf_image( $icon, 'thumbnail' ) );
            $heading = _s_format_string( $row['heading'], 'h3' ); 
            $description = _s_format_string( $row['description'], 'p' ); 
            
            if( ! $icon && ! $heading && ! $description ) {
                return false;
            }
            
            $link = sprintf( '<p><span>%s</span></p>', __( 'learn more' ) );
           
            return sprintf( '<div class="cell">
                                <a href="%s" class="grid-item">
                                    <span class="number">%s</span>
                                    %s<header>%s</header>
                                    <div class="description">%s</div>
                                    <footer>%s</footer>
                                </a>
                             </div>', 
                                get_the_permalink( $post_id ),
                                str_pad( $count, 2, "0", STR_PAD_LEFT ),
                                $icon, 
                                $heading,
                                $description,
                                $link
                             );
        }
        
    }
}
   
new Home_What_Section;
