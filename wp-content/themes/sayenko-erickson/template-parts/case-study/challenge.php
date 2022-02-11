<?php
// Case Study - Challenge

if( ! class_exists( 'Challenge_Section' ) ) {
    class Challenge_Section extends Element_Section {

        private $enable_hubspot = false;
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'challenge' );
            $this->set_fields( $fields );
                        
            $settings = get_field( 'case_study_archive', 'option' );
            $this->set_settings( $settings );
            
            // print the section
            $this->print_element();    
            
            
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-challenge'
                ]
            );   

            if( false !== $this->enable_hubspot ) {
                $this->add_render_attribute(
                    'wrapper', 'class', [
                         'hubspot-enabled'
                    ]
                );  
            }

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-challenge'
                ], true
            );            
            
        }  
                
        
        // Add content
        public function render() {
            
            global $post;
                              
            $heading = _s_format_string( __( 'Challenge', '_s' ), 'h2' );
            $text = $this->get_fields( 'text' ); 
            
            $image = _s_get_acf_image( $this->get_fields( 'image' ), 'thumbnail' );

            $classes = [];

            if( false !== $this->enable_hubspot ) {
                $image = '';
            } else {
                $classes[] = 'panel';
            }
            
            $button = '';
            $modal = '';

            $right_column = $this->get_terms();
            
            $file = $this->get_fields( 'file' );    
                     
            if( false === $this->enable_hubspot && ! empty( $file['url'] ) && ! empty( $this->get_fields( 'form_handler' ) ) ) {
                $args = [
                    'link' => [ 'title' => sprintf( '%s %s', __( 'download', '_s' ), $file['subtype'] ), 'url' => $file['url'], 'target' => '_blank' ],
                    'echo' => false,
                    'classes' => 'button',
                ];
                $button  = sprintf( '%s', _s_acf_button( $args ) );
                
                $form_handler = $this->get_fields( 'form_handler' ); // get_field( 'form_handler' );
                
                $gated_form = $this->get_settings( 'gated_form' );
                                
                $form_id = ! empty( $gated_form['form_id'] ) ? $gated_form['form_id'] : false;
                $form = GFAPI::get_form( $form_id );
                                                
                if( ! is_wp_error( $form ) && ! empty( $form_handler ) ) {
                                        
                    $slug = 'modal-' . $post->post_name;
                    
                    $data = [
                        'form_id' => $form_id,
                        'slug'    => $slug,
                        'content' => ! empty( $gated_form['content'] ) ? $gated_form['content'] : ''
                    ];
                    
                    $options = [
                        'src' => '#' . $slug,
                        'modal' => true,
                        'baseClass' => "full-screen",
                        'closeExisting' => true,
                        'touch' => false,
                        'hash' => false,
                        'backFocus' => false
                    ];
                    $options = sprintf( "data-options='{%s}'", _parse_data_attribute( $options, ':', ', ' ) );
                    
                    $button_text = __( 'download', '_s' );
                    
                    if( ! empty( $this->get_fields( 'button_text' ) ) ) {
                        $button_text = $this->get_fields( 'button_text' );
                    }
                
                    $button =  sprintf( '<a class="button modal-form" data-fancybox %s href="javascript:;">%s</a>', $options, $button_text );
                    
                    $modal = _s_get_template_part( 'template-parts/modal', 'case-study', $data, true );

                    if( false !== $this->enable_hubspot ) {
                        $right_column = _s_get_template_part( 'template-parts/case-study', 'hubspot', [], true );
        
                    }
                    
                }
            } else {
                $right_column = _s_get_template_part( 'template-parts/case-study', 'hubspot', [], true );
            }
            
                            
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-padding-x">
                                    <div class="cell large-6 xxlarge-7"><div class="%s">%s%s<footer>%s%s</footer></div></div>
                                    <div class="cell large-6 xxlarge-auto">%s</div>
                                </div>
                            </div>%s',
                            join( '', $classes ),
                            $heading,
                            $text,
                            $image, 
                            $button,
                            $right_column,
                            $modal
                         );  
        }

        

        
        private function get_hubspot_form() {
            
            $out = '<div class="hubspot-form" style="margin-top: 30px;"><!--[if lte IE 8]>
            <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
            <![endif]-->
            <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
            <script>
                hbspt.forms.create({
                    region: "na1",
                    portalId: "21030106",
                    formId: "a1f0e4b5-3725-44a0-a074-af5ed3d2b83c"
                });
                
            </script>
             </div>';

            $out .= '
            <script>
            window.addEventListener("message", function (event) {
                if (event.data.type === "hsFormCallback" && event.data.eventName === "onFormReady") {
                    var url = window.location.href;
                    url = url.replace(/\/$/, "");
                    document.getElementById("hs-form-iframe-0").contentDocument.querySelector("input[name=\"form_source\"]").value = url;
                }
            });
            </script>
            ';

            return $out;
        }

        private function get_terms() {
            
            $columns = '';
            
            $industry = _s_get_post_terms( [ 'taxonomy' => 'industry', 'link' => false, 'svg' => false ] ); 
            if( ! empty( $industry ) ) {
                $columns .= sprintf( '<div class="cell"><h5>%s</h5>%s</div>', __( 'industry', '_s' ), $industry );
            }
            $services = _s_get_post_terms( [ 'taxonomy' => 'service_cat', 'link' => false, 'svg' => false ] ); 
            if( ! empty( $services ) ) {
                $columns .= sprintf( '<div class="cell"><h5>%s</h5>%s</div>', __( 'services', '_s' ), $services );
            }
            $location = _s_get_post_terms( [ 'taxonomy' => 'location', 'link' => false, 'svg' => false ] );    
            if( ! empty( $location ) ) {
                $columns .= sprintf( '<div class="cell"><h5>%s</h5>%s</div>', __( 'location', '_s' ), $location );
            }
            
            
            if( ! empty( $columns ) ) {
                return sprintf( '<div class="post-terms-group"><div class="grid-x grid-padding-x small-up-1 medium-up-3">%s</div></div>', $columns );
            }
            
            return false;
        }
        
    }
}
   
new Challenge_Section;
