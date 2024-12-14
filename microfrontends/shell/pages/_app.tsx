import TopNavbar from '../components/TopNavbar';

function MyApp({ Component, pageProps }: any) {
	return (
		<>
			<TopNavbar />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
