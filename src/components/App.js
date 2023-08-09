import Footer from "./Footer";
import Header from "./Header";
import TaskList from "./TaskList";

function App({ state }) {
  return (
    <section className="todoapp">
      <Header />
      <section className="main">
        <TaskList state={state} />
        <Footer state={state} />
      </section>
    </section>
  );
}

export default App;
