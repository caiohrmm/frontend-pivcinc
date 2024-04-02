import GetInTouch from "./GetInTouch";
import GetStarted from "./GetStarted";
import Header from "./Header";

const Home = () => {
  return (
    <section className="home">
      <Header />
      <GetStarted />
      <GetInTouch />
    </section>
  );
};

export default Home;
