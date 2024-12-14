import Link from 'next/link';

const TopNavbar = () => {
	return (
		<nav style={{ padding: '10px', backgroundColor: '#f8f9fa' }}>
			<ul style={{ listStyle: 'none', display: 'flex', gap: '15px' }}>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/products">Products</Link>
				</li>
				<li>
					<Link href="/checkout">Checkout</Link>
				</li>
				<li>
					<Link href="/shop">Shop</Link>
				</li>
			</ul>
		</nav>
	);
};

export default TopNavbar;
