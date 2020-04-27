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


// Special Mission Equipment
// Payload
// Mission Type

register_via_taxonomy_core( 
    array(
        __( 'Equipment', '_s', '_s' ), // Singular
        __( 'Special Mission Equipment', '_s', '_s' ), // Plural
        'equipment' // Registered name
    ), 
	array(
		'public' => false,
        'rewrite' => false,
	), 
	array( 'fleet' ) 
);

register_via_taxonomy_core( 
    array(
        __( 'Payload', '_s', '_s' ), // Singular
        __( 'Payload', '_s', '_s' ), // Plural
        'payload' // Registered name
    ), 
	array(
		'public' => false,
        'rewrite' => false,
	), 
	array( 'fleet' ) 
);

register_via_taxonomy_core( 
    array(
        __( 'Mission Type', '_s', '_s' ), // Singular
        __( 'Mission Type', '_s', '_s' ), // Plural
        'mission-type' // Registered name
    ), 
	array(
		'public' => false,
        'rewrite' => false,
	), 
	array( 'fleet' ) 
);