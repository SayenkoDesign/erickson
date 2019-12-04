<?php

/*
Product - Details
*/


if( ! class_exists( 'Product_Details' ) ) {
    class Product_Details extends Element_Section {
        
        public function __construct() {
            parent::__construct();
              
            $fields['photos'] = get_field( 'photos' );  
            $fields['application'] = get_field( 'application' );
            $fields['technology'] = get_field( 'technology' );
            $fields['description'] = get_field( 'description' );
            $fields['download_group'] = get_field( 'download_group' );          
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
                     $this->get_name() . '-product-details'
                ]
            );            
        } 
        
        
       
           
        
        // Add content
        public function render() {
                     
            $heading_large = sprintf( '<header class="show-for-large">%s</header>', _s_format_string( get_the_title(), 'h1', [ 'class' => 'h2' ] ) );
            $heading_small = sprintf( '<div class="cell hide-for-large no-margin"><header>%s</header></div>', _s_format_string( get_the_title(), 'h1', [ 'class' => 'h2' ] ) );
            
            $classes = [ 'auto' ];
            $photos = $this->get_photos();
            if( ! empty( $photos ) ) {
                $classes = [ 'large-5 large-offset-1' ];
                $photos = sprintf( '<div class="cell large-6">%s</div>', $photos );
            }
            
            
            $buttons = $this->get_buttons();
            
            $group = '';
            $application = $this->get_application();
            if( ! empty( $application ) ) {
                $group .= sprintf( '<div class="cell small-12 medium-6 large-12 xxlarge-shrink">%s</div>', $application );
            }
            
            $technology = $this->get_technology();
            if( ! empty( $technology ) ) {
                $group .= sprintf( '<div class="cell small-12 medium-6 large-12 xxlarge-auto">%s</div>', $technology );
            }
            
            if( ! empty( $group ) ) {
                $group = sprintf( '<div class="grid-x grid-margin-x application-technology">%s</div>', $group );
            }
            
            $description = $this->get_description();
            
            $downloads = $this->get_downloads();
            
            return sprintf( '<div class="grid-container"><div class="grid-x grid-x-margin grid-margin-bottom">%s%s<div class="cell %s">%s%s%s%s%s</div></div></div>',
                            $heading_small,
                            $photos,
                            join( '', $classes ),
                            $heading_large,
                            $buttons,
                            $group, 
                            $description,
                            $downloads
            );
               
        }
        
        
        private function get_buttons() {
            
            $request = sprintf( '<a data-open="contact" class="button">%s</a>', __( 'request product' ) );
            $phone = get_field( 'phone', 'option' );
            if( ! empty( $phone ) ) {
                $phone = sprintf( '<a href="%s" class="button phone"><span>%s</span></a>', _s_format_telephone_url( $phone ), $phone );
            }            
            
            return sprintf( '<div class="stacked-for-medium expanded button-group">%s%s</div>', $request, $phone );
                        
        }
        
        
        // Slick slider phoots
        private function get_photos() {
            $photos = $this->get_fields( 'photos' );
            
            if( empty( $photos) ) {
                return false;
            }
            
            if( count( $photos ) == 1 ) {
                return sprintf( '<div class="product__image">%s</div>', wp_get_attachment_image( $photos[0], 'large' ) );
            }
            
            $slides = array_map( function ( $id ) {
                return sprintf( '<div class="slide"><div class="vertical-center">%s</div></div>', wp_get_attachment_image( $id, 'large' ) );
            }, $photos );
            
            $thumbnails = array_map( function ( $id ) {
                return sprintf( '<div class="slide"><div class="thumbnail" style="background-image: url(%s);"></div></div>', _s_get_acf_image( $id, 'thumbnail', true ) );
            }, $photos );
            
            $buttons = '<div class="slick-arrows">
                            <button class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button>
                            <button class="slick-next slick-arrow" aria-label="Next" type="button">Previous</button>
                        </div>';
            
            if( ! empty( $slides ) ) {
                $main = sprintf( '<div class="product__slider-main"><div class="slick">%s</div></div>', join( '', $slides ) ); 
                $thumbs = sprintf( '<div class="product__slider-thumbs"><div class="slick">%s</div></div>', join( '', $thumbnails ) ); 
                
                return sprintf( '<div class="product__slider">%s%s</div>', $main, $thumbs );
            }
            
            return false;
        }
        
        
        private function get_application() {
            $field = $this->get_fields( 'application' );
            if( empty( $field[ 'heading' ] ) || empty( $field[ 'applications' ] )  ) {
                return false;
            }
            
            $heading = _s_format_string( $field[ 'heading' ], 'h3' );
            
            $posts = $field[ 'applications' ];
            return _s_get_relationship_field_list( $posts, $heading, true );
        }
        
        
        private function get_technology() {
            $field = $this->get_fields( 'technology' );
            if( empty( $field[ 'heading' ] ) || empty( $field[ 'posts' ] )  ) {
                return false;
            }
            
            $heading = _s_format_string( $field[ 'heading' ], 'h3' );
            
            $posts = $field[ 'posts' ];
            return _s_get_relationship_field_list( $posts, $heading, true, 'technology' );
        }
        
        
        private function get_description() {
            if( ! empty( $this->get_fields( 'description' ) ) ) {
                return sprintf( '<div class="description">%s</div>', $this->get_fields( 'description' ) );
            }
            return false;
        }
        
        
        private function get_downloads() {
            
            $groups = $this->get_fields( 'download_group' );
                        
            if( empty( $groups ) ) {
               return false; 
            }
            
            $out = '';
            
            foreach( $groups as $group ) {
                $heading = $group['heading'];
                $rows = $group['downloads'];
                                
                if( ! empty( $heading ) ) {
                    $out .= sprintf( '<h6>%s</h6>', $heading );
                }
                
                $buttons = '';
            
                if( ! empty( $rows ) ) {
                    foreach( $rows as $row ) {                    
                        if( ! empty( $row  ) ) {
                            $icon = strtolower( $row['icon'] );
                            $icon = sprintf( '<i><img src="%s" /></i>', _s_asset_path( sprintf( 'images/product/icons/%s.svg', $icon ) ) );
                            
                            $label = $row['label'];
                            $file = $row['file'];
                            
                            $buttons .= sprintf( '<a href="%s" class="button"><span>%s%s</span></a>', $file, $icon, $label );
                        }
                    }
                    
                    $buttons = sprintf( '<div class="downloads">%s</div>', $buttons );
                }
                
                $out .= $buttons;
            }
            
            if( empty( $out ) ) {
                return false;
            }
            
            return sprintf( '<div class="download-group"><h3>Downloads</h3>%s</div>', $out );
        }
        
    }
}
   
new Product_Details; 