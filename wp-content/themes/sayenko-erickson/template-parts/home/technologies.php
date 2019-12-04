<?php
// Home - What

if( ! class_exists( 'Home_Technologies_Section' ) ) {
    class Home_Technologies_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'technologies' );
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
                     $this->get_name() . '-technologies'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-technologies'
                ], true
            );            
            
        }          
        
        // Add content
        public function render() {
                        
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : '';
            $heading = _s_format_string( $heading, 'h2' );
            
            $technologies = $this->get_grid();
                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                <div class="cell">%s</div>
                                </div>%s
                            </div>',
                            $heading,
                            $technologies
                         );  
        }
        
        
        
        private function get_grid() {
            
            $rows = $this->get_fields( 'grid' );
            
            if( empty( $rows ) ) {
                return false;
            }
                               
            $items = '';
               
            foreach( $rows as $key => $row ) {  
                $items .= $this->get_item( $row );
            }
            
            return sprintf( '<div class="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3 align-center grid">%s</div>', 
                                    $items );
        }
        
        
        private function get_item( $row ) {
                                                                                            
            $term = $row['category'];
            
            if ( ! $term instanceof WP_Term ) {
                return false;
            }
                        
            $heading = _s_format_string( $term->name, 'h3' ); 
            $description = _s_format_string( $term->description, 'p' );
            $image = get_field( 'image', $term );
            $image = sprintf( '<div class="icon">%s</div>', _s_get_acf_image( $image, 'thumbnail' ) );
            
            $posts = $row['posts'];
            $list = $this->get_posts( $posts );
            
            if( $heading && ! $description && ! $image && ! $list ) {
                return false;
            }
                      
            return sprintf( '<div id="%s" class="cell">
                                <div class="grid-item">
                                    <header>%s</header>
                                    <div class="description">%s</div>
                                    <div class="grid-image">%s</div>
                                    <footer>%s</footer>
                                </div>
                            </div>', 
                            $term->slug,
                            $heading,
                            $description,
                            $image, 
                            $list
                         );
        }
        
        
        
        private function get_posts( $post_ids = [] ) {
                        
            if( empty( $post_ids ) ) {
                return false;
            }
            
            $args = array(
                'post_type' => 'technology',
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
            
            $list_items = '';
                        
            if ( $loop->have_posts() ) :                 
                          
                while ( $loop->have_posts() ) :
    
                    $loop->the_post(); 
                    
                    $title = get_the_title();
                    
                    $resource_post = get_field( 'resource_post' );
                    
                    if( absint( $resource_post ) ) {
                        $title = sprintf( '<a href="%s">%s</a>', get_permalink( $resource_post ), get_the_title() );
                    }
                    
                    $list_items .= sprintf( '<li>%s</li>', $title );
    
                endwhile;
                
            endif; 
                        
            wp_reset_postdata();
            
            if( empty( $list_items ) ) {
                return false;
            }
            
            return sprintf( '<div class="options"><h6>%s</h6><ul>%s</ul></div>', __( 'Technologies Covered:' ), $list_items  );
        }        
    }
}
   
new Home_Technologies_Section;
