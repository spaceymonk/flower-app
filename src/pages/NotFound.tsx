import { ErrorContent } from '../components/common/ErrorContent';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import T from '../config/MessageConstants';

function NotFound() {
  return (
    <>
      <Navbar />
      <ErrorContent message={T.notFound.text} title={T.notFound.title} />
      <Footer />
    </>
  );
}

export default NotFound;
