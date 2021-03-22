<?php
// Block - Webinars

if( ! class_exists( 'Webinars_Block' ) ) {
    class Webinars_Block extends Element_Block {

        public function __construct( $data ) {
            parent::__construct( $data );

	        $this->set_fields( 'heading', get_field( 'heading' ) );
	        $this->set_fields( 'description', get_field( 'description' ) );
            $this->set_fields( 'posts', get_field( 'posts' ) );

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


            $posts = $this->get_posts();

            if( empty( $posts ) ) {
                return false;
            }

	        $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : '';
	        $description = $this->get_fields( 'description' );

	        $heading = sprintf( '<header>%s%s</header>', _s_format_string( $heading, 'h2' ), $description );


	        return sprintf( '
                                <div class="grid-x grid-margin-x"><div class="cell">%s</div></div>
                                %s
                            ',
                            $heading,
                            $posts
                         );
        }


        private function get_posts() {

            $data = [];
            
            $post_ids = $this->get_fields( 'posts' );

            $defaults = array(
                'post_type'     => 'webinar',
                'order'         => 'ASC',
                'post_status'   => 'publish',
            );

            $args = [];

            if( ! empty( $post_ids ) ) {
                $args = [
                    'orderby' => 'post__in',
                    'post__in' => $post_ids,
                    'posts_per_page' => count( $post_ids ),
                    'no_found_rows' => true
                ];

                $data['hide_date'] = true;

            } else {
                $args = [
	                'posts_per_page' => 12,
                    'meta_key'  => 'webinar_date',
                    'orderby'	=> 'meta_value',
                    'order'	    => 'ASC',
                ];
            }

            $args = wp_parse_args( $args, $defaults );

            $loop = new WP_Query( $args );

            $cells = '';

            if ( $loop->have_posts() ) :

                while ( $loop->have_posts() ) :

                    $loop->the_post();

                    $cells .=  _s_get_template_part( 'template-parts/webinar', 'post-column', $data, true );

                endwhile;

            endif;

            wp_reset_postdata();

            if( empty( $cells ) ) {
                return false;
            }

	        if( function_exists( 'facetwp_display' ) ) {
		        $pagination = facetwp_display( 'facet', 'load_more' );
	        } else if( function_exists( '_s_paginate_links' ) ) {
		        $pagination = _s_paginate_links();
	        } else {
		        $pagination = paginate_links();
	        }


            return sprintf( '<div class="grid-x grid-margin-x grid-margin-bottom small-up-1 medium-up-2 align-center grid facetwp-template">%s</div>%s',
	            $cells,
                $pagination
            );
        }

    }
}

new Webinars_Block( $data );
