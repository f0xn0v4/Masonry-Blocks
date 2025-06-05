<?php
// This file is generated. Do not modify it manually.
return array(
	'masonry-gallery' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'f0xn0v4/masonry-gallery',
		'version' => '0.1.0',
		'title' => 'Masonry Gallery',
		'category' => 'media',
		'description' => 'A gallery block with a masonry layout.',
		'attributes' => array(
			'columnsS' => array(
				'type' => 'number',
				'default' => 1
			),
			'columnsM' => array(
				'type' => 'number',
				'default' => 2
			),
			'columnsL' => array(
				'type' => 'number',
				'default' => 3
			),
			'resolution' => array(
				'type' => 'string',
				'enum' => array(
					'thumbnail',
					'medium',
					'large',
					'full'
				),
				'default' => 'large'
			),
			'spacing' => array(
				'type' => 'string',
				'default' => '1rem'
			),
			'lightbox' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'interactivity' => true,
			'align' => array(
				'wide',
				'full'
			)
		),
		'textdomain' => 'masonry-gallery',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'masonry-query' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'f0xn0v4/masonry-query',
		'version' => '0.1.0',
		'title' => 'Masonry Query',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'attributes' => array(
			'columnsS' => array(
				'type' => 'number',
				'default' => 1
			),
			'columnsM' => array(
				'type' => 'number',
				'default' => 2
			),
			'columnsL' => array(
				'type' => 'number',
				'default' => 3
			),
			'spacing' => array(
				'type' => 'string',
				'default' => '1rem'
			)
		),
		'supports' => array(
			'html' => false,
			'layout' => true,
			'align' => array(
				'wide',
				'full'
			)
		),
		'textdomain' => 'masonry-query',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
