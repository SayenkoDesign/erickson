<?php

$service_categories = array(
    __( 'Service Category', '_s' ), // Singular
    __( 'Service Categories', '_s' ), // Plural
    'service_cat' // Registered name
);

register_via_taxonomy_core( $service_categories, 
	array(
		'public' => true,
        'rewrite' => false,
        'show_in_rest' => true,
	), 
	array( 'service', 'fleet', 'case_study' ) 
);



// Industry
$taxonomy_industry = array(
    __( 'Industry', '_s' ), // Singular
    __( 'Industries', '_s' ), // Plural
    'industry' // Registered name
);

register_via_taxonomy_core( $taxonomy_industry, 
	array(
		'public' => false,
        'rewrite' => false,
	), 
	array( 'case_study' ) 
);


// Locations
$taxonomy_location = array(
    __( 'Location', '_s', '_s' ), // Singular
    __( 'Locations', '_s', '_s' ), // Plural
    'location' // Registered name
);

register_via_taxonomy_core( $taxonomy_location, 
	array(
		'public' => false,
        'rewrite' => false,
	), 
	array( 'case_study' ) 
);


// Fleet Specs

/*
Manufacturer
Introduction
Powerplant
Capacity
Fuselage Length
Max Internal Cargo*
Max External Cargo*
Max Speed
Max Range
*/

$fleet_filters = [
    'Manufacturer',
    'Introduction',
    'Powerplant',
    'Capacity',
    'Fuselage Length',
    'Max Internal Cargo*',
    'Max External Cargo*',
    'Lift Capacity*',
    'Max Takeoff Weight',
    'Max Speed',
    'Max Range',
];

foreach( $fleet_filters as $filter ) {
    
    $slug = sanitize_title_with_dashes( $filter );
    
    register_via_taxonomy_core( 
        array(
            __( $filter, '_s', '_s' ), // Singular
            __( $filter, '_s', '_s' ), // Plural
            $slug // Registered name
        ), 
        array(
            'public' => false,
            'rewrite' => false,
        ), 
        array( 'fleet' ) 
    );
}

