import { useRouter } from 'next/router';

const ProductPage = () => {
	const { slug } = useRouter().query;

	return (
		<div>
			<h1>Product Page</h1>
			<p>Slug: {slug}</p>
		</div>
	);
};

export default ProductPage;
