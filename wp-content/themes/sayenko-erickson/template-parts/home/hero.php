<?php

/*
Home - Hero
		
*/


if( ! class_exists( 'Home_Hero' ) ) {
    class Home_Hero extends Element_Section {
        
        private $video = false;
        
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'hero' );
            $this->set_fields( $fields );
                                    
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
                     $this->get_name() . '-hero'
                ]
            );
                                                            
        }
        
        
        /**
	 * Before section rendering.
	 *
	 * Used to add stuff before the section element.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function before_render() {            
        
        $this->add_render_attribute( 'wrap', 'class', 'wrap' );
        
        $this->add_render_attribute( 'container', 'class', 'container' );
                
        if( wp_is_mobile() ) {
                
            
             
        }
        
        return sprintf( '<%s %s><div %s><div %s>', 
                        esc_html( $this->get_html_tag() ), 
                        $this->get_render_attribute_string( 'wrapper' ),
                        $this->get_render_attribute_string( 'wrap' ),
                        $this->get_render_attribute_string( 'container' )
                        );
    }

        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : get_the_title();
            $heading = _s_format_string( $heading, 'h1', ['class' => 'h2'] );
            
            $description = empty( $this->get_fields( 'description' ) ) ? '' : _s_format_string( $this->get_fields( 'description' ), 'p' );
            
            $button = $this->get_fields( 'button' );
                      
            if( ! empty( $button['link'] ) ) {
                                
                $args = [
                    'link' => $button['link'],
                    'echo' => false,
                    'classes' => 'button',
                ];
                $button  = sprintf( '<p>%s</p>', _s_acf_button( $args ) );
            } else {
                $button = '';
            }
                        
            $video = $this->get_fields( 'video' );
            $video_link = '';
            if( ! empty( $video ) ) {
                $video_icon = '<span><i>play video</i></span>';
                $video_link = sprintf( '<a data-fancybox href="%s">%s</a>', $video, $video_icon );
            }
            
            // Slideshow
            $slideshow = '';
            $slides = $this->get_fields( 'slideshow' );
            $size = 'hero';
            
            if( wp_is_mobile() ) {
                $size = 'large';
            }
            
            if( ! empty( $slides ) ) {
                $images = '';
                foreach ( $slides as $slide ) {
                    $images .= sprintf( '<div class="slick-slide"><img data-lazy="%s" /></div>', _s_get_acf_image( $slide, $size, true ) );   
                }
                
                if( ! empty( $images ) ) {
                    $slideshow = sprintf( '<div class="slider"><div class="slick">%s</div></div>', $images );
                }
            }
            
                
            return sprintf( '%s<div class="hero-content">
                                <div class="grid-container"><div class="grid-x grid-padding-x align-bottom">
                                    <div class="cell">%s%s%s%s</div>
                                </div></div>
                            </div>',
                            $slideshow,
                            $heading,
                            $description,
                            $button,
                            $video_link
                         );
        }
    }
}
   
new Home_Hero; 