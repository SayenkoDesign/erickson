<?php
/**
 * ACF Blocks
 *
 * A place to custom functionality related to Advanced Custom Fields.
 *
 * @package _s
 */

// If ACF isn't activated, then bail.
if ( ! class_exists( 'acf' ) ) {
	return false;
}


add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		[
			[
				'slug'  => 'theme-blocks',
				'title' => __( 'Erickson Custom Blocks', '_s' ),
			]
		],
		$categories
	);
}, 10, 2 );

/**
 * Register Gutenberg Blocks
 */
function _s_acf_register_blocks() {

	// check function exists
	if ( function_exists( 'acf_register_block_type' ) ) {
        
        acf_register_block_type( array(
			'name'            => 'approach',
			'title'           => __( 'Approach', '_s' ),
			'description'     => __( 'approach', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'approach' ),
            'post_types'      => array('service'),
            //'mode'          => 'edit',
            'supports'        => [ 'align' => false, 'anchor' => true ]
		) );
                
        acf_register_block_type( array(
			'name'            => 'awards',
			'title'           => __( 'Awrds & Accolades', '_s' ),
			'description'     => __( 'awards & accolades block', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'awards accolades' ),
            'post_types' => array('page'),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'benefits',
			'title'           => __( 'Benefits', '_s' ),
			'description'     => __( 'benefits', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'benefits' ),
            'post_types'      => array('page'),
            //'mode'          => 'edit',
            'multiple' => false,
            'supports'        => [ 'align' => false, 'anchor' => true ]
		) );
        
        // Button
		/*acf_register_block_type( array(
			'name'            => 'button',
			'title'           => __( 'Button', '_s' ),
			'description'     => __( 'Button', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><path fill="none" d="M0 0h24v24H0V0z"></path><g><path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"></path></g></svg>',
			'keywords'        => array( 'button' ),
            'post_types' => array('post', 'page', 'service'),
            'supports' => ['anchor' => false]
		) );
        */	
        
        acf_register_block_type( array(
			'name'            => 'case-studies',
			'title'           => __( 'Case Studies', '_s' ),
			'description'     => __( 'Case Studies grid', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'case study' ),
            'post_types' => array('page', 'service' ),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );	
        
        acf_register_block_type( array(
			'name'            => 'clients',
			'title'           => __( 'Clients', '_s' ),
			'description'     => __( 'clients', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'clients' ),
            'post_types'      => array('service'),
            //'mode'          => 'edit',
            'multiple'        => false,
            'supports'        => [ 'align' => false, 'anchor' => true ]
		) );  
        
        acf_register_block_type( array(
			'name'            => 'columns',
			'title'           => __( 'Columns', '_s' ),
			'description'     => __( 'Columns block', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'columns' ),
            'post_types' => array('page'),
            'align' => 'full',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );      
                
        acf_register_block_type( array(
			'name'            => 'commitment',
			'title'           => __( 'Commitment', '_s' ),
			'description'     => __( 'Commitment block', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'commitment' ),
            'post_types' => array('page'),
            'align' => 'full',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'content',
			'title'           => __( 'Generic Content', '_s' ),
			'description'     => __( 'generic content block', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-page',
			'keywords'        => array( 'generic content, video, image' ),
            'post_types' => array('page', 'service', 'webinar'),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
        
        acf_register_block_type( array(
			'name'            => 'codes',
			'title'           => __( 'NAIC Codes', '_s' ),
			'description'     => __( 'NAIC Codes block', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'NAIC codes' ),
            'post_types' => array('service'),
            'align' => 'full',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
        
        acf_register_block_type( array(
			'name'            => 'contracts',
			'title'           => __( 'Prime Contracts', '_s' ),
			'description'     => __( 'Prime Contracts block', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'prime contracts' ),
            'post_types' => array('service'),
            'align' => 'full',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
		acf_register_block_type( array(
			'name'            => 'core-values',
			'title'           => __( 'Core Values', '_s' ),
			'description'     => __( 'Core values block', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'core values' ),
            'post_types' => array('page'),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
                
        acf_register_block_type( array(
			'name'            => 'customers',
			'title'           => __( 'Customers', '_s' ),
			'description'     => __( 'Customer logos', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-users',
			'keywords'        => array( 'customer logos' ),
            'post_types' => array('page'),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'erickson-advantage',
			'title'           => __( 'Erickson Advantage', '_s' ),
			'description'     => __( 'Erickson Advantage slideshow', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'Erickson Advantage slideshow' ),
            'post_types' => array('page'),
            //'mode' => 'edit',
            'multiple' => false,
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
                
        acf_register_block_type( array(
			'name'            => 'featured-post',
			'title'           => __( 'Featured Post', '_s' ),
			'description'     => __( 'Erickson featured post', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'featured post' ),
            'post_types' => array('page'),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'fleet',
			'title'           => __( 'Fleet', '_s' ),
			'description'     => __( 'Services Fleet block', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'fleet block' ),
            'post_types' => array('page', 'service' ),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );	

		acf_register_block_type( array(
			'name'            => 'offices',
			'title'           => __( 'Offices', '_s' ),
			'description'     => __( 'Offices block', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'office block' ),
            'post_types' => array('page', 'service' ),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true, 'multiple' => false ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'hero',
			'title'           => __( 'Hero', '_s' ),
			'description'     => __( 'Hero', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'hero' ),
            'post_types'      => array('page', 'service' ),
            //'mode'          => 'edit',
            'multiple'        => false,
            'supports'        => [ 'align' => false, 'anchor' => false ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'jobs',
			'title'           => __( 'Jobs', '_s' ),
			'description'     => __( 'approach', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'jobs' ),
            'post_types'      => array('page'),
            //'mode'          => 'edit',
            'supports'        => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'mission-vision',
			'title'           => __( 'Mission & Vision', '_s' ),
			'description'     => __( 'Mission & Vision block', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'mission vision' ),
            'post_types' => array('page'),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'photo-gallery',
			'title'           => __( 'Photo Gallery', '_s' ),
			'description'     => __( 'photo gallery', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'format-gallery',
			'keywords'        => array( 'photo gallery' ),
            'post_types'      => array('page', 'service' ),
            //'mode'          => 'edit',
            'multiple'        => false,
            'supports'        => [ 'align' => false, 'anchor' => true ]
		) );
        
        
        acf_register_block_type( array(
			'name'            => 'quote',
			'title'           => __( 'Service Quote', '_s' ),
			'description'     => __( 'service quote', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'quote' ),
            'post_types' => array('service'),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
                
        acf_register_block_type( array(
			'name'            => 'results',
			'title'           => __( 'Results', '_s' ),
			'description'     => __( 'results', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'results' ),
            'post_types'      => array('page', 'service' ),
            //'mode'          => 'edit',
            'multiple'        => false,
            'supports'        => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'services',
			'title'           => __( 'Services List', '_s' ),
			'description'     => __( 'list of services by category', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'editor-ul',
			'keywords'        => array( 'services' ),
            'post_types' => array('page'),
            //'mode' => 'edit',
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'testimonials',
			'title'           => __( 'Testimonials', '_s' ),
			'description'     => __( 'testimonials', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'testimonials' ),
            'post_types'      => array('page', 'service'),
            //'mode'          => 'edit',
            'supports'        => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'values',
			'title'           => __( 'Values', '_s' ),
			'description'     => __( 'values', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'values' ),
            'post_types'      => array('page'),
            //'mode'          => 'edit',
            'supports'        => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'webinars',
			'title'           => __( 'Webinars', '_s' ),
			'description'     => __( 'Erickson Webinars', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'webinar' ),
            'post_types' => array('page'),
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
        acf_register_block_type( array(
			'name'            => 'webinar',
			'title'           => __( 'Webinar', '_s' ),
			'description'     => __( 'Erickson Webinar', '_s' ),
			'render_callback' => '_s_acf_block_render_callback',
			'category'        => 'theme-blocks',
			'icon'            => 'admin-comments',
			'keywords'        => array( 'webinar' ),
            'post_types' => array('webinar'),
            'multiple'        => false,
            'supports' => [ 'align' => false, 'anchor' => true ]
		) );
        
	}
}

add_action( 'acf/init', '_s_acf_register_blocks' );


function _s_allowed_block_types( $allowed_blocks, $post ) {
            
        /*$remove_blocks = [
            'core/archives',
            'core/audio',
            'core/button',
            'core/calendar',
            'core/categories',
            'core/code',
            'core/column',
            'core/columns',
            'core/cover',
            'core/embed',
            'core/file ',
            'core/gallery',
            'core/heading',
            'core/html',
            'core/image',
            'core/latestComments',
            'core/latestPosts',
            'core/legacyWidget',
            'core/list',
            'core/mediaText',
            'core/missing', 
            'core/more',
            'core/nextpage', 
            'core/paragraph',
            'core/preformatted', 
            'core/pullquote', 
            'core/quote',
            'core/reusableBlock', 
            'core/rss', 
            'core/search', 
            'core/section', 
            'core/separator', 
            'core/shortcode', 
            'core/spacer', 
            'core/subhead', 
            'core/table', 
            'core/tagCloud', 
            'core/template', 
            'core/textColumns', 
            'core/verse', 
            'core/video'
        ];
     */
    
    if ( $post->post_type == 'page' ) {
        
        /*
        // Example page template
        $page_template = get_post_meta( $post->ID, '_wp_page_template', true );
        
        if( 'page-templates/contact.php' == $page_template ) {
            $allowed_blocks = array(
            'acf/button',
            'core/block',
            'core-embed/youtube',
            'core/image',
            'core/paragraph',
            'core/heading',
            'core/list',
            //'core/button'
        ); 
        } 
        */
        
       /*$allowed_blocks = array(
            'acf/awards',
            //'acf/button',
            'acf/case-studies',
            'acf/commitment',
            'acf/content',
            'acf/core-values',
            'acf/customers',
            'acf/erickson-advantage',
            'acf/featured-post',
            'acf/photo-gallery',
            'acf/hero',
            'acf/mission-vision',
            'acf/services',
            'acf/columns',
            
            'acf/benefits',
            'acf/jobs',
            'acf/testimonials',
            'acf/values',
            
                        
            //'core/group',
            'core/reusableBlock',
            //'core-embed/youtube',
            'core/image',
            'core/paragraph',
            'core/heading',
            'core/list',
            'core/button'
        );  
        */
       
        
    }
    
    
    if( $post->post_type == 'service' ) {
        
        
        
        /* $allowed_blocks = array(
            'acf/hero',
            'acf/approach',
            'acf/clients',
            'acf/results',
            'acf/case-studies',
            'acf/photo-gallery',
            'acf/content',
            'acf/testimonials',
            'acf/fleet',
            'acf/contracts',
            'acf/codes',
            'acf/quote',

        );       */
    }
    
    // Remove blocks if array exists
    if( ! empty( $remove_blocks ) ) {
        foreach( $remove_blocks as $block ) {
            if ( ($key = array_search( $block, $allowed_blocks ) ) !== false ) {
                unset( $allowed_blocks[$key] );
            }
        }
    }
        
    return $allowed_blocks;
 
}
// add_filter( 'allowed_block_types', '_s_allowed_block_types', 10, 2 );



// Do Not edit below.

function _s_acf_block_render_callback( $block ) {
        
	// convert name ("acf/testimonial") into path friendly slug ("testimonial")
	$slug = str_replace( 'acf/', '', $block['name'] );
                
	// include a template part from within the "template-parts/block" folder
    $data = [ 'block' => $block ];
            
    _s_get_template_part( "blocks", $slug, $data ); 
}