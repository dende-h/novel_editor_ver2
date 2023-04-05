import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { supabase } from "../../lib/supabaseClient";
import { Container, Box, Heading, Image, Progress, Button } from "@chakra-ui/react";

const UploadImage = () => {
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [imageUrl, setImageUrl] = useState(null);
	const [tempImageUrl, setTempImageUrl] = useState(null);

	useEffect(() => {
		if (file) {
			setTempImageUrl(URL.createObjectURL(file));
		} else {
			setTempImageUrl(null);
		}
	}, [file]);

	const handleUpload = async () => {
		try {
			setUploading(true);
			setUploadProgress(0);

			const fileName = file.name;
			const fileExt = fileName.split(".").pop();
			const fileData = await file.arrayBuffer();
			const { data, error } = await supabase.storage
				.from("images")
				.upload(`images/novelThumbnail/${fileName}`, fileData, {
					cacheControl: "public, max-age=31536000", // optional cache control
					upsert: false, // optional upsert flag (if updating existing file)
					contentType: `image/${fileExt}` // optional content type
				});

			if (error) {
				throw new Error(error.message);
			}

			const publicUrl = supabase.storage.from("images").getPublicUrl(`images/novelThumbnail/${fileName}`)
				.data.publicUrl; // Fix here

			setImageUrl(publicUrl);

			setUploading(false);
			setUploadProgress(0);
			setFile(null);
			setTempImageUrl(null);
		} catch (error) {
			console.error("Error uploading image:", error);
			setUploading(false);
			setUploadProgress(0);
			setFile(null);
			setTempImageUrl(null);
		}
	};

	const handleCancel = () => {
		setFile(null);
		setTempImageUrl(null);
	};

	const handleDrop = (acceptedFiles) => {
		if (acceptedFiles.length > 0) {
			setFile(acceptedFiles[0]);
		}
	};

	return (
		<Container maxW="md" py={10}>
			<Dropzone onDrop={handleDrop} multiple={false}>
				{({ getRootProps, getInputProps }) => (
					<Box
						{...getRootProps()}
						border="2px"
						borderColor="gray.300"
						borderRadius="md"
						py={20}
						textAlign="center"
						cursor="pointer"
						bg={uploading ? "gray.100" : "white"}
					>
						{file ? (
							uploading ? (
								<>
									<Progress value={uploadProgress} size="sm" mb={4} />
									Uploading...
								</>
							) : (
								<>
									<Image src={imageUrl} alt="Uploaded Image" maxH="200px" mb={4} />
									<Button onClick={handleUpload} size="sm" mr={2}>
										Upload
									</Button>
									<Button onClick={() => setFile(null)} size="sm">
										Cancel
									</Button>
								</>
							)
						) : (
							<>
								<input {...getInputProps()} />
								<Heading size="md">Drag and Drop an Image</Heading>
								<Box mt={4}>
									<Button size="sm">Choose File</Button>
								</Box>
							</>
						)}
					</Box>
				)}
			</Dropzone>
		</Container>
	);
};

export default UploadImage;
