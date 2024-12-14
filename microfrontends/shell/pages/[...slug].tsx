import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const remotes: Record<string, React.ComponentType<any>> = {
	products: dynamic(() => import('products/products'), { ssr: false }),
	productDetail: dynamic(() => import('products/productDetail'), { ssr: false }),
	shop: dynamic(() => import('shop/shop'), { ssr: false }),
	checkout: dynamic(() => import('checkout/checkout'), { ssr: false }),
};

type RemoteKeys = keyof typeof remotes;

const DynamicPage = () => {
	const { query } = useRouter();
	const { slug } = query;

	if (!slug || !Array.isArray(slug)) {
		return <div>404 - Page Not Found</div>;
	}

	const [namespace, id] = slug;

	// Si el namespace no está definido en remotes, mostramos un 404.
	if (!remotes[namespace]) {
		return <div>404 - Page Not Found</div>;
	}

	const RemoteComponent = id ? remotes.productDetail : remotes[namespace];

	return (
		<div>
			<RemoteComponent {...(id ? { id } : {})} />
		</div>
	);
};

export default DynamicPage;
