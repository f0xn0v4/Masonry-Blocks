/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useInnerBlocksProps, InspectorControls } from "@wordpress/block-editor";

import {
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const { columnsS, columnsM, columnsL, resolution, spacing } = attributes;

	const blockProps = useBlockProps({
		className: `wp-block-f0xn0v4-masonry-query col-l-${columnsL} col-m-${columnsM} col-s-${columnsS}`,
		style: { "--post-spacing": spacing },
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [
			[
				"core/query",
				{
					className: `wp-block-f0xn0v4-masonry-query__query-loop`,
					lock: { move: true, remove: true },
				},
				[
					[
						"core/post-template",
						{
							className: `wp-block-f0xn0v4-masonry-query__post-template`,
							lock: { move: true, remove: true },
						},
						[
							[
								"core/post-featured-image",
								{
									className: `wp-block-f0xn0v4-masonry-query__featured-image`,
									lock: { move: true, remove: true },
								},
							],
							[
								"core/group",
								{
									className: `wp-block-f0xn0v4-masonry-query__card`,
									layout: {
										type:'flex',
										orientation:'vertical',
										justifyContent:'center',
										verticalAlignment:'center'
									},
									lock: { move: true, remove: true },
								},
								[["core/post-title", {isLink: true, linkTarget:"_self"}]],
							],
						],
					],
				],
			],
		],
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title="Layout">
					<RangeControl
						label={__("Columns (Desktop)")}
						value={columnsL}
						min={1}
						max={5}
						onChange={(x) => setAttributes({ columnsL: x })}
					/>
					<RangeControl
						label={__("Columns (Tablet)")}
						value={columnsM}
						min={1}
						max={5}
						onChange={(x) => setAttributes({ columnsM: x })}
					/>
					<RangeControl
						label={__("Columns (Mobile)")}
						value={columnsS}
						min={1}
						max={5}
						onChange={(x) => setAttributes({ columnsS: x })}
					/>
					<UnitControl
						__next40pxDefaultSize
						value={spacing}
						label={__("Block Spacing")}
						onChange={(x) => setAttributes({ spacing: x })}
					/>
					<Button
						variant="secondary"
						style={{ width: "100%", justifyContent: "center" }}
						onClick={() => {
							setAttributes({
								columnsL: 3,
								columnsM: 2,
								columnsS: 1,
								spacing: "1rem",
							});
						}}
					>
						{__("Restore Defaults")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div {...innerBlocksProps} />
			</div>
		</>
	);
}
