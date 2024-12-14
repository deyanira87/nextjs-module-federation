import Link from 'next/link';

const ShellPage = () => (
	<div>
		<nav>
			<ul>
				<li><Link href="/products">Products</Link></li>
				<li><Link href="/shop">Shop</Link></li>
				<li><Link href="/checkout">Checkout</Link></li>
			</ul>
		</nav>
		<div>
			<h1>Welcome to the Shell</h1>
		</div>
	</div>
);

export default ShellPage;
