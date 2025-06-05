<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$CLASS_NAME = "\"";
$CLASS_NAME = $CLASS_NAME."wp-block-f0xn0v4-masonry-gallery";
$CLASS_NAME = $CLASS_NAME." col-l-{$attributes['columnsL']}";
$CLASS_NAME = $CLASS_NAME." col-m-{$attributes['columnsM']}" ;
$CLASS_NAME = $CLASS_NAME." col-s-{$attributes['columnsS']}";
if (array_key_exists('align', $attributes)){
	$CLASS_NAME = $CLASS_NAME." align{$attributes['align']}";
}
$CLASS_NAME = $CLASS_NAME."\"";

$STYLE  = "\"--image-spacing:{$attributes['spacing']};\"";
?>
<div class=<?php echo($CLASS_NAME);?> style=<?php echo($STYLE)?>>
	<?php foreach($block -> parsed_block['innerBlocks'] as $img): ?>
		<?php 
		echo(render_block( $img ));
		?>
	<?php endforeach;?>
</div>