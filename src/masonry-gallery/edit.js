import { __ } from "@wordpress/i18n";

import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockControls,
	MediaUploadCheck,
	MediaUpload,
	store as blockEditorStore,
} from "@wordpress/block-editor";

import {
	Button,
	PanelBody,
	Placeholder,
	RangeControl,
	ToolbarGroup,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";

import { gallery } from "@wordpress/icons";
import { useRef } from "@wordpress/element";
import { createBlock } from "@wordpress/blocks";
import { useSelect, useDispatch } from "@wordpress/data";

import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

function parseMediaInput(media) {
	return media.map(({ id, url, alt }) => ({ id, url, alt }));
}

export default function Edit({ attributes, setAttributes, clientId }) {

	const { columnsS, columnsM, columnsL, resolution, spacing, lightbox } =
		attributes;

	const blockProps = useBlockProps({
		className: `wp-block-f0xn0v4-masonry-gallery`,
	});

	const innerBlocks = useSelect(
		(select) => {
			const { getBlock } = select(blockEditorStore);
			const block = getBlock(clientId);
			return block?.innerBlocks || [];
		},
		[clientId],
	);

	const innerBlocksProps = useInnerBlocksProps(
		{
			className:
				innerBlocks.length > 0
					? `wp-block-f0xn0v4-masonry-gallery__inner-blocks col-l-${columnsL} col-m-${columnsM} col-s-${columnsS}`
					: `wp-block-f0xn0v4-masonry-gallery__inner-blocks`,
			style: { "--image-spacing": spacing },
		},
		{
			allowedBlocks: ["core/image"],
		},
	);

	const { replaceInnerBlocks, updateBlockAttributes } =
		useDispatch(blockEditorStore);

	let blockEditorContent;
	if (!innerBlocks.length) {
		blockEditorContent = (
			<Placeholder
				icon={gallery}
				label={__("Masonry Gallery")}
				instructions={__("Drag and drop images, upload, or choose from your library")}
			>
				<MediaUploadCheck>
					<MediaUpload
						value={innerBlocks.map((x) => x.attributes.id)}
						multiple={true}
						gallery={true}
						mode={"upload"}
						allowedTypes={["image"]}
						onSelect={(media) => {
							const newImages = Array.isArray(media)
								? parseMediaInput(media)
								: parseMediaInput([media]);
							const newBlocks = newImages.map((x) =>
								createBlock("core/image", {
									...x,
									sizeSlug: resolution,
									lightbox: { enabled: lightbox },
								}),
							);
							replaceInnerBlocks(clientId, newBlocks, false);
						}}
						render={({ open }) => (
							<Button variant="primary" onClick={open}>
								{__("Upload")}
							</Button>
						)}
					/>
				</MediaUploadCheck>
				<MediaUploadCheck>
					<MediaUpload
						value={innerBlocks.map((x) => x.attributes.id)}
						multiple={true}
						gallery={true}
						mode={"browse"}
						allowedTypes={["image"]}
						onSelect={(media) => {
							const newImages = Array.isArray(media)
								? parseMediaInput(media)
								: parseMediaInput([media]);
							const newBlocks = newImages.map((x) =>
								createBlock("core/image", {
									...x,
									sizeSlug: resolution,
									lightbox: { enabled: lightbox },
								}),
							);
							replaceInnerBlocks(clientId, newBlocks, false);
						}}
						render={({ open }) => (
							<Button variant="secondary" onClick={open}>
								{__("Media Library")}
							</Button>
						)}
					/>
				</MediaUploadCheck>
			</Placeholder>
		);
		blockEditorContent = <div {...innerBlocksProps}>{blockEditorContent}</div>;
	} else {
		blockEditorContent = <div {...innerBlocksProps} />;
	}

	const previousInnerBlocksRef = useRef(innerBlocks);

	return (
		<>
			<BlockControls>
				<MediaUploadCheck>
					<MediaUpload
						value={innerBlocks.map((x) => x.attributes.id)}
						multiple={true}
						gallery={true}
						mode={"browse"}
						allowedTypes={["image"]}
						onSelect={(media) => {
							const newImages = Array.isArray(media)
								? parseMediaInput(media)
								: parseMediaInput([media]);
							const newBlocks = newImages.map((x) =>
								createBlock("core/image", {
									...x,
									sizeSlug: resolution,
									lightbox: { enabled: lightbox },
								}),
							);
							replaceInnerBlocks(clientId, newBlocks, false);
						}}
						render={({ open }) => (
							<ToolbarGroup>
								<ToolbarButton onClick={open}>Add/Edit</ToolbarButton>
							</ToolbarGroup>
						)}
					/>
				</MediaUploadCheck>
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Settings">
					<SelectControl
						label={__("Resolution")}
						value={resolution}
						options={[
							{
								label: __("Thumbnail"),
								value: __("thumbnail"),
							},
							{
								label: __("Medium"),
								value: __("medium"),
							},
							{
								label: __("Large"),
								value: __("large"),
							},
							{
								label: __("Full Size"),
								value: __("full"),
							},
						]}
						onChange={(x) => {
							setAttributes({ resolution: x });
							innerBlocks.forEach((y) => {
								updateBlockAttributes(y.clientId, { sizeSlug: x });
							});
						}}
					/>
					<ToggleControl
						label={__("Enable Lightbox")}
						checked={lightbox}
						onChange={(x) => {
							setAttributes({ lightbox: x });
							innerBlocks.forEach((y) => {
								updateBlockAttributes(y.clientId, { lightbox: { enabled: x } });
							});
						}}
					/>
				</PanelBody>
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
			<div {...blockProps}>{blockEditorContent}</div>
		</>
	);
}
