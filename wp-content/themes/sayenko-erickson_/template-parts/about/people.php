<?php
// About - People

if( ! class_exists( 'People_Section' ) ) {
    class People_Section extends Element_Section {
        
        var $post_type = 'people';
        
        public function __construct() {
            parent::__construct(); 
            
            $fields = get_field( 'people' );           
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
                     $this->get_name() . '-people'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-people'
                ], true
            );            
            
        }          
        
        // Add content
        public function render() {
            
            $filters = sprintf( '<div class="grid-container"><div class="grid-x grid-margin-x"><div class="cell">%s</div></div>', do_shortcode( '[facetwp facet="departments"]' ) );
                                    
            return $filters . $this->people();     
                    
        }
        
        
        private function people() {
                        
            $post_ids = $this->get_fields();
                                
            if( empty( $post_ids ) ) {
                return false;
            }
        
            $args = array(
                'post_type' => $this->post_type,
                'order' => 'ASC',
                'orderby' => 'post__in',
                'post__in' => $post_ids,
                'posts_per_page' => count( $post_ids ),
                'no_found_rows' => true,
                'update_post_meta_cache' => false,
                'update_post_term_cache' => false,
                'fields' => 'ids',
                'facetwp' => true
            );
            
            $loop = new WP_Query( $args );
            
            $posts = [];
            
            if ( $loop->have_posts() ) :                 
                          
                while ( $loop->have_posts() ) :
    
                    $loop->the_post(); 
                    
                    $posts[] = $this->get_person();
    
                endwhile;
                
                wp_reset_postdata();
                
            endif; 
                        
            if( empty( $posts ) ) {
                return false;
            }
                                                                                               
            return sprintf( '<div class="grid-container"><div class="grid-x grid-margin-bottom small-up-1 medium-up-2 xlarge-up-3 align-center facetwp-template">%s</div></div>', 
                                    join( '', $posts ) );
        }
        
        
        
        private function get_person() {
                     
            $thumbnail = sprintf( ' style="background-image: url(%s)"', get_the_post_thumbnail_url( get_the_ID(), 'large' ) );
            $thumbnail = sprintf( '<div class="thumbnail"%s></div>', $thumbnail );
            
            $position  = get_field( 'position' );
            $position = _s_format_string( $position, 'p', [ 'class' => 'position' ] );
            
            $linkedin = get_field( 'linkedin' );
            $classes = '';
            if( ! empty( $linkedin ) ) {
                $linkedin = sprintf( '<a href="%s" class="linkedin">%s</a>', $linkedin, get_svg( 'linkedin' ) );
                $classes = ' padding-left';
            }
            
            $slug = sanitize_title_with_dashes( get_the_title() );
                        
            $title = sprintf( '<a data-touch="false" data-fancybox data-src="#%s" class="post-title">%s</a>', $slug, the_title( '<h3 class="h4">', '</h3>', false ) );
            
            $modal = sprintf( '<div style="display: none;" id="%s" class="people-modal"><div class="people-modal-content">%s%s<div class="panel%s">%s%s</div></div></div>', 
                            $slug,
                            the_title( '<h3>', '</h3>', false ),
                            get_the_post_thumbnail( get_the_ID(), 'large' ),
                            $classes,
                            $linkedin,
                            apply_filters( 'the_content', get_the_content() )
                            
                     );
                                                                         
            return sprintf( '<div class="cell">
                                <div class="grid-item">
                                    %s<footer>%s%s%s</footer>
                                </div>
                                %s
                            </div>', 
                            $thumbnail,
                            $title,
                            $position,
                            $linkedin,
                            $modal
                         );
            
        }        
    }
}
   

new People_Section();
