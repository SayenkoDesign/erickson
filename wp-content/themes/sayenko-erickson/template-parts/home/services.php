<?php
// Home - Services

if( ! class_exists( 'Home_Services_Section' ) ) {
    class Home_Services_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'services' );
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
                     $this->get_name() . '-services'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-services'
                ], true
            );            
            
        }          
        
        // Add content
        public function render() {
                                    
            $services = $this->get_grid();
                        
            return sprintf( '<div class="grid-container">
                                %s
                            </div>',
                            $services
                         );  
        }
        
        
        
        private function get_grid() {
            
            $rows = $this->get_fields();
            
            if( empty( $rows ) ) {
                return false;
            }
                               
            $items = '';
               
            foreach( $rows as $key => $row ) {  
                $items .= $this->get_item( $row );
            }
            
            return sprintf( '<div class="grid-x grid-padding-x small-up-1 medium-up-2 medium-large-up-3 align-center grid">%s</div>', 
                                    $items );
        }
        
        
        private function get_item( $row ) {
            
            $icon = $row['icon'];  
            $icon = sprintf( '<span>%s</span>', _s_get_acf_image( $icon ) );                                                                                               
            $heading = _s_format_string( $row['service_category'], 'h2', [ 'class' => 'h4' ] ); 
            
            $posts = $row['posts'];
            $list = $this->get_posts( $posts );
            
            if( $heading && ! $list ) {
                return false;
            }
                      
            return sprintf( '<div class="cell">
                                <div class="grid-item">
                                    <header>%s%s</header>
                                    <footer>%s</footer>
                                </div>
                            </div>', 
                            $icon,
                            $heading,
                            $list
                         );
        }
        
        
        
        private function get_posts( $post_ids = [] ) {
                        
            if( empty( $post_ids ) ) {
                return false;
            }
            
            $args = array(
                'post_type' => 'service',
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
                    $list_items .= sprintf( '<li><a href="%s">%s</a></li>', get_permalink(), get_the_title() );
    
                endwhile;
                
            endif; 
                        
            wp_reset_postdata();
            
            if( empty( $list_items ) ) {
                return false;
            }
            
            return sprintf( '<ul class="no-bullet">%s</ul>', $list_items  );
        }        
    }
}
   
new Home_Services_Section;
