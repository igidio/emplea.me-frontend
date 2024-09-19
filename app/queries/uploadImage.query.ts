export default gql`
	mutation UploadImage($body: UploadDto!) {
		uploadImage(body: $body)
	}
`;
