import React, { Suspense, lazy } from 'react';
import Link from 'next/link';

const HelloWorld = lazy(() =>
	import('./helloWorld').then((mod) => {
		return { default: mod.HelloWorld };
	})
);

type LinkType = {
	key: string;
	href: string;
	label: string;
};

const links: LinkType[] = [
	{ key: '', href: 'https://zeit.co/now', label: 'ZEIT' },
	{ key: '', href: 'https://github.com/zeit/next.js', label: 'GitHub' },
].map((link) => {
	link.key = `nav-link-${link.href}-${link.label}`;
	return link;
});

const Nav: React.FC = () => (
	<nav>
		<Suspense fallback={<div>Loading...</div>}>
			<HelloWorld />
		</Suspense>
		<ul>
			<li>
				<Link href="/">Home</Link>
				<Link href="/shop">Shop</Link>
				<Link href="/checkout">Checkout</Link>
			</li>
			{links.map(({ key, href, label }) => (
				<li key={key}>
					<a href={href}>{label}</a>
				</li>
			))}
		</ul>

		<style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
        padding-right: 10px;
      }
    `}</style>
	</nav>
);

export default Nav;
