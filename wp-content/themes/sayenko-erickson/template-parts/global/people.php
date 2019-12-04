<?php
// Global - People

if( ! class_exists( 'Global_People_Section' ) ) {
    class Global_People_Section extends Element_Section {
        
        private static $section_counter = 0;        
        var $post_type = 'people';
        
        public function __construct() {
            parent::__construct(); 
            self::$section_counter++;     
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
                     $this->get_name() . '-people-' . self::$section_counter
                ], true
            );            
            
        }          
        
        // Add content
        public function render() {
            
            $fields = $this->get_fields();
            
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : get_the_title();
            $heading = _s_format_string( $heading, 'h2' );
                                    
            $people = $this->people();
            
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                <div class="cell">%s</div>
                                </div>%s
                            </div>',
                            $heading,
                            $people
                         );  
                    
        }
        
        
        private function people() {
                        
            $post_ids = $this->get_fields( 'posts' );
                                
            if( empty( $post_ids ) ) {
                return false;
            }
        
            $args = array(
                'post_type' => 'people',
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
                        
            // Get the CTA
            $cta = $this->get_cta();
                                                                        
            if( ! empty( $cta ) ) {
                $classes = ' has-cta';
               array_push( $posts, $cta );
            }
                                                           
            return sprintf( '<div class="grid-x grid-margin-x small-up-1 medium-up-2 xxxlarge-up-3 align-center grid">%s</div>', 
                                    join( '', $posts ) );
        }
        
        
        
        private function get_person() {
                     
            $thumbnail = sprintf( ' style="background-image: url(%s)"', get_the_post_thumbnail_url( get_the_ID(), 'large' ) );
            $thumbnail = sprintf( '<div class="thumbnail"%s></div>', $thumbnail );
            
            $position  = get_field( 'position' );
            $position = _s_format_string( $position, 'p', [ 'class' => 'position' ] );
            
            $linkedin = get_field( 'linkedin' );
            if( ! empty( $linkedin ) ) {
                $linkedin = sprintf( '<a href="%s" class="linkedin">%s</a>', $linkedin, get_svg( 'linkedin' ) );
            }
                        
            $heading = the_title( '<h3 class="h4">', '</h3>', false ); 
            
            $line = '<div class="line"></div>';
                                                             
            return sprintf( '<div class="cell">
                                <div class="grid-item">
                                    <div class="grid-image">%s<header>%s%s%s%s</header></div>
                                    
                                </div>
                            </div>', 
                            $thumbnail,
                            $line,
                            $heading,
                            $position,
                            $linkedin
                         );
            
        }
        
        
        private function get_cta() {
            
            $cta = $this->get_fields( 'join_team' );
            if( empty( $cta ) ) {
                return false;
            }
            
            
            if( empty( $cta['photo'] ) || empty( $cta['text'] ) || empty( $cta['link'] ) ) {
                return false;
            }
            
            $text = $cta['text'];
            
            $link = $cta['link'];
            
            
                        
            if( empty( $link['title'] ) || empty( $link['url'] ) ) {
                return false;
            }
                                    
            $image = _s_get_acf_image( $cta['photo'], 'large', true );
            
            $thumbnail = sprintf( ' style="background-image: url(%s)"', $image );
            $thumbnail = sprintf( '<div class="thumbnail"%s></div>', $thumbnail );
            
            $heading = sprintf( '<h3>%s</h3>', $text ); 
            
            $button = sprintf( '<a href="%s" class="button">%s</a>', esc_url( $link['url'] ), esc_attr( $link['title'] ) );
            
            return sprintf( '<div class="cell">
                                <div class="grid-item join-team">
                                    <div class="grid-image">%s<header>%s</header>%s</div>
                                    
                                </div>
                            </div>', 
                            $thumbnail,
                            $heading,
                            $button
                         );
  
        
        }
    }
}
   

$fields = get_field( 'people' );

if( ! empty( $fields ) ) {
    
    echo '<div class="section-people-group">';
    
    foreach( $fields as $key => $field ) {
        $section = new Global_People_Section();
        $section->set_fields( $field );
        $section->render();
        $section->print_element();  

    }
    
    echo '</div>';
}
