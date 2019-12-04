<?php

/*
Blog - Related Products
*/


if( ! class_exists( 'Related_Products' ) ) {
    class Related_Products extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                        
            $fields = get_field( 'related_products' );            
            $this->set_fields( $fields );
            
            $settings = [];
            $this->set_settings( $settings );
            
            // Render the section
            $this->render();
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-related-products'
                ]
            );            
        } 
        
        
       
           
        
        // Add content
        public function render() {
                        
            $heading        = $this->get_fields( 'heading' );
            $heading        = _s_format_string( $heading, 'h2' );
            
            $post_ids = $this->get_fields( 'related_posts' );
                                
            $args = array(
                'post_type' => 'product',
                'order' => 'ASC',
                'orderby' => 'menu_order',
                'posts_per_page' => 100
            );
            
            if( ! empty( $post_ids ) ) {
                $args['orderby'] = 'post__in';
                $args['post__in'] = $post_ids;
                $args['posts_per_page'] = count( $post_ids );
            }
            
            $loop = new WP_Query( $args );
            
            $posts = [];
	
            if ( $loop->have_posts() ) : 
                while ( $loop->have_posts() ) : $loop->the_post(); 
                    $posts[] = sprintf( '%s', _s_get_template_part( 'template-parts/product', 'content-column', false, true ) );
                endwhile;
            endif;
            
            wp_reset_postdata();
            
            if( empty( $posts ) ) {
                return false;
            }
            
            return sprintf( '<header class="text-center">%s</header><div class="grid-x grid-margin-x grid-margin-bottom small-up-1 medium-up-2 large-up-3 xxlarge-up-4 align-center grid">%s</div>', $heading, join( '', $posts ) );            
        }
        
    }
}
   
new Related_Products; 