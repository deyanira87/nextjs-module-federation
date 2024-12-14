type ProductDetailProps = {
	id: string;
};

const ProductDetail = ({ id }: ProductDetailProps) => {
	return (
		<div>
			<h1>Product Detail</h1>
			<p>Details for product ID: {id}</p>
		</div>
	);
};

export default ProductDetail;
